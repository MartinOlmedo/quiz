/*
// GET /quizes/question
exports.question=function(req,res){
	console.log("mando cpital italia");
	res.render('quizes/question',{pregunta: 'Capital de Italia'});
}

// GET /quizes/answer
exports.answer=function(req,res){
	console.log('REQ-> ' + req);
	console.log('RES-> ' + res);
	if(req.query.respuesta === 'Roma'){
		res.render('quizes/answer',{ respuesta: 'Correcto'});
	} else{
		res.render('quizes/answer',{ respuesta: 'Inorrecto'});
	}

}
*/

var models = require('../models/models.js');

exports.index=function(req,res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs',{quizes: quizes});
	})
};

// GET /quizes/question
exports.show=function(req,res){
	models.Quiz.findAll().then(function(quiz){
		res.render('quizes/question',{pregunta: quiz[0].pregunta});
	});
	
}

// GET /quizes/answer
exports.answer=function(req,res){
	models.Quiz.findAll().then(function(quiz){
		if(req.query.respuesta === quiz[0].respuesta){
			res.render('quizes/answer',{ respuesta: 'Correcto'});
		} else{
			res.render('quizes/answer',{ respuesta: 'Inorrecto'});
		}
	});
}