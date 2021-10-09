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
  Article.findAll().then(articles => {
    res.render('index', { articles: articles})
  });

  res.render('index');
});

app.listen(8080, () => {
  console.log('Aplicação Rodando! 🚀')
})