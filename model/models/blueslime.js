const mongoose= require('mongoose');
const {Schema}=mongoose;

const blueslimeSchema= new Schema({
name: {
    type: String,
    default: "A Blue Slime"
},
playerHP:{
    type:Number,
    required:false,
    default:10
},
playerTarget:{
    type:Number,
    required:false,
    default:0
},
room:[],
inventory:[],
playerSkills:{
    attackSkill:{
        type:Number,
        required:false,
        default:1
    },
    attackCounter:{
        type:Number,
        required:false,
        default:0
    },
    defenseSkill:{
        type:Number,
        required:false,
        default:1
    },
    defenseCounter:{
        type:Number,
        required:false,
        default:0
    },
    block:{
        type:Number,
        required:false,
        default:0
    },
    blockCounter:{
        type:Number,
        required:false,
        default:0
    },
    luck:{
        type:Number,
        required:false,
        default:1
    },
    luckCounter:{
        type:Number,
        required:false,
        default:0
    }
}
})

const BlueSlime= mongoose.model('BlueSlime',blueslimeSchema);

module.exports= BlueSlime;