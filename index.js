const http = require("http");
const fs = require("fs");
var requests = require("requests");

const homeFile = fs.readFileSync("home.html","utf-8");
const replaceVal = (tempVal,orgVal)=>{
let temperature = tempVal.replace("{%tempval%}",orgVal.main.temp);
temperature = tempVal.replace("{%tempmin%}",orgVal.main.temp);
temperature = tempVal.replace("{%tempmax%}",orgVal.main.temp);
temperature = tempVal.replace("{%location%}",orgVal.main.temp);
temperature = tempVal.replace("{%country%}",orgVal.main.temp);

}
const server = http.createServer((req,res)=>{
    if(req.url== "/"){
requests("https://api.openweathermap.org/data/2.5/weather?q=Pune&units=metric&appid=1fc9b72c252aa948987fabdb60b298e1")
        .on("data",(chunk) => {
            const objdata = JSON.parse(chunk);
            const arrData = [objdata];
            // console.log(arrData[0].main.temp);
            const realTimeData = arrData.map((val)=>{
                replaceVal(homeFile,val);
            });
        })
        .on("end", (err) => {
            if (err) return console.log("connection closed due to errors", err);
            console.log("end");
        });
    }
});

server.listen(8000,"127.0.0.1");