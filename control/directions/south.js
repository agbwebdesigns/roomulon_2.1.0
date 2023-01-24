import { currentRoomBreakdown } from "../helper_functions/current_room_breakdown.js";
import { textWindowScroller } from "../helper_functions/text_window_scroller.js";
// import { roomBuilder } from "../map/roomBuilder.js";
import { baddieDeployer } from "../baddies/baddieDeployer.js";

async function south(a,b,y)  {
    // let {keyRoom}= await import('../map/roomBuilder.js');
    let {roomBuilder}= await import('../game_controller.js');
    let {joinedArray}= await import('../../model/Room.js');
    let {lastDirection}= await import('../game_controller.js');
    let number = await currentRoomBreakdown();  //this saves what the current keyRoom number is before clicking west
    console.log('number: '+number)
    if (roomBuilder.keyRoom[number].baddies.length===0)  {
        if (joinedArray.indexOf("South") !== -1)  {  //is South one of the optional directions?
            lastDirection.pop();
            lastDirection.push("South");
            //console.log(joinedArray.indexOf("South"));
            $("#textwindow").append("<p>You travel South.</p>");
            textWindowScroller();
            $("#twopointfive").html("");
            if (roomBuilder.keyRoom[number].roomConnectionsArray[1].length===1)  {  //if there is no room created in the direction of south yet
                $("#x"+a+"y"+b).removeClass("currentroom");
                $("#x"+a+"y"+b).addClass("previousroom");
                y++;
                b--;
                roomBuilder.roomBuilder(a,b,y);
                $("#x"+a+"y"+b).addClass("currentroom");
                return 'success1';  //new room creation, increment y and decrement b
            } else if (roomBuilder.keyRoom[number].roomConnectionsArray[1].length>1)  {  //if there is a room created in this direction already
                let numberWest= roomBuilder.keyRoom[number].roomConnectionsArray[1][1];
                let crcab= roomIndexBreakdown(numberWest);
                $("#textwindow").append("<p>You see " + roomBuilder.keyRoom[crcab].directionArray.length + " doors.</p>");
                textWindowScroller();
                roomBuilder.keyRoom[crcab].thePath();  //displays them on the screen
                roomBuilder.currentRoom.pop();
                roomBuilder.currentRoom.push('keyRoom[' + crcab + ']');  //updates what the current room is
                console.log("this is the current room " + roomBuilder.currentRoom[0]);
                $("#x"+a+"y"+b).removeClass("currentroom");
                b--;  //this decrements the x axis
                $("#x"+a+"y"+b).addClass("currentroom");
                //console.log(keyRoom[crcab].mapPosition);
                if (roomBuilder.keyRoom[crcab].baddies.length===0)  {
                    baddieDeployer();
                } else if (roomBuilder.keyRoom[crcab].baddies.length>0)  {
                    let krbl= roomBuilder.keyRoom[crcab].baddies.length-1;  //keyRoom baddie array length
                    $("#textwindow").append("<p>You see "+krbl+1+" baddies in the room!</p>");
                    textWindowScroller();
                    function krbStopper(krbl)  {
                        if (krbl>=0)  {
                            // keyRoom[crcab].baddies[krbl].baddieStopper();  //only stopping one baddie
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
                }
                return 'success2';  //existing room, decrement b

            }
        } else {
            $("#textwindow").append("<p>You cannot travel South.</p>");
            textWindowScroller();
        }
    } else if (roomBuilder.keyRoom[number].baddies.length>0)  {
        $("#textwindow").append('<p>You are unable to leave.  There are baddies in the room!</p>');
        textWindowScroller();
    }
};

export {south};