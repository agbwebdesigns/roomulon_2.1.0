import { Player } from "../model/Player.js";

function heroBuilder()  {
    let hero= new Player();
    hero.playerName= prompt("Salutations hero!  What ist thy name for recording into thy holy scrolls??");
    $("#heroname").html("Name: "+hero.playerName);
    hero.playerHP+=30;
    hero.playerSkills.attackSkill++;
    hero.playerSkills.defenseSkill++;
    hero.playerSkills.luck++;
    $("#herohp").html("HP: "+hero.playerHP);
    $('#herogold').html('Gold: '+hero.gold);
    // $("#weapon").html("Weapon Skill: ");
    // $("#armor").html("Armor: ");
    $("#weaponbonus").html("Weapon: "+"<br>"+hero.playerSkills.weaponBonus);
    $("#attackskill").html("Attack: "+"<br>"+hero.playerSkills.attackSkill);
    $("#armorbonus").html("Armor: "+"<br>"+hero.playerSkills.armorBonus);
    $("#defenseskill").html("Defense: "+"<br>"+hero.playerSkills.defenseSkill);
    $("#block").html("Block: "+"<br>"+hero.playerSkills.block);
    $("#parry").html("Parry: "+"<br>"+hero.playerSkills.parry);
    $("#luck").html("Luck: "+"<br>"+hero.playerSkills.luck);
    console.log("this is the name of our hero "+hero.playerName);
    return hero;
}

export {heroBuilder};