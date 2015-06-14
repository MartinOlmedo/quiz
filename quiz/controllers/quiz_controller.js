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