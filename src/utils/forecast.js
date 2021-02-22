const request= require('request')

const forecast= (location,callback)=>{

    const url="http://api.weatherstack.com/current?access_key=c24b7f99e946075a97bd6396380250ad&query="+location
    
    request({url:url,json:true},(error,response)=>{
      
        if(error){

            callback('unable to connect with the server',undefined)
        }else if(response.body.error){
    
            callback('unable to find the place',undefined)
        }else{
    
            callback(undefined,{
                temperature:response.body.current.temperature,
                overview:"it is "+response.body.current.weather_descriptions[0]+" weather outside",
                precipitation_chances:response.body.current.precip+"%"
            })
        }
    
    })
    
}

module.exports=forecast