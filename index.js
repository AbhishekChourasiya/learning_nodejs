const express = require('express');
const Joi = require('joi');
const router = express.Router();
const app = express();

// from things.js file
var things = require('./my node app/things');
app.use('/things', things);

// body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body as 
//something easier to interface with. 
var bodyParser = require('body-parser');

// adding a middleware to use in request processing pipeline
app.use(express.json()); 


//Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST) and
// exposes the resulting object (containing the keys and values) on req.body. 
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.text());
const courses = [
    { id:1 ,name: 'course 1'},
    { id:2 ,name: 'course 2'},
    { id:3 ,name: 'course 3'},
    { id:4 ,name: 'course 4'}
];


function validateName(req){
    const schema = {
        name: Joi.string().min(3).required().trim()
    };
    return Joi.validate(req.body , schema);
}
app.get('/',(req,res)=>{
   // res.write('hello');
   res.send('Dashboard');
});

app.get('/api/courses',(req,res)=>{
    
    res.send(courses);
 });
 
app.get('/api/courses/:id',(req,res)=>{
    // find course 
   const course= courses.find(c => c.id=== parseInt(req.params.id));
   if(!course) return res.status(404).send('Course with given id not found');
   
    // return course
   res.send(course);
 });

 app.post('/api/courses', (req,res)=>
{
    // simple input validation
    // if(!req.body.name || req.body.name.length < 3 ){
    //     return res.status(400).send('name is required and should be minimum 3 characters');
    // }

    // better input validation using Joi library
    const {error} = validateName(req);
    if(error) return res.status(400).send(error.details[0].message)

    const course ={
        id: courses.length +1,
        name: req.body.name
    };

    courses.push(course);

    res.status(201).send(course);
});


app.put('/api/courses/:id', (req,res) =>{

     // better input validation using Joi library
     const {error} = validateName(req);
     if(error) return res.status(400).send(error.details[0].message)
 
    // dummy courses object to update
    const course ={
        id: parseInt(req.params.id),
        name: req.body.name
    };

    // find course
    if(!courses.find(c => c.id=== parseInt(req.params.id))) return res.status(404).send('Invalid course number');
    
    // update course with new course object
    courses[req.params.id-1]= course;
    res.send(course);
});


app.delete('/api/courses/:id',(req,res)=>{

    const course= courses.find( c => c.id=== parseInt(req.params.id)); // find course 
    if(!course) return res.status(404).send('Course doesnt exist');


    const index = courses.indexOf(course); // search the index number of course
    courses.splice(index,1); // remove one element after index

res.send(course);

});
;

// checking if PORT exist in environment else set default port as 3000
var port = process.env.PORT|| 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
 