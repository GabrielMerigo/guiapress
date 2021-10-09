const express = require('express');
const app = express();
const connection = require('./database/database.js');
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');

// View Engine
app.set('view engine', 'ejs');
// Body Parser
app.use(express.urlencoded({ extended: true }));
// Static Files
app.use(express.static('public'));

connection
  .authenticate()
  .then(() => {
    console.log('Conexão feita com o banco de dados.')
  })
  .catch(() => {
    console.log('Ocorreu um erro.')
  })

app.use('/', categoriesController);
app.use('/', articlesController);

app.get('/', (req, res) => {
  Article.findAll({
    order: [
      ['id', 'DESC']
    ]
  }).then(articles => {
    res.render('index', { articles: articles})
  });
});

app.get('/:slug', (req, res) => {
  const slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug
    }
  }).then(article => {
    if(article){
      console.log(article)
      res.render('article', {article: article});
    }else{
      res.redirect('/');
    }
  }).catch(() => {
    res.redirect('/');
  })
});

app.listen(8080, () => {
  console.log('Aplicação Rodando! 🚀')
})