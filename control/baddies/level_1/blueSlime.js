import { Player } from "../../../model/Player.js";
import { textWindowScroller } from "../../helper_functions/text_window_scroller.js";
import { roomIndexBreakdown } from "../../helper_functions/room_index_breakdown.js";

async function blueSlime(sec, krNum)  {  //this function will call the baddie deployer and specifically create rats
    let {roomBuilder}= await import('../../game_controller.js');
    setTimeout(function()  {  //this function runs in sec(variable) seconds
        let bs= new Player();  //this creates a new rat in the room
        bs.room.push('keyRoom['+krNum+"]");
        bs.playerName= "A Blue Slime";
        bs.playerHP+=10;
        bs.playerSkills.attackSkill+=1;
        bs.playerSkills.defenseSkill+=1;
        bs.playerSkills.luck+=1;
        bs.knowThyCounter+=2;

        let baddieGold= Math.floor((Math.random()*4));
        bs.gold=baddieGold;

        console.log('krnum: '+krNum);
        roomBuilder.keyRoom[krNum].baddies.push(bs);
        console.log("is there a baddie in the room? "+roomBuilder.keyRoom[krNum].baddies[0].playerName);

        console.log("know thy counter: "+bs.knowThyCounter);
        console.log("bs room"+bs.room[0]);
        if (bs.room[0]===roomBuilder.currentRoom[0])  {  //this checks to see if the room the rat started in is the same as the current room
            //if (keyRoom[krNum].baddies.length===0)  {  //if there is no baddie in the room
                console.log('The baddie is in the same room as the player!');
                $("#textwindow").append("<p>"+bs.playerName+" has oozed into the room.</p>");  //if it is then notify the player
                textWindowScroller();
                //keyRoom[krNum].baddies.push(bs.knowThyCounter);  //push the rat object to the occupied room
                let chanceRoll= Math.floor((Math.random()*20)+1);
                if (chanceRoll>15)  {  //this is where it is decided if a baddie has haste or not
                    console.log("this is which baddie is attacking: "+bs.playerName);
                    bs.turn++;  //this indicates that it is the baddies turn to attack
                    bs.playerTarget++;
                    console.log("the baddie attacks!");
                    $("#textwindow").append("<p>Startled, "+bs.playerName+" excitedly lunges at you in a fit of rage!</p>");
                    textWindowScroller();
                    // combatOnOff++;
                    $("#textwindow").append("<p>"+bs.playerName+" takes initiative.</p>");
                    bs.battleTurner(2, krNum, bs.knowThyCounter);
                    //lsCounter++;

                    //*************************if the baddie has haste the player needs to be prevented from leaving the room****************************

                } else if (chanceRoll<15)  {  //if there is no haste roll
                    console.log("sorry, no baddie sneak attack this time!");
                    if (bs.playerTarget===0)  {
                        bs.playerTarget++;
                        setTimeout(function()  {
                            //keyRoom[krNum].baddies[0].turn++;  //this indicates that it is the baddies turn to attack
                            console.log("this is which baddie is attacking: "+bs.playerName);
                            textWindowScroller();
                            // combatOnOff++;
                            $("#textwindow").append("<p>"+bs.playerName+" takes initiative, you brace for attack.</p>");
                            bs.battleTurner(2, krNum, bs.knowThyCounter);
                            //keyRoom[krNum].baddies[0].turn--;
                            //hero.turn++;
                        }, chanceRoll*1000)
                    }
                }
            //}
        } else if (bs.room[0]!==roomBuilder.currentRoom[0])  { //if it is not the same room
            //keyRoom[krNum].baddies.push(bs.knowThyCounter);  //push the rat object to the occupied room
            console.log('The baddie is not in the same room as the player.');
            let rib= roomIndexBreakdown(bs.room[0]);
            console.log('rib'+rib);
            bs.baddieMover();
            //bs.baddieMover();
        }
    }, sec*1000);  //this function runs in sec(variable) seconds
}

export {blueSlime};