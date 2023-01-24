import { Player } from "../../../model/Player.js";
import { textWindowScroller } from "../../helper_functions/text_window_scroller.js";
import { roomIndexBreakdown } from "../../helper_functions/room_index_breakdown.js";

async function ratMaker(sec, krNum)  {  //this function will call the baddie deployer and specifically create rats
    let {roomBuilder}= await import('../../game_controller.js');
    setTimeout(function()  {  //this function runs in sec(variable) seconds
        let br= new Player();  //this creates a new rat in the room
        br.room.push('keyRoom['+krNum+']');
        br.playerName= "A Big Rat";
        br.playerHP+=5;
        br.playerSkills.attackSkill+=1;
        br.playerSkills.defenseSkill+=1;
        br.playerSkills.luck+=1;
        br.knowThyCounter+=1;

        let baddieGold= Math.floor((Math.random()*4));
        br.gold=baddieGold;

        console.log('krnum: '+krNum);
        roomBuilder.keyRoom[krNum].baddies.push(br);
        console.log("is there a baddie in the room? "+roomBuilder.keyRoom[krNum].baddies[0].playerName);
        console.log("know thy counter: "+br.knowThyCounter);
        console.log("br room"+br.room[0]);
        if (br.room[0]===roomBuilder.currentRoom[0])  {  //this checks to see if the room the rat started in is the same as the current room
            //if (keyRoom[krNum].baddies.length===0)  {  //if there is no baddie in the room
                console.log('The baddie is in the same room as the player!');
                $("#textwindow").append("<p>"+br.playerName+" has entered the room.</p>");  //if it is then notify the player
                textWindowScroller();
                //keyRoom[krNum].baddies.push(br.knowThyCounter);  //push the rat object to the current room baddies array
                let chanceRoll= Math.floor((Math.random()*20)+1);
                if (chanceRoll>15)  {  //if chanceRoll is 15 or greater then the baddie has haste
                    console.log("this is which baddie is attacking: "+br.playerName);
                    br.turn++;  //this indicates that it is the baddies turn to attack
                    br.playerTarget++;
                    console.log("the baddie attacks!");
                    $("#textwindow").append("<p>Startled, "+br.playerName+" excitedly lunges at you in a fit of rage!</p>");
                    textWindowScroller();
                    // combatOnOff++;
                    $("#textwindow").append("<p>"+br.playerName+" takes initiative.</p>");
                    br.battleTurner(2, krNum, br.knowThyCounter);
                    //brCounter++;
                } else if (chanceRoll<15)  {  //if there is no haste roll
                    console.log("sorry, no baddie sneak attack this time!");
                    if (br.playerTarget===0)  {
                        br.playerTarget++;
                        setTimeout(function()  {
                            //keyRoom[krNum].baddies[0].turn++;  //this indicates that it is the baddies turn to attack
                            console.log("this is which baddie is attacking: "+br.playerName);
                            textWindowScroller();
                            // combatOnOff++;
                            $("#textwindow").append("<p>"+br.playerName+" takes initiative, you brace for attack.</p>");
                            br.battleTurner(2, krNum, br.knowThyCounter);
                            //keyRoom[krNum].baddies[0].turn--;
                            //hero.turn++;
                        }, chanceRoll*1000)
                    }
                }
            //}
        } else if (br.room[0]!==roomBuilder.currentRoom[0]){ //if it is not the same room
            //keyRoom[krNum].baddies.push(br.knowThyCounter);  //push the rat object to the current room baddies array
            console.log('The baddie is not in the same room as the player.');
            let rib= roomIndexBreakdown(br.room[0]);
            console.log('rib'+rib);
            br.baddieMover();
            //brCounter++;;
        }
    }, sec*1000);  //this function runs in sec(variable) seconds
}

export {ratMaker};