import { RoomContainer } from '../model/RoomContainer.js';
import { textWindowScroller } from './helper_functions/text_window_scroller.js';

async function containerBuilder(roomPosition,y,keyRoom)  {
    // let {keyRoom}= await import('../game_controller.js');
    console.log("this is the length of the room position array --->" + roomPosition.length);
    if (roomPosition.length===1)  {  //creates the starting room chest
        let theRoomContainer= [new RoomContainer()];  //this creates a chest in the room
        theRoomContainer[0].containerFiller();  //this creates an object inside of the chest in the room
        // keyRoom[y].roomContainer.push(theRoomContainer);  //this puts the newly created chest in the roomContainer array
        // $("#textwindow").append("<p>You see "+ keyRoom[y].roomContainer[0].rcName +".</p>");
        // textWindowScroller();
        return theRoomContainer;
    } else if (roomPosition.length>1)  {//maybe creates a chest in all other rooms
        let randomChest= Math.floor((Math.random()*20)+1);  //5% chance a chest will be created
        console.log('this is the random chest number: '+randomChest);
        baddieDeployer();
        if (randomChest===1)  {
            let theRoomContainer= [new RoomContainer()];  //this creates a chest in the room
            theRoomContainer[0].containerFiller();  //this creates an object inside of the chest in the room
            // keyRoom[y].roomContainer.push(theRoomContainer);  //this puts the newly created chest in the roomContainer array
            $("#textwindow").append("<p>You see "+ keyRoom[y].roomContainer[0].rcName +".</p>");
            textWindowScroller();
            return theRoomContainer;
        } else if (randomChest!==1)  {
            return false;
        }
    }
}

export {containerBuilder};