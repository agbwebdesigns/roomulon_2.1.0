import { currentRoomBreakdown } from "../helper_functions/current_room_breakdown.js";
import { textWindowScroller } from "../helper_functions/text_window_scroller.js";
// import { roomBuilder } from "../map/roomBuilder.js";
import { baddieDeployer } from "../baddies/baddieDeployer.js";

async function north(a,b,y)  {
    // let {keyRoom}= await import('../map/roomBuilder.js');
    let {roomBuilder}= await import('../game_controller.js');
    let {joinedArray}= await import('../../model/Room.js');
    let {lastDirection}= await import('../game_controller.js');
    let {currentRoomBreakdown}= await import('../helper_functions/current_room_breakdown.js');
    let number = await currentRoomBreakdown();  //this saves what the current keyRoom number is before clicking west
    console.log('number: '+number);
    if (roomBuilder.keyRoom[number].baddies.length===0)  {  //if there are no baddies in the currentRoom
        if (joinedArray.indexOf("North") !== -1)  {  //is North one of the optional directions?
            lastDirection.pop();
            lastDirection.push("North");
            //console.log(joinedArray.indexOf("North"));
            $("#textwindow").append("<p>You travel North.</p>");
            textWindowScroller();
            // $("#twopointfive").html("");  //this clears the twopointfive id so that roomBuilder() can insert new information
            if (roomBuilder.keyRoom[number].roomConnectionsArray[0].length===1)  {  //if there is no room created in the direction of north yet
                $("#x"+a+"y"+b).removeClass("currentroom");
                $("#x"+a+"y"+b).addClass("previousroom");
                y++;
                b++;
                roomBuilder.roomBuilder(a,b,y);
                $("#x"+a+"y"+b).addClass("currentroom");
                return 'success1';  //new room creation, increment y and b
            } else if (roomBuilder.keyRoom[number].roomConnectionsArray[0].length>1)  {  //if there is a room created in this direction already
                let numberWest= roomBuilder.keyRoom[number].roomConnectionsArray[0][1];
                let crcab= roomIndexBreakdown(numberWest);
                //$("#one").html("You see " + keyRoom[crcab].directionArray.length + " doors.");
                $("#textwindow").append("<p>You see " + roomBuilder.keyRoom[crcab].directionArray.length + " doors.</p>");
                textWindowScroller();
                roomBuilder.keyRoom[crcab].thePath();  //displays them on the screen
                roomBuilder.currentRoom.pop();
                roomBuilder.currentRoom.push('keyRoom[' + crcab + ']');  //updates what the current room is
                console.log("this is the current room " + roomBuilder.currentRoom[0]);
                $("#x"+a+"y"+b).removeClass("currentroom");
                b++;  //this increments the x axis
                $("#x"+a+"y"+b).addClass("currentroom");
                //console.log(keyRoom[crcab].mapPosition);
                if (roomBuilder.keyRoom[crcab].baddies.length===0)  {
                    baddieDeployer();
                } else if (roomBuilder.keyRoom[crcab].baddies.length>0)  {  //checks if there are baddies in the room
                    //the keyrooms baddie array needs to be run through and each baddieMover function needs to be stopped
                    //the baddie array length needs to be saved, this needs to have 1 subtracted from the number, then be decremented until it reaches less than 0, this will run through the array
                    //on each run through 
                    let krbl= roomBuilder.keyRoom[crcab].baddies.length-1;  //keyRoom baddie array length
                    $("#textwindow").append("<p>You see "+krbl+1+" baddies in the room!</p>");
                    textWindowScroller();
                    function krbStopper(krbl)  {
                        if (krbl>=0)  {
                            // keyRoom[crcab].baddies[krbl].baddieStopper();  //currently only works on one baddie, not the whole array if there are more than 1
                            //baddie combat should be started here
                            if (roomBuilder.keyRoom[crcab].baddies[krbl].playerTarget===0)  {
                                roomBuilder.keyRoom[crcab].baddies[krbl].playerTarget++;
                                roomBuilder.keyRoom[crcab].baddies[krbl].battleTurner(2, crcab, roomBuilder.keyRoom[crcab].baddies[krbl].knowThyCounter);
                                $("#textwindow").append("<p>"+roomBuilder.keyRoom[crcab].baddies[krbl].playerName+" takes initiative, you brace for attack.</p>");
                                textWindowScroller();
                            }
                            krbl--;
                            return krbStopper(krbl);
                        }
                    }
                    krbStopper(krbl);
                    $("#textwindow").append("<p>You see "+roomBuilder.keyRoom[crcab].baddies[0].playerName+"</p>");
                    textWindowScroller();
                    //$("#five").html("You see "+keyRoom[crcab].baddies[0].playerName);
                }
                return 'success2';  //existing room, increment b
            }
        } else {
            $("#textwindow").append("<p>You cannot travel North.</p>");
            textWindowScroller();
        }
    } else if (roomBuilder.keyRoom[number].baddies.length>0)  {
        $("#textwindow").append('<p>You are unable to leave.  There are baddies in the room!</p>');
        textWindowScroller();
    }
};

export {north};