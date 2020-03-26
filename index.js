// importar os módulos
const express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    BodyParser = require("body-parser");


// iniciar  o express na variável 
const app = express();

// adicionar middleware
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

// declarar variável que controlará o db
let database,
    collection;

// variáveis do db
const CONNECTION_URL = "mongodb://root:root@cluster0-shard-00-00-6pvot.mongodb.net:27017,cluster0-shard-00-01-6pvot.mongodb.net:27017,cluster0-shard-00-02-6pvot.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
const DATABASE_NAME = "pokemon";


// inicia o sistema na porta 80; o callback conecta ao db
app.listen(process.env.PORT || 8080, () => {

    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            throw error
        }


        database = client.db(DATABASE_NAME);
        collection = database.collection("pokedex")
        console.log("Connected to `" + DATABASE_NAME + "`!");

    })

    console.log("Servidor Iniciado...");


})


// API filtra todos os pokemons
app.get('/getall', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*')
    collection.find(req.body).toArray((error, result) => {
        if (error) {
            throw error
        }
        res.send(result)
    })
})

// API filtra todos os pokemons pelo primeiro tipo
app.get('/:typeOne', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    collection.find({ "typeOne": req.params.typeOne }).toArray((error, result) => {
        if (error) {
            throw error
        }
        res.send(result)
    })
})

// API filtra todos os pokemons pelo primeiro tipo
app.get('/pokemon/:Name', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    collection.find({ "Name": req.params.Name }).toArray((error, result) => {
        if (error) {
            throw error
        }
        res.send(result)
    })
})
