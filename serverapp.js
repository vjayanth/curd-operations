var express = require('express');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
var http=require('http');
var mongoose = require('mongoose');
var Schema=  mongoose.Schema;
mongoose.connect('mongodb://localhost/mini');
app.use('/public', express.static(path.join(__dirname + '/public')));


var testSchema = new Schema({ name: String, description: String ,amount:Number,date:Date,update:Date});
var Project = mongoose.model('Project', testSchema);
app.get('/', function (req, res) {
	console.log(__dirname);
res.sendFile(path.join(__dirname, '/index.html'));
});
app.post('/create', function (req, res) {
	var todo=new Project(req.body);
	todo.save(function (err, createdTodoObject) {  
    if (err) {
        res.send(err);
    }
    // This createdTodoObject is the same one we saved, but after Mongo
    // added its additional properties like _id.
    res.send(createdTodoObject);
});

});
app.get('/getList',function(req,res){
	Project.find(function(error,items){
		if(error){
			res.send(error);
			res.status(404);
		}
		else{
			res.send(items);
			res.status(200);
		}
	})
});
app.post('/deleteRecord',function(req,res){

});
app.post('/updateRecord',function(req,res){
	Project.findById(req.params.todoId, function (err, todo) {  
    // Handle any possible database errors
    if (err) {
        res.status(500).send(err);
    } else {
        // Update each attribute with any possible attribute that may have been submitted in the body of the request
        // If that attribute isn't in the request body, default back to whatever it was before.
        todo.name = req.body.name || todo.name;
        todo.description = req.body.description || todo.description;
        todo.amount = req.body.amount || todo.amount;

        // Save the updated document back to the database
        todo.save(function (err, todo) {
            if (err) {
                res.status(500).send(err)
            }
            res.send(todo);
        });
    }
});

});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})