const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');

router.get('/admin/users/create', (req, res) => {
  res.render('admin/users/create');
});

router.get('/admin/users/', (req, res) => {
  User.findAll().then(users => {
    res.render('admin/users/index', { users })
  });
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

module.exports = router;