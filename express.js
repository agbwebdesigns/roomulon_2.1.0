const express= require('express');
require('dotenv').config()
const mongoose= require('mongoose');
const userRouter= require('./control/routers/hero.js');
const roomRouter= require('./control/routers/rooms.js');
const gameRouter=require('./control/routers/game.js')

const app= express();
app.use(express.json());  //automatically parses incoming json data to an Object so it can be used
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./view/statics'));
app.use(userRouter);
app.use(roomRouter);
app.use(gameRouter);

const mySecret=process.env.MONGODB;
// console.log('mysecret: '+mySecret);
mongoose.set('strictQuery', false);
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true, });

const port= 3000;//process.env.PORT;  //looking at process.env.PORT to get the port value, otherwise defaulting to port 3000
app.listen(port,() =>  {  //this starts the server
    console.log('Server is up on port '+port);
})