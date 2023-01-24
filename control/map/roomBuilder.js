import {Room} from '../../model/Room.js';
import {textWindowScroller} from '../helper_functions/text_window_scroller.js';
import { baddieDeployer } from '../baddies/baddieDeployer.js';

/******************************************************************************************/
	//an array and counter for new rooms
	// let keyRoom= [];  //this is an array of all of the new room Objects that are created
/******************************************************************************************/
    // let currentRoom= [];
    // let roomPosition= [];  //an array for all of the created rooms
/******************************************************************************************/

async function roomBuilder(a,b,y)  {  //this function creates new rooms
    //$("#six").html(" ");
    // let {a,b,y}= await import('./game_controller.js');
    let keyRoom= [new Room()];
    keyRoom[0].randomNumber.push(keyRoom[0].randomDoors());  //this decides how many doors are in the new room
    keyRoom[0].oneReader();  //displays how many doors on the screen
    //console.log("how many doors in this room " + keyRoom[0].randomNumber);
    // let {a,b}= await import('./game_controller.js');
    keyRoom[0].mapPosition.push(a);
    keyRoom[0].mapPosition.push(b);
    keyRoom[0].mapIndicator();
    console.log("a new room has been created: "+JSON.stringify(keyRoom[0]));
    //console.log(keyRoom[0].mapPosition);
    let directionArray= await keyRoom[0].whichDirections();  //chooses the directions
    console.log('whichDirections complete: '+directionArray);
    // await keyRoom[0].thePath(directionArray);  //displays them on the screen
    console.log('thePath complete');
    return keyRoom[0];
}
    
export {roomBuilder};