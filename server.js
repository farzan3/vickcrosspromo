var express = require('express');
var request = require('request');
var app     = express();
var mcache = require('memory-cache');
const port = process.env.PORT || 3000;
const megaURL='http://mishnat.com/mishnat';
const Duration=3000;
const api1="api1";
const api11="api4";
const api2="api2";
const api3="api3";

var cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next()
    }
  }
}


app.get('/scrape/:id', function(req, res){
 
   
  var id = req.params.id;
  url = megaURL+'/appInfoApi.php?packageName='+id;
 let key = '__express__' + api1+id;
 let cachedBody = mcache.get(key)
 var json = { pakagenname : "None", url : "None" , bit :0};
  
  if (cachedBody) {
      
	 json.pakagenname=cachedBody.Package;
	 json.url=cachedBody.HeaderImage;
	 json.bit=1;
	 res.send(json)
	 console.log("cached");
      return
    }else{

  request({ url: url,json: true}, function(error, response, body){
    if(!error){
		
	
      

	  var ranking="None";
      
         mcache.put(key, body, Duration * 1000);

	    json.pakagenname=body.Package;
		json.url=body.HeaderImage;
		json.bit=1;
	 console.log("web");
	}

    res.send(json)
  })
}

})

app.get('/scrapee/:id', function(req, res){
 
   
  var id = req.params.id;
  url = megaURL+'/crossonead.php?packageName='+id;
 let key = '__express__' + api11+id;
 let cachedBody = mcache.get(key)
 var json = { pakagenname : "None", header : "None",icon : "None",name : "None" , bit :0};
  
  if (cachedBody) {
      
	 
	  
	  json.pakagenname=cachedBody.Package;
	     json.header=cachedBody.HeaderImage;
	     json.icon=cachedBody.icon;
	    json.name=cachedBody.name;
		json.bit=1;
	  
	 res.send(json)
	 console.log("cached");
      return
    }else{

  request({ url: url,json: true}, function(error, response, body){
    if(!error){
		
	
      

	  var ranking="None";
      
         mcache.put(key, body, Duration * 1000);

	    json.pakagenname=body.Package;
	     json.header=body.HeaderImage;
	     json.icon=body.icon;
	    json.name=body.name;
		json.bit=1;
	 console.log("web");
	}

    res.send(json)
  })
}

})
app.get('/selfPromo/:id', function(req, res){
 
  var id = req.params.id;
  url = megaURL+'/appIconInfo.php?packageName='+id;

 let key = '__express__' + api2+id;
 let cachedBody = mcache.get(key);
 var json = { pakagenname : "None", url : "None" , iconurl :"None"};
  
  if(cachedBody){
	
	json.pakagenname=cachedBody.Package;
	json.url=cachedBody.HeaderImage;
    json.iconurl=cachedBody.icon;
	res.send(json)
	console.log("cached");
      return
  }else{
  
  request({ url: url,json: true}, function(error, response, body){
    if(!error){
		
	
      

	  var ranking="None";
      
      mcache.put(key, body, Duration * 1000);

	    json.pakagenname=body.Package;
		json.url=body.HeaderImage;
		json.iconurl=body.icon;
		 console.log("web");
	
	}

    res.send(json)
  })
  }
})

app.get('/inapp/:id', function(req, res){
 
 
  var id = req.params.id;
  url = megaURL+'/appInfoApi_3.php?packageName='+id;

 let key = '__express__' + api3+id;
 let cachedBody = mcache.get(key);
 
 if(cachedBody){
	 console.log("cache");
	  var j2= cachedBody;
	  res.send(j2)
 }else{
  request({ url: url,json: true}, function(error, response, body){
    if(!error){
		
	    var json =body;
		
		mcache.put(key, body, Duration * 1000);
        console.log("web");
	}

    res.send(json)
  })
 }
 })

app.listen(port)
  console.log('Server started on port', port);
exports = module.exports = app;
