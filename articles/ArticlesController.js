const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('../articles/Article');
const slugify = require('slugify');

router.get('/admin/articles', (req, res) => {
  res.send('ROTA DE ARTIGOS')
});

router.get('/admin/articles/new', (req, res) => {
  Category.findAll().then(categories => {
    res.render('admin/articles/new', {categories})
  })
})

router.post('/articles/save', (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const categoryId = req.body.category;

  Article.create({
    title,
    slug: slugify(title, {lower: true}),
    body,
    categoryId
  }).then(() => {
    res.redirect("/admin/articles");
  })
})

module.exports = router;