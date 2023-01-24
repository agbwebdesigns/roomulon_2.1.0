import {ItemCreator} from './ItemCreator.js';
import {currentRoomBreakdown} from '../control/helper_functions/current_room_breakdown.js';
// import {roomPosition} from '../control/game_controller.js';

function RoomContainer()  {  //this object creates a container in the room where items can be found
    this.rcName= "an old wooden box";
    this.roomContainer= [];  //items are created and stored in this array, it represents the inside of the container
    this.rcStatus= 0;  //this tells if the container is 1 for open or 0 for closed
}

RoomContainer.prototype=  {
    containerFiller: async function()  {  //this function fills the container with weapons and healthpacks for the player to use
        let {roomPosition}= await import('../control/game_controller.js');
        let krNum= currentRoomBreakdown();
        let anotherItem= new ItemCreator();
        if (roomPosition.length===1)  {
            anotherItem.knife();
            this.roomContainer.push(anotherItem);
        } else if (roomPosition.length>1)  {
            anotherItem.medpack();
            this.roomContainer.push(anotherItem);
        }
    }
}

export {RoomContainer};