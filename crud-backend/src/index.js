const express = require('express'); //Import library
const cors = require('cors');
const app = express(); //core application

app.use(express.json()); //req em json
app.use(express.urlencoded({ extended: false })) //req params url
app.use(cors()); //acesso de 

require('./controllers/authController')(app);//ref authController

// //teste
// app.get('/', (req, res) => {
//     return res.send('Server running in port 3001...');
// });

app.listen(3001, (req, res) => {
    console.log('Server running in port 3001...');
});