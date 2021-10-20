const express = require('express');
const session = require('express-session');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');
const adminAuth = require('../middlewares/adminAuth');

router.get('/admin/users/', adminAuth, (req, res) => {
  User.findAll().then(users => {
    res.render('admin/users/index', { users })
  });
});

router.get('/admin/users/create', (req, res) => {
  res.render('admin/users/create');
});

router.post('/users/create', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    where: {
      email: email
    }
  }).then(user => {
    if (!user) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      User.create({
        email,
        password: hash
      }).then(() => {
        res.redirect('/');
      }).catch(() => {
        res.redirect('/');
      })
      
    } else {
      console.log('Já possuiamos esse e-mail na nossa base de dados.');
      res.render('admin/users/create');
    }
  })
});

router.get('/login', (req, res) => {
  res.render('admin/users/login');
})

router.post('/autenticate', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ 
    where: {
      email: email
    }
  }).then(user => {
    if(user){
      const corret = bcrypt.compareSync(password, user.password);
      if(corret){
        req.session.user = {
          id: user.id,
          email: user.email
        }

        res.redirect('/admin/articles');
      }else{
        res.redirect('/login');
      }

    }else{
      res.redirect('/login');
    }
  })
});

router.get('/logout', (req, res) => {
  req.session.user = undefined;
  res.redirect('/');
})

module.exports = router;