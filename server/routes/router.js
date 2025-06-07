const express = require('express');
const router = express.Router()

// http://localhost:4000/router
router.get('/',(req,res)=>{
    console.log("🚀 ~ app.get ~ req.path:", req.path)
    console.log("🚀 ~ app.get ~ req.params.id:", req.params.id);
    console.log("🚀 ~ app.get ~ req.query:", req.query);
    
    console.log("🚀 ~ app.get ~ req.body:", req.body);
    
    res.send({success:true, message:`from router`})
});

router.post('/signup',(req,res)=>{
    console.log("🚀 ~ app.get ~ req.path:", req.path);
    console.log("🚀 ~ app.get ~ req.body:", req.body);
    
    const payload = req.body;

    const { username } = payload;

    res.status(201);
    
    res.send({
      success: true,
      message: `account for user - ${username} created successfully!!!`,
      data: {
        id: 101,
        ...payload,
      },
    });
})

router.all('/*splat',(req,res)=>{
  console.log("🚀 ~ app.get ~ req.path:", req.path);
  console.log('Wildcard Route');
  res.status(404);
  res.send({success:false, message:'Invalid Route'})
})

module.exports = router;