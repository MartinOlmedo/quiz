var path = require('path');

// postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLITE DATABASE_URL  = sqlite://:@:/

var URL = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_NAME = (URL[6] || null);
var user = (URL[2] || null);
var pwd = (URL[3] || null);
var protocol = (URL[1] || null);
var dialect = (URL[1] || null);
var port = (URL[5] || null);
var host = (URL[4] || null);
var storage = process.env.DATABASE_STORAGE;


// carga modelo ORM
var Sequelize = require('sequelize');


// usa bbdd sqlite
//var sequelize = new Sequelize(null,null,null,
//	{dialect: "sqlite",storage:"quiz.sqlite"});

var sequelize = new Sequelize(DB_NAME,user,pwd,
	{
		dialect: protocol,
		protocol: protocol,
		port: port,
		host: host,
		storage: storage,
		omitNull: true
	});


// importa la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));


// exporta definicion de la tabla Quiz
exports.Quiz=Quiz;

// sequelize.sync() crea e inicializa tabla de preguntas en d b
sequelize.sync().success(function(){
	// success(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function(count){
		if(count === 0){
			Quiz.create({
				pregunta: 'Capital de Italia ??',
				respuesta: 'Roma'
			}).success(function(){console.log('Base de datos inicializaca')});
		}
	});
});
