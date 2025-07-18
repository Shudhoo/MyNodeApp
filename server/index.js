const express = require("express")
const mongoose = require("mongoose")
const cros = require("cors")
const EmployeeModel = require('./models/empl_model.js')

const app = express()

app.use(express.json())
app.use(cros())

mongoose.connect("mongodb://db-service.mongo-namespace:27017/employee",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/api/register', (req, res)=> {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})

app.post('/api/login', (req, res)=> {
    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user =>{
        if(user) {
            if(user.password === password) {
                res.json("Success")
            } else {
                res.json("Password Incorrect")
            }
        } else {
            res.json("No Record Existed !!")
        }
    })
})

app.listen(3001, '0.0.0.0', () =>{
    console.log("Server Is Running");
})
