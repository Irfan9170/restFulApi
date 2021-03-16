const express=require('express');
const fs = require('fs');


const app=express();
const port=3000;
app.use(express.json());
const data = JSON.parse(fs.readFileSync(`${__dirname}/data/data.json`));

app.get('/api/v1/users',(req,res)=>{
    res.status(200).json({
        status:"succes",
        data:data
    })
});

app.post('/api/v1/users',(req,res)=>{
     
// let data = JSON.parse(fs.readFileSync(`${__dirname}/data/data.json`));
     const id=data[data.length-1]+1;
     const newUser=req.body;
     data.push(newUser);
    // console.log(typeof(newUser));
     fs.writeFile(`${__dirname}/data/data.json`,JSON.stringify(data),err=>{
        res.status(200).json({
            status:"succes",
            data:data
        })
     })

    console.log(newUser);
// res.send("hello data  is updated")
})

app.get('/api/v1/users/:id',(req,res)=>{
    const id=req.params.id;
    // console.log(id);
    if(id>data.length-1){
        return  res.status(404).json({
            status:"invalid id",
            // data : user
        })
    }
    const user=data.find(ele=>ele.id==id);
    res.status(200).json({
        status:"succes",
        data : user
    })

})

app.patch('/api/v1/users/:id',(req,res)=>{
    const id=req.params.id;
    // console.log(id);
    if(id>data.length){
        return  res.status(404).json({
            status:"invalid id",
            // data : user
        })
    }
    const user=data.find(ele=>ele.id==id);
    res.status(200).json({
        status:"Updated the data"
    })

})
app.delete('/api/v1/users/:id',(req,res)=>{
    const id=req.params.id;
    // console.log(id);
    if(id>data.length){
        return  res.status(404).json({
            status:"invalid id",
            // data : user
        })
    }
    const user=data.find(ele=>ele.id==id);
    res.status(200).json({
        status:"Updated the data",
        data:null
    })

})
app.listen(port,()=>{
    console.log("listening server");
})