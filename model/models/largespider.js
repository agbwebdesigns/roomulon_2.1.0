const mongoose= require('mongoose');
const {Schema}=mongoose;

const largespiderSchema= new Schema({
name: {
    type: String,
    default: "A Large Spider"
},
playerHP:{
    type:Number,
    required:false,
    default:5
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

const LargeSpider= mongoose.model('LargeSpider',largespiderSchema);

module.exports= LargeSpider;