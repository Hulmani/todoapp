var Todo = require('./models/todo');
//these methods are not exported


function getTodos(res) {
    Todo.find(function (err, todos) {
             
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
              res.cookie('kop','hrl', { maxAge: 900000, httpOnly: true });
              console.log('cookie 2 created successfully');

            if (err) {
            res.send(err);
        }
              //console.log("inside rooutes " +todos[0].id);
        res.json(todos); // return all todos in JSON format
    });
}
;


function toDoList(res,userName) {
    console.log(userName);
    Todo.find({userName: userName}, function (err, todos) {
              if (err){
              res.send(err);       //req.params.todo_user
              }
              res.json(todos);// return all todos in JSON format
              });
}
;



module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
            try
            {
            var cookie = req.cookies.test;
            console.log('cookie exists', cookie);
            }
            catch(e)
            {
            var randomNumber=Math.random().toString();
            randomNumber=randomNumber.substring(2,randomNumber.length);
            res.cookie('test','present', { maxAge: 900000, httpOnly: true });
            console.log('Not defined: cookie created successfully');
            }
             // no: set a new cookie
           
            getTodos(res);
    });


    
    // create todo and send back all todos after creation
    // only belonging to that particular user
    
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            userName: req.body.user,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
                    
            toDoList(res,req.body.user);

           //  getTodos(res);
        });

    });

    
    //update completed todo of the user
//    app.put('/api/todos/:todo_user/:todo_id', function (req, res) {
//              console.log('Updating '+req.params.todo_id+' '+req.params.todo_user);
//            Todo.remove({
//                        _id: req.params.todo_id,
//                        userName: req.params.todo_user
//                        }, function (err, todo) {
//                        if (err)
//                        res.send(err);
//                        
//                        toDoList(res,req.params.todo_user);
//                        });
//            });
    
    app.put('/api/todos/:todo_user/:todo_id', function (req, res) {
            console.log('Updating '+req.params.todo_id+' '+req.params.todo_user);
            
            Todo.findById( req.params.todo_id, function (err, todo) {
              if (err) return handleError(err);
              
              todo.completed = true;
              todo.save(function (err) {
                        if (err) return handleError(err);
                        toDoList(res,req.params.todo_user);
                        });
              });
            });
    
    // delete a todo of the user
    app.delete('/api/todos/:todo_user/:todo_id', function (req, res) {
               Todo.remove({
                           _id: req.params.todo_id,
                           userName: req.params.todo_user
                           }, function (err, todo) {
                           if (err)
                           res.send(err);
                           
                           toDoList(res,req.params.todo_user);
                           });
               });
    

    // application -------------------------------------------------------------
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
    
   
    
    
    //get all the user data for the particular user
    
    app.get('/api/todos/:todo_user', function (req, res) {
           
            toDoList(res,req.params.todo_user);
            });
    
//
//    app.post('/api/todos/:todo_user', function (req, res) {
//             Todo.create({
//                         text: req.body.text,
//                         userName: req.body.user,
//                         done: false
//                         }, function (err, todo) {
//                         if (err)
//                         res.send(err);
//            toDoList(res,req.params.todo_user);
//            });
//        });
};
            