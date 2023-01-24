const mongoose= require('mongoose');
const {Schema}=mongoose;

const itemSchema= new Schema({
    itemName:String,
    weaponBonus:Number,
    playerHP:Number,
    designator:String
})

const roomSchema= new Schema({
    mapPosition:[{
        a:{
            type: Number
        },
        b:{
            type: Number
        }
    }],//this should be created when the room is created, (x,y) grid coordinates on the map
    baddies:[Schema.Types.ObjectId],//an array for live baddies in a given room
    roomContainer:[itemSchema],//these are the items in the room, right now only a container can in this array
    roomConnectionsArray:{//an array for which rooms connect to this room
        north:{
            type:String,
            required:true,
            default:"temp"
        },
        south:{
            type:String,
            required:true,
            default:"temp"
        },
        east:{
            type:String,
            required:true,
            default:"temp"
        },
        west:{
            type:String,
            required:true,
            default:"temp"
        }
    }
})

roomSchema.pre('updateMany', async function(next)  {
    await Rooms.updateMany({mapPosition:{x:0}})
    console.log('rooms found!');
    next();
})

const Items= mongoose.model('Items',itemSchema);
const Rooms= mongoose.model('Rooms',roomSchema);

module.exports= Rooms,Items;