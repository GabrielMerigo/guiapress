const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('../articles/Article');
const slugify = require('slugify');

router.get('/admin/articles', (req, res) => {
  Article.findAll({
    include: [{ model: Category }]
  }).then(articles => {
    res.render('admin/articles/index', {
      articles: articles
    });
  })
});

router.get('/admin/articles/new', (req, res) => {
  Category.findAll().then(articles => {
    res.render('admin/articles/new', { articles })
  })
})

router.post('/articles/save', (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const categoryId = req.body.category;

  Article.create({
    title,
    slug: slugify(title, { lower: true }),
    body,
    categoryId
  }).then(() => {
    res.redirect("/admin/articles");
  });
})

router.post('/articles/delete', (req, res) => {
  const id = req.body.id;

  if (id) {
    if (!isNaN(id)) {
      Article.destroy({
        where: {
          id: id
        }
      }).then(() => {
        res.redirect('/admin/articles');
      });
    } else {
      res.redirect('/admin/articles');
    }
  } else { // ID com valor falsy
    res.redirect('/admin/articles');
  }
});


router.get('/admin/articles/edit/:id', (req, res) => {
  const id = req.params.id;

  Article.findByPk(id)
    .then(article => {
      console.log(article.categoryId)
      Category.findAll().then(categories => {
        res.render('admin/articles/edit', {
          article,
          categories
        })
      })
    })
    .catch(() => {
      res.redirect('/admin/articles');
    })
})

router.post('/articles/update', (req, res) => {
  const body = req.body.body;
  const title = req.body.title;
  const id = req.body.id;
  const category = req.body.category;

  Article.update({
    body,
    title,
    slug: slugify(title, {
      lower: true
    }),
    categoryId: category
  }, {
    where: { id: id }
  }).then(() => {
    res.redirect('/admin/articles');
  }).catch(() => {
    res.redirect('/admin/articles');
  })
})

module.exports = router;