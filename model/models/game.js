const mongoose= require('mongoose');
const {Schema}=mongoose;

const gameSchema= new Schema({
    lastDirection:[String],  //the last direction the player came from
    a:{
        type:Number,
        required:true,
        default:0
    },
    b:{
        type:Number,
        required:true,
        default:0
    },
    y:{
        type:Number,
        required:true,
        default:0
    },
    combatOnOff:{
        type:Number,
        required:true,
        default:0
    },
    keyRoom:[Object],
    currentRoom:[String],
    roomPosition:[Schema.Types.Mixed]
})

const Game= mongoose.model('Game',gameSchema);

module.exports= Game;