const mongoose= require('mongoose');
const {Schema}=mongoose;

const heroSchema= new Schema({
name: {
    type: String,
    required:true
},
playerHP:{//player hitpoints
    type:Number,
    required:false,
    default:30
},
gold:{//gold carried
    type:Number,
    required:false,
    default:0
},
baddieKills:{//total baddie kills
    type:Number,
    required:false,
    default:0
},
medpacksUsed:{//how many medpacks used
    type:Number,
    required:false,
    default:0
},
playerTarget:{//is the player targeting a baddie?
    type:Number,
    required:false,
    default:0
},
room:{//which room are you in?
    type:String,
    required:false,
    default:"temp"
},
inventory:[Object],//what is the player carrying?
weaponBonus:{//bonus from equiped weapon, how many 6 sided dice can be added for an attack with the current weapon?
    type:Number,
    required:false,
    default:0
},
weaponSkill:{//skill at using a weapon, not implemented yet
    type:Number,
    required:false,
    default:0
},
attackSkill:{//skill at attacking, how many 6 sided attack dice can be rolled for an attack?
    type:Number,
    required:false,
    default:1
},
attackCounter:{//how many times have you rolled a 6 on an attack die, 10 times will increment attackSkill by +1
    type:Number,
    required:false,
    default:0
},
armorBonus:{//no armor exists yet
    type:Number,
    required:false,
    default:0
},
defenseSkill:{//how many 6 sided attack dice can be rolled for defense?
    type:Number,
    required:false,
    default:1
},
defenseCounter:{//how many times have you rolled a 6 on an defense die, 10 times will increment defenseSkill by +1
    type:Number,
    required:false,
    default:0
},
block:{//not implemented yet, for use w/shield
    type:Number,
    required:false,
    default:0
},
blockCounter:{
    type:Number,
    required:false,
    default:0
},
parry:{//not implemented yet, for use w/sword
    type:Number,
    required:false,
    default:0
},
parryCounter:{
    type:Number,
    required:false,
    default:0
},
luck:{//how many 6 sided attack dice can be rolled for luck?
    type:Number,
    required:false,
    default:1
},
luckCounter:{//how many times have you rolled a 6 on an luck die, 10 times will increment luck by +1
    type:Number,
    required:false,
    default:0
}
})

const Hero= mongoose.model('Hero',heroSchema);

module.exports= Hero;