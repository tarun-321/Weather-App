const path = require('path')
const express = require('express')
const hbs   = require('hbs')
// const { error } = require('console')

const forecast = require('./utils/forecast') 

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))


const app = express()
const publicDIR = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
// way to define second
app.set('views',viewsPath)
// for hbs config
hbs.registerPartials(partialsPath)
// app.set('views', path.join(__dirname , '../templates/views'));
app.use(express.static(publicDIR))//web page is static donot change when we refresh it!


app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        name:'Tarun'
    })
})



app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'Tarun'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        name:'Tarun'
    })
})



app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    } 
    
    forecast(req.query.address, (error,{location,forecast}) => {
        if(error){
            return res.send({error})
        }
     
        res.send({
                forecast,
                location
            })
    })
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Tarun',
        errorMessage:'Help article not found! .'
    })
})  



app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Tarun',
        errorMessage:'Page not found.'
    })
})      

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})