var path = require('path');
// console.log('************-PATH--> ' + path);
// carga modelo ORM
var Sequelize = require('sequelize');
// console.log('************-Sequelize--> ' + Sequelize);
// usa bbdd sqlite
var sequelize = new Sequelize(null,null,null,
	{dialect: "sqlite",storage:"quiz.sqlite"});
// console.log('************-sequelize--> ' + sequelize);

// importa la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
// console.log('************-Quiz--> ' + Quiz);
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
