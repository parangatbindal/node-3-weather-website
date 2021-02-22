const request=require('request')
const path= require('path')
const express= require('express')
const hbs=require('hbs')
const forecast= require('./utils/forecast')
const geocode=require('./utils/geocode')

const app=express()

// default setting to set the directory
const public_dir= path.join(__dirname, '../public')
const view_path=path.join(__dirname,'../templates/views')    // this we need toset directory
const partial_path=path.join(__dirname,'../templates/partials') 

//default setting to set the path

app.set('view engine', 'hbs')
app.set('views',view_path)
hbs.registerPartials(partial_path)

app.use(express.static(public_dir))

app.get('',(req, res)=>{

    res.render('index',{
        title:"Weather",
        name:'parangat'
    })
})
app.get('/about',(req, res)=>{

    res.render('about',{
        title:'web Server',
        name:'parangat bindal'

    })
})
app.get('/help',(req, res)=>{

    res.render('help',{
        title:'help page',
        name:'parangat bindal'

    })
})

app.get('/products',(req,res)=>{

    if(req.query.search){

        res.send({products: []})
    }else{
        res.send({ error:'your request is invalid'})
    }
})

app.get('/weather',(req, res)=>{
     if(!req.query.address){
       return res.send({error:'your address is invalid'})
    }
    geocode(req.query.address,(error,data)=>{

        if(error){
            return res.send({error: error})
        }
        forecast(data.location, (errormessage,forecast_data)=>{
            if(errormessage){
                return res.send({errormessage})
            }
            res.send({
                forecast_data,
                location:data.location
            })

        })
    })
   
})

app.get('/help/*',(req,res)=>{

    res.render('404',{
        title:'error',
        name:'parangat',
        errormessage:'help article not found'
    })
})

app.get('*',(req,res)=>{

    res.render("404",{
        title:" 404",
        name:'parangatbindal',
        errormessage:'page not found'
    })
})



app.listen(3000,()=>{
    console.log('express is all set')
})