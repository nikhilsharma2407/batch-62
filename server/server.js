
const express = require('express');
const router = require('./routes/router');
const userRouter = require('./routes/userRouter');
const cartRouter = require('./routes/cartRouter');

const app = express();

// we configure the middleware

// enable our server to parse the request body
app.use(express.json());

app.get('/checkServer/:id',(req, res)=>{
    console.log("🚀 ~ app.get ~ req.path:", req.path)
    console.log("🚀 ~ app.get ~ req.params.id:", req.params.id);
    console.log("🚀 ~ app.get ~ req.query:", req.query);
    
    console.log("🚀 ~ app.get ~ req.body:", req.body);
    
    res.status(200);
    res.send({ sucess: true, message: "Successful response from server!!!" });
});

app.use('/router',router);
app.use('/user', userRouter);
app.use('/cart', cartRouter);

const PORT = 4000;


app.listen(PORT, ()=>{
    console.clear();
    console.log(`Server running on PORT - ${PORT}`)
})