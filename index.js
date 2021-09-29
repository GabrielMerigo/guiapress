const express = require('express');
const app = express();
const connection = require('./database/database.js')

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
  
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(8080, () => {
  console.log('Aplicação Rodando! 🚀')
})