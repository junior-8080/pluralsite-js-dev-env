import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack'
import config from '../webpack.config.dev'

/* eslint-disable no-console */

const port = 3000;
const compiler = webpack(config);
const app = express();

app.use(require('webpack-dev-middleware')(compiler,{
  noInfo:true,
  publicPath: config.output.publicPath
}))

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,"../src/index.html"));
});

app.get('/users',function(req,res){
 res.json(
    [
      {"id": 1,"firstname":"Bob","lastname": "Smith","email":"bob@gmail.com"},
      {"id": 2,"firstname":"Sundar","lastname": "Pitchai","email":"sundar@gmail.com"},
      {"id": 3,"firstname":"Lee","lastname": "Kam","email":"lee@gmail.com"},
      {"id": 4,"firstname":"Micky","lastname": "Loly","email":"loly@gmail.com"}
    ]
  );
})

app.listen(port,(err)=>{
  if(err){
    console.log(err)
  }else{
    open('http://localhost:'+ port);
  }
})
