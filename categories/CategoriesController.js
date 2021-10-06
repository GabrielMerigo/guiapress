const express = require('express');
const router = express.Router();
const Category = require('./Category');
const slugify = require('slugify');

router.get('/admin/categories/new', (req, res) => {
  res.render('admin/categories/new');
});

router.post('/categories/save', (req, res) => {
  const title = req.body.title;

  if (title) {
    Category.create({
      title,
      slug: slugify(title)
    }).then(() => {
      res.redirect('/');
    })

  } else {
    res.redirect('/admin/categories/new');
  }

});

router.get('/admin/categories', (req, res) => {
  Category.findAll().then(categories => {
    res.render('admin/categories/index', {
      categories: categories
    });
  })
});

router.post('/categories/delete', (req, res) => {
  const id = req.body.id;

  if (id) {
    if (!isNaN(id)) { // ID não é um número
      Category.destroy({
        where: {
          id: id
        }
      }).then(() => {
        res.redirect('/admin/categories');
      });
    } else {
      res.redirect('/admin/categories');
    }
  } else { // ID com valor falsy
    res.redirect('/admin/categories');
  }
});

router.get('/admin/categories/:id', (req, res) => {
  const id = req.params.id;
  Category.findByPk(id).then(category => {
    if(category){
      
    }else{
      res.redirect('/admin/categories');
    }
  })
});

module.exports = router;