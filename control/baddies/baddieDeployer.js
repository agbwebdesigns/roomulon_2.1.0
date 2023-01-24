import { currentRoomBreakdown } from "../helper_functions/current_room_breakdown.js";
import { ratMaker } from "./level_1/ratMaker.js";
import { spiderMaker } from "./level_1/spiderMaker.js";
import { blueSlime } from "./level_1/blueSlime.js";

let brCounter= 0;  //a counting variable for how many rats have been created
let lsCounter= 0;  //large spider counter
let bsCounter= 0;  //blue slime counter
let baddieCounter= 0;  //overall baddie counter

async function baddieDeployer()  {
    //$("#five").html(" ");
    let binaryChoice= Math.floor(Math.random()*2);
    if (binaryChoice===0)  {  //if a baddie will not enter the game
        console.log("no baddies this time!");
    } else if (binaryChoice===1)  {  //if a baddie will enter the game
        let sec= Math.floor((Math.random()*30)+1);  //this will produce a number between and including 1-30, time before baddie enters
        console.log("and now, your grand champion will enter in "+sec+ " seconds!");
        let krNum= await currentRoomBreakdown();
        let anotherBinary= Math.floor(Math.random()*3);
        if (anotherBinary===0)  {
            ratMaker(sec, krNum);
            brCounter++;
            baddieCounter++;
        } else if (anotherBinary===1)  {
            spiderMaker(sec, krNum);
            lsCounter++;
            baddieCounter++;
        } else if (anotherBinary===2)  {
            blueSlime(sec, krNum);
            bsCounter++;
            baddieCounter++;
        }
    }
}

export {baddieDeployer};