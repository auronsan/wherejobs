var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
  
app.get('/sstack', function(req, res){

 url = 'https://stackoverflow.com/jobs?med=site-ui&ref=jobs-tab';
    request(url, function(error, response, html){
       
        if(!error){

            var $ = cheerio.load(html);

            var title, release, rating;
            //var json = JSON.parse("/output_stack.json");
            var json = [] ;
             var num = 0 ;
            $('.job-details').filter(function(){

                var data = $(this);
                console.log(data);
                console.log(data.html());
              //  console.log(data["0"].attribs.title);
               json.push({"title": data.html()});
              console.log(num);
              num = num + 1 ;
 
        });
        }else{
            console.log(error);
        }
        //console.log(json);

      
        fs.writeFile('output_stack.json', JSON.stringify(json), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');
    
})

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.

res.send('Success')

    
        
    })
})
,

app.get('/swfh', function(req, res){

 url = 'https://www.wfh.io/latest-remote-jobs';
    request(url, function(error, response, html){
    
        
        if(!error){

            var $ = cheerio.load(html);
            console.log($.parseHTML());
            var title, release, rating;
            //var json = JSON.parse("/output_wfh.json"); ;
            var json = [] ;
             var num = 1 ;
             $('.table-responsive').filter(function(){

                var data = $(this);
                console.log(data);
                console.log(data.html());
              //  console.log(data["0"].attribs.title);
               json.push({"title": data.html()});
              console.log(num);
              num = num + 1 ;
            
        });
        }else{
            console.log(error);
        }
        console.log(json);
        fs.writeFile('output_wfh.json', JSON.stringify(json), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');
    
})

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.


res.send('Success')

    
        
    })
})


app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;
