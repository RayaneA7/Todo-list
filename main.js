//including
const { dir } = require('console');
const { Router } = require('express');
const express = require('express');
const mongoose = require('mongoose'); 
const Todo = require('./models/todo.js');

let host = 'localhost';
let port = 3000;
let todos = { };
// let todos = { todo: 'life'}
//
const app = express();

//connect  to mongoob
const dbURI = 'mongodb+srv://Rayane:rayane1234@cluster0.ubwer.mongodb.net/studentTM?retryWrites=true&w=majority';
mongoose.connect(dbURI ,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false} )
    .then((result) => app.listen(port , () => {
        console.log('the app is listenning');
    }) )
    .catch((err) => console.log(err));

//view engines 
app.set('view engine' , 'ejs');


//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

//todo routes
app.get('/', (req, res) => {
    // res.send('getting done');
    // res.sendFile('./views/index.html', {root : __dirname});
    Todo.find().sort({ createdAt: -1 })
        .then((result)=> {
            todos = [];
            result.forEach( ele => {
                todos.push(ele);

            })
            res.render('index' , {result});

        })
        .catch((err) => {
            console.log(err)
        })
});

app.get('/add-todo', (req, res) => {
    const todo = new Todo({
        todo: 'buy a car haha'
    });

    todo.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err)
    })
} ); 

app.get('/all-todos', (req, res) => {
    Todo.find()
        .then((result) => {
            console.log('all blogs are gotten')
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
});

app.get('/get-todo', (req, res) => {
    Todo.findById('61183d6ef707092360fc32a6')
        .then((result) => {
            res.send(result)
            console.log('the todo task is gotten')
        })
        .catch((err) => {
            console.log(err)
        })
});

app.post('/todos', (req , res) => {
    todos.todo = req.body.todo;
    todos.finished = false;
    console.log(req.body);
    //todos.push(req.body);
    //todos.push({finished : 'false'});
    const todo = new Todo(todos);
    console.log(todo);
    todo.save()
        .then((result) => {
            console.log(result.todo)
            //todos.push({todo :result.todo.toString() })
            //todos.push(result)
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err)
        })
} )

app.delete('/tasks/:id', (req, res) => {
    console.log('hello wrod')
    const id = req.params.id ;
    Todo.findByIdAndDelete(id)
        .then((result) => {
            console.log(result);
            res.json({redirect:'/'});
        })
        .catch(err => {
            console.log(err)
        })
} );

// app.put('tasks/:id', (req, res) =>{
//     console.log('hello wrod')
//     const id = req.params.id;
//     Todo.findByIdAndUpdate(id)
//         .then((result) => {
//             console.log(result);
//             res.json({redirect:'/'});
//         })
//         .catch(err => {
//             console.log(err)
//         })

// })

app.put('/tasks/:id', (req, res) => {
    console.log('hello wrod');
    const id = req.params.id ;
    // Todo.findByIdAndUpdate(id, {todo: "done"})
    Todo.findByIdAndUpdate(id, {finished: true})
        .then((result) => {
            console.log(result);
            res.json({redirect:'/'});
        })
        .catch(err => {
            console.log(err)
        })
} );