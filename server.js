const http = require('http');
const fs = require('fs');
const qs = require('qs');
const server = http.createServer((req, res)=>{
    if(req.method === 'GET'){
        fs.readFile('./views/index.html','utf-8',(err, data)=>{
            if(err){
                console.log(err.message);
            }
            res.writeHead(200,{'Content-type':'text/html'});
            res.write(data);
            res.end();
        })
    }else {
        let userJson = [];
        let data = ''
        req.on('data',(chunk)=>{
            data+=chunk;
        })
        req.on('end',()=>{
            userJson = JSON.parse(fs.readFileSync('./data.json','utf-8'));
            data = qs.parse(data);
            let info = {
                id : data.id,
                name : data.name,
                price : data.price
            }
            userJson.push(info);
            fs.writeFile('./data.json',JSON.stringify(userJson),'utf-8',err =>{
                if (err){
                    console.log(err);
                }
            })
            res.writeHead(301,{"Location" :"http://localhost:3000"});
            res.end()
        })
    }
})
server.listen('3000',function (){
    console.log("sss")
})