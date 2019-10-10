var express = require('express');
var request = require('request');
var app     = express();
const port = process.env.PORT || 3000;
app.get('/scrape/:id', function(req, res){
 
  var id = req.params.id;
  url = 'http://splashstudio.org/appInfoApi.php?packageName='+id;

  request({ url: url,json: true}, function(error, response, body){
    if(!error){
		
	
      

	  var ranking="None";
      
      var json = { pakagenname : "None", url : "None" , bit :0};

	    json.pakagenname=body.Package;
		json.url=body.HeaderImage;
		json.bit=1;
	
	}

    res.send(json)
  })
})

app.get('/selfPromo/:id', function(req, res){
 
  var id = req.params.id;
  url = 'http://splashstudio.org/appIconInfo.php?packageName='+id;

  request({ url: url,json: true}, function(error, response, body){
    if(!error){
		
	
      

	  var ranking="None";
      
      var json = { pakagenname : "None", url : "None" , iconurl :"None"};

	    json.pakagenname=body.Package;
		json.url=body.HeaderImage;
		json.iconurl=body.icon;
	
	}

    res.send(json)
  })
})

app.get('/inapp/:id', function(req, res){
 
  var id = req.params.id;
  url = 'http://business.splashstudio.org/appInfoApi_3.php?packageName='+id;

  request({ url: url,json: true}, function(error, response, body){
    if(!error){
		
	    var json =body;
		

	}

    res.send(json)
  })
})

app.listen(port)
  console.log('Server started on port', port);
exports = module.exports = app;
