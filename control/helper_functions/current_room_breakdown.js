// import {currentRoom} from '../map/roomBuilder.js';

async function currentRoomBreakdown()  {  //this function pulls the y number out of the currentRoom array based on the current room and turns it into an integer so that properties of the current room can be accessed
    let {currentRoom}= await import('../game_controller.js');
    console.log('crb current room: '+currentRoom);
    let currentRoomSplit= currentRoom[0].split("");
    let currentRoomRange= currentRoomSplit[8];  //saving the 8th place
    let numberWestNine= currentRoomSplit[9];  //saving the 9th place
    let numberTenPlace= currentRoomSplit[10];
    let currentRoomParse= parseInt(currentRoomRange);
    let nwn= parseInt(numberWestNine);
    let ntp= parseInt(numberTenPlace);
    if (isNaN(nwn))  {  //this checks to see if the keyRoom number is not greater than 10
        console.log("less than 10! "+currentRoomParse);
        return currentRoomParse;
    } else {  //if the 9th place is an integer
        if (isNaN(ntp))  {  //this checks if the current room number is not greater than 100
            console.log("the ninth number"+nwn);
            let numberNew= (currentRoomParse*10)+nwn;
            console.log(numberNew);
            return numberNew;
        } else {  //if the 10th place is an integer, greater than 100
            let hundredSpace= (currentRoomParse*100)+(nwn*10)+ntp;
            console.log("Over one hundred rooms! ----------------"+hundredSpace);
            return hundredSpace;
        }
    }
}

export {currentRoomBreakdown};