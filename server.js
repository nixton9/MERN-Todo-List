const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const itemsRoutes = require('./routes/api/items');

mongoose.connect('mongodb://edd:abc123@ds259463.mlab.com:59463/mern_shoplist', {useNewUrlParser: true});

const app = express();
app.use(bodyParser.json());
app.use('/api/items', itemsRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


const port = process.env.PORT || 5000;
app.listen(port, ()=>{ console.log(`Server running on Port ${port}`); })