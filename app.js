const express = require('express');
const app = express();
const PORT = 8080;
const route = require('./routes/products');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenidos');
})

app.use('/producto', route)


app.listen(PORT, ( ) => {
    console.log('Server iniciado');
})
