import { Player } from "../../../model/Player.js";
import { textWindowScroller } from "../../helper_functions/text_window_scroller.js";
import { roomIndexBreakdown } from "../../helper_functions/room_index_breakdown.js";

async function spiderMaker(sec, krNum)  {  //this function will call the baddie deployer and specifically create rats
    let {roomBuilder}= await import('../../game_controller.js');
    setTimeout(function()  {  //this function runs in sec(variable) seconds
        let ls= new Player();  //this creates a new rat in the room
        ls.room.push('keyRoom['+krNum+"]");
        ls.playerName= "A Large Spider";
        ls.playerHP+=5;
        ls.playerSkills.attackSkill+=1;
        ls.playerSkills.defenseSkill+=1;
        ls.playerSkills.luck+=1;
        ls.knowThyCounter+=2;

        let baddieGold= Math.floor((Math.random()*4));
        ls.gold=baddieGold;

        console.log('krnum: '+krNum);
        roomBuilder.keyRoom[krNum].baddies.push(ls);
        console.log("is there a baddie in the room? "+roomBuilder.keyRoom[krNum].baddies[0].playerName);

        console.log("know thy counter: "+ls.knowThyCounter);
        console.log("ls room"+ls.room[0]);
        if (ls.room[0]===roomBuilder.currentRoom[0])  {  //this checks to see if the room the rat started in is the same as the current room
            //if (keyRoom[krNum].baddies.length===0)  {  //if there is no baddie in the room
                console.log('The baddie is in the same room as the player!');
                $("#textwindow").append("<p>"+ls.playerName+" has entered the room.</p>");  //if it is then notify the player
                textWindowScroller();
                //keyRoom[krNum].baddies.push(ls.knowThyCounter);  //push the rat object to the occupied room
                let chanceRoll= Math.floor((Math.random()*20)+1);
                if (chanceRoll>15)  {  //this is where it is decided if a baddie has haste or not
                    console.log("this is which baddie is attacking: "+ls.playerName);
                    ls.turn++;  //this indicates that it is the baddies turn to attack
                    ls.playerTarget++;
                    console.log("the baddie attacks!");
                    $("#textwindow").append("<p>Startled, "+ls.playerName+" excitedly lunges at you in a fit of rage!</p>");
                    textWindowScroller();
                    // combatOnOff++;
                    $("#textwindow").append("<p>"+ls.playerName+" takes initiative.</p>");
                    ls.battleTurner(2, krNum, ls.knowThyCounter);
                    //lsCounter++;

                    //*************************if the baddie has haste the player needs to be prevented from leaving the room****************************

                } else if (chanceRoll<15)  {  //if there is no haste roll
                    console.log("sorry, no baddie sneak attack this time!");
                    if (ls.playerTarget===0)  {
                        ls.playerTarget++;
                        setTimeout(function()  {
                            //keyRoom[krNum].baddies[0].turn++;  //this indicates that it is the baddies turn to attack
                            console.log("this is which baddie is attacking: "+ls.playerName);
                            textWindowScroller();
                            // combatOnOff++;
                            $("#textwindow").append("<p>"+ls.playerName+" takes initiative, you brace for attack.</p>");
                            ls.battleTurner(2, krNum, ls.knowThyCounter);
                            //keyRoom[krNum].baddies[0].turn--;
                            //hero.turn++;
                        }, chanceRoll*1000)
                    }
                }
            //}
        } else if (ls.room[0]!==roomBuilder.currentRoom[0])  { //if it is not the same room
            //keyRoom[krNum].baddies.push(ls.knowThyCounter);  //push the rat object to the occupied room
            console.log('The baddie is not in the same room as the player.');
            let rib= roomIndexBreakdown(ls.room[0]);
            console.log('rib'+rib);
            ls.baddieMover();
            //ls.baddieMover();
        }
    }, sec*1000);  //this function runs in sec(variable) seconds
}

export {spiderMaker};