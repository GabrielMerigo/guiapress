const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('../articles/Article');
const slugify = require('slugify');

router.get('/admin/articles', (req, res) => {
  Article.findAll({
    include: [{ model: Category }]
  }).then(articles => {
    console.log(articles)
    res.render('admin/articles/index', {
      articles: articles
    });
  })
});

router.get('/admin/articles/new', (req, res) => {
  Category.findAll().then(articles => {
    res.render('admin/articles/new', {articles})
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
  });
})

module.exports = router;