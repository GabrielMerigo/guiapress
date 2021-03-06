const express = require('express');
const app = express();
const connection = require('./database/database.js');
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');
const userController = require('./users/UserController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./users/User');
const session = require('express-session');

// View Engine
app.set('view engine', 'ejs');
// Body Parser
app.use(express.urlencoded({ extended: true }));
// Static Files
app.use(express.static('public'));

// Sessions

app.use(session({
  secret: "qualquercoisa",
  cookie: {
    maxAge: 6 * 100000 * 10,
  }
}));

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
app.use('/', userController);

app.get('/session', (req, res) => {
  req.session.treinamento = 'Formação Node JS'
  req.session.ano = 2021
  req.session.user = {
    name: 'gabriel',
    email: 'ajsdhadsj@gmail.com',
    id: 10
  };

  res.send('Sessão gerada');
});

app.get('/reading', (req, res) => {
  res.json({
    treinamento: req.session.treinamento,
    ano: req.session.ano,
    user: req.session.user
  });
});

app.get('/', (req, res) => {
  Article.findAll({
    order: [
      ['id', 'DESC']
    ], 
    limit: 4
  }).then(articles => {
    Category.findAll().then(categories => {
      res.render('index', { articles, categories })
    });
  });
});

app.get('/:slug', (req, res) => {
  const slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug
    }
  }).then(article => {
    if (article) {
      Category.findAll().then(categories => {
        res.render('article', { article: article, categories: categories });
      })
    } else {
      res.redirect('/');
    }
  }).catch(() => {
    res.redirect('/');
  })
});

app.get('/category/:slug', (req, res) => {
  const slug = req.params.slug;

  Category.findOne({
    where: {
      slug: slug
    },
    include: [{ model: Article }]
  }).then(category => {
    if (category) {
      Category.findAll().then(categories => {
        res.render('index', { categories: categories, articles: category.articles });
      });
    } else {
      res.redirect('/')
    }
  }).catch(() => {
    res.redirect('/')
  })
})

app.listen(8080, () => {
  console.log('Aplicação Rodando! 🚀')
})