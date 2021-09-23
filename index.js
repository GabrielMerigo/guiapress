const express = require('express');
const app = express();
const bodyParser = require('bodyParser');

// View Engine
app.set('view engine', 'ejs');
// Body Parser
app.use(bodyParser.urlencoded({extends: false}));
app.use(bodyParser.json());
// Static Files
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index');
});

app.listen(8080, () => {
  console.log('Aplicação Rodando! 🚀')
})