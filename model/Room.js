import {textWindowScroller} from '../control/helper_functions/text_window_scroller.js';
import { currentRoomBreakdown } from '../control/helper_functions/current_room_breakdown.js';
// import { lastDirection } from '../control/game_controller.js';

function Room()  {
    this.whichWayArray= ["North", "South", "East", "West"];  //the array from which directions are taken
    this.directionArray= [];  //this array is created when a new room is created, it is filled with the random directions that a player may travel in, transfer this to the model saved in mongodb
    this.randomNumber= randomDoors();  //this decides how many doors are in the new room, gotten from running randomDoors()
    this.whichChoice= [];  //this gives a random number to be able to choose directions from the remaining whichWayArray, gotten from running randomArray()
    this.joinedArray= [];  //an array that thePath() uses to join directionArray into a string for scanning

}

Room.prototype={

    oneReader: function()  {
        //$("#one").html("You see " + this.randomNumber + " doors.");
        $("#textwindow").append("<p>You see " + this.randomNumber + " doors.</p>");
        textWindowScroller();
    },

    randomDoors: function()  {
        return Math.floor((Math.random()*4)+1);  //this will produce a number between and including 1-4
    },

    whichDirections: async function()  {  //this function chooses a number of directions equal to the number created by randomDoors(), the directions are chosen randomly from whichWayArray
        let that= this;
        let w= 0;
        //console.log("this is the room position array length "+j-1);
        async function innerWhich(that)  {
            let {lastDirection}=await import('../control/game_controller.js');
            console.log('last direction: '+lastDirection);
            function randomArray()  {
                return Math.floor(Math.random()*that.whichWayArray.length);  //this will return a number no larger than the length of whichWayArray which is variable
            }
            console.log('last direction length: '+lastDirection.length);
            if (lastDirection.length>0)  {  //a check for if you are coming from a created room, so that direction is one you can travel back to
                //$(".roomtext h1").html("Your Quest continues... ");
                if (w===0)  {  //after one check w will be increased by one so the check cannot be done again
                    console.log('innerWhich, doing the thing')
                    let number= await currentRoomBreakdown();
                    if (lastDirection[0]==="North")  {  //this makes sure that the direction you are coming from is a direction you can go back to
                        that.directionArray.push(that.whichWayArray.splice(1, 1));
                        that.roomConnectionsArray[1].push(currentRoom[0]);  //this pushes the previous room into the south index for the roomConnectionsArray of the new room
                        keyRoom[number].roomConnectionsArray[0].push("keyRoom["+ y +"]");
                        console.log("there is a room to the south, it is at position "+a+","+(b-1)+"and is "+ that.roomConnectionsArray[1][1]);
                        //console.log("last direction array -->" + that.directionArray); //what has been put into directionArray
                        that.randomNumber -=1;
                        //console.log("random number after an insert from north" + that.randomNumber);
                        w++;
                        dccn();//these are checks to see if there are rooms in the different directions
                        dcce();
                        dccw();
                    } else if (lastDirection[0]==="South")  {
                        that.directionArray.push(that.whichWayArray.splice(0, 1));
                        that.roomConnectionsArray[0].push(currentRoom[0]);
                        keyRoom[number].roomConnectionsArray[1].push("keyRoom["+ y +"]");
                        console.log("there is a room to the north, it is at position "+a+","+(b+1)+"and is "+ that.roomConnectionsArray[0][1]);
                        //console.log("last direction array -->" + that.directionArray); //what has been put into directionArray
                        that.randomNumber -=1;
                        //console.log("random number after an insert from south" + that.randomNumber);
                        w++;
                        dccs();
                        dcce();
                        dccw();
                    } else if (lastDirection[0]==="East")  {
                        that.directionArray.push(that.whichWayArray.splice(3, 1));
                        that.roomConnectionsArray[3].push(currentRoom[0]);
                        keyRoom[number].roomConnectionsArray[2].push("keyRoom["+ y +"]");
                        console.log("there is a room to the west, it is at position "+(a-1)+","+b+"and is "+ that.roomConnectionsArray[3][1]);
                        //console.log("last direction array -->" + that.directionArray); //what has been put into directionArray
                        that.randomNumber -=1;
                        //console.log("random number after an insert from east" + that.randomNumber);
                        w++;
                        dccn();
                        dccs();
                        dcce();
                    } else if (lastDirection[0]==="West")  {
                        that.directionArray.push(that.whichWayArray.splice(2, 1));
                        that.roomConnectionsArray[2].push(currentRoom[0]);
                        keyRoom[number].roomConnectionsArray[3].push("keyRoom["+ y +"]");
                        console.log("there is a room to the east, it is at position "+(a+1)+","+b+"and is "+ that.roomConnectionsArray[2][1]);
                        //console.log("last direction array -->" + that.directionArray); //what has been put into directionArray
                        that.randomNumber -=1;
                        //console.log("random number after an insert from west" + that.randomNumber);
                        w++;
                        dccn();
                        dccs();
                        dccw();
                    }
                }
                function dccn()  {  //check to see if there is a room in (a+1,b)
                    let j= roomPosition.length;  //a number greater than 0 indicates that rooms have been created.
                    //console.log(j);
                    //console.log("this is the xy position for the room to the north("+a+","+(b+1)+")");
                    function dccnRunner()  {
                        if (b<9)  {//this is the edge of the map
                            if (j>0)  {  //if rooms have been created
                                //console.log("north, this is a + 1, " + (a+1) + ", and this is b," + b);
                                //console.log("this is j "+j);
                                //console.log("this is the roomPosition array "+ roomPosition[j-1]);
                                if (roomPosition[j-1][0]===a && roomPosition[j-1][1]===(b+1))  {  //if the room in the north position exists, check to see if it has a connection to the south, if it does not then don't create one in the new room
                                    console.log("there is a room to the north");
                                    let rp= roomPosition[j-1][2];
                                    //console.log("this is rp "+rp);
                                    let keyNew= roomIndexBreakdown(rp);
                                    let rpDirArr= keyRoom[keyNew].directionArray.join();
                                    if (rpDirArr.indexOf("South")!==-1)  {//if the room in the north position does have a connection to the south room
                                        //console.log("This is the index of a south connection in the room to the north" + rpDirArr.indexOf("South"));
                                        that.directionArray.push(that.whichWayArray.splice(0, 1));
                                        that.randomNumber -=1;
                                        keyRoom[keyNew].roomConnectionsArray[1].push('keyRoom['+ y +']');
                                        keyRoom[y].roomConnectionsArray[0].push('keyRoom['+ keyNew +']');
                                    } else if (rpDirArr.indexOf("South")===-1)  {  //if the room in the north position doesn't have a connection to the south room
                                        console.log("false, there is no connection to the room to the north");
                                        that.whichWayArray.splice(0, 1)  //remove north as an option for direction in the current new room
                                        if (that.randomNumber>that.whichWayArray.length)  {  //if the number of doors in the new room exceeds the number of available directions
                                            that.randomNumber -=1;  //remove a doorway
                                            $("#textwindow").append("<p>You see " + that.randomNumber + " doors.</p>");
                                            textWindowScroller();
                                        }
                                    }
                                } else {
                                    j--;
                                    return dccnRunner();
                                }
                            }
                            //console.log("there is no room to the north");
                        } else if (b===9)  {
                            that.whichWayArray.splice(0, 1)  //remove north as an option for direction in the current new room
                        }
                    }
                    dccnRunner();
                }
                function dccs()  {
                    let j= roomPosition.length;  //a number greater than 0 indicates that rooms have been created.
                    //console.log(j);
                    //console.log("this is the xy position for the room to the south("+a+","+(b-1)+")");
                    function dccsRunner()  {
                        if (b>-9)  {
                            if (j>0)  {
                                //console.log("south, this is a - 1, "+ (a-1) + ", and this is b," + b);
                                //console.log("this is j "+j);
                                //console.log("this is the roomPosition array "+ roomPosition[j-1]);
                                if (roomPosition[j-1][0]===a && roomPosition[j-1][1]===(b-1))  {  //if the room in the south position exists, check to see if it has a connection to the south, if it does not then don't create one in the new room
                                    console.log("there is a room to the south");
                                    let rp= roomPosition[j-1][2];
                                    //console.log("this is rp "+rp);
                                    let keyNew= roomIndexBreakdown(rp);
                                    let rpDirArr= keyRoom[keyNew].directionArray.join();
                                    if (rpDirArr.indexOf("North")!==-1)  {
                                        //console.log("This is the index of a north connection in the room to the south" + rpDirArr.indexOf("North"));
                                        let rpda= that.whichWayArray.indexOf("South");
                                        if (rpda===1) {
                                            that.directionArray.push(that.whichWayArray.splice(1, 1));
                                            that.randomNumber -=1;
                                        } else if (rpda===0)  {
                                            that.directionArray.push(that.whichWayArray.splice(0, 1));
                                            that.randomNumber -=1;
                                        }
                                        keyRoom[keyNew].roomConnectionsArray[0].push('keyRoom['+ y +']');
                                        keyRoom[y].roomConnectionsArray[1].push('keyRoom['+ keyNew +']');
                                    } else if (rpDirArr.indexOf("North")===-1)  {
                                        console.log("false, no connection to the room to the south");
                                        let rpda= that.whichWayArray.indexOf("South");
                                        console.log("this is the index of south"+rpda);
                                        if (rpda===1)  {
                                            that.whichWayArray.splice(1, 1);
                                        } else if (rpda===0)  {
                                            that.whichWayArray.splice(0, 1);
                                        }
                                        if (that.randomNumber>that.whichWayArray.length)  {  //if the number of doors in the new room exceeds the number of available directions
                                            that.randomNumber -=1;  //remove a doorway
                                            $("#textwindow").append("<p>You see " + that.randomNumber + " doors.</p>");
                                            textWindowScroller();
                                        }
                                    }
                                } else {
                                    j--;
                                    return dccsRunner();
                                }
                            }
                            //console.log("there is no room to the south");
                        } else if (b===-9)  {
                            let rpda= that.whichWayArray.indexOf("South");
                            console.log(rpda);
                            if (rpda===1)  {
                                that.whichWayArray.splice(1, 1);
                            } else if (rpda===0)  {
                                that.whichWayArray.splice(0, 1);
                            }
                        }
                    }
                    dccsRunner();
                }
                function dcce()  {
                    let j= roomPosition.length;  //a number greater than 0 indicates that rooms have been created.
                    //console.log(j);
                    //console.log("this is the xy position for the room to the east ("+(a+1)+","+b+")");
                    function dcceRunner()  {
                        if (a<12)  {
                            if (j>0)  {
                                //console.log("east, this is a,"+ a + ", and this is b + 1," + (b + 1));
                                //console.log("this is j "+j);
                                //console.log("this is the roomPosition array "+ roomPosition[j-1]);
                                if (roomPosition[j-1][0]===(a+1) && roomPosition[j-1][1]===b)  {  //if the room in the east position exists, check to see if it has a connection to the south, if it does not then don't create one in the new room
                                    console.log("there is a room to the east");
                                    let rp= roomPosition[j-1][2];
                                    //console.log("this is rp "+rp);
                                    let keyNew= roomIndexBreakdown(rp);
                                    let rpDirArr= keyRoom[keyNew].directionArray.join();  //this joins directionArray in the east room 
                                    if (rpDirArr.indexOf("West")!==-1)  {  //this checks directionArray in the east room to see if it has an existing connection to the room to it's west
                                        //console.log("This is the index of a west connection in the room to the east" + rpDirArr.indexOf("West"));
                                        let rpda= that.whichWayArray.indexOf("East");  //this saves that index
                                        if (rpda===2)  {  //and runs this check to be sure we are removing west from the array
                                            that.directionArray.push(that.whichWayArray.splice(2, 1));
                                            that.randomNumber -=1;
                                        } else if (rpda===1)  {
                                            that.directionArray.push(that.whichWayArray.splice(1, 1));
                                            that.randomNumber -=1;
                                        } else if (rpda===0)  {
                                            that.directionArray.push(that.whichWayArray.splice(0, 1));
                                            that.randomNumber -=1;
                                        }
                                        keyRoom[keyNew].roomConnectionsArray[3].push('keyRoom['+ y +']');
                                        keyRoom[y].roomConnectionsArray[2].push('keyRoom['+ keyNew +']');
                                    } else if (rpDirArr.indexOf("West")===-1)  {  //if the room to the east doesn't have a connection to the west
                                        console.log("false, no connection to the room to the east");
                                        let rpda= that.whichWayArray.indexOf("East");
                                        console.log(rpda);
                                        if (rpda===2)  {  //check to see where east is in whichWayArray and remove it so it cannot be chosen
                                            that.whichWayArray.splice(2, 1);
                                        } else if (rpda===1)  {
                                            that.whichWayArray.splice(1, 1);
                                        } else if (rpda===0)  {
                                            that.whichWayArray.splice(0, 1);
                                        }
                                        if (that.randomNumber>that.whichWayArray.length)  {  //if the number of possible doors exceeds the number of possible directions
                                            that.randomNumber -=1;  //remove one from the number of possible directions
                                            $("#textwindow").append("<p>You see " + that.randomNumber + " doors.</p>");
                                            textWindowScroller();
                                        }
                                    }
                                } else {
                                    j--;
                                    return dcceRunner();
                                }
                            }
                            //console.log("there is no room to the east");
                        } else if (a===12)  {
                            let rpda= that.whichWayArray.indexOf("East");
                            console.log(rpda);
                            if (rpda===2)  {  //check to see where east is in whichWayArray and remove it so it cannot be chosen
                                that.whichWayArray.splice(2, 1);
                            } else if (rpda===1)  {
                                that.whichWayArray.splice(1, 1);
                            } else if (rpda===0)  {
                                that.whichWayArray.splice(0, 1);
                            }
                        }
                    }
                    dcceRunner();
                }
                function dccw()  {
                    let j= roomPosition.length;  //a number greater than 0 indicates that rooms have been created.
                    //console.log(j);
                    //console.log("this is the xy position for the room to the west ("+(a-1)+","+b+")");
                    function dccwRunner()  {
                        if (a>-12)  {
                            if (j>0)  {
                                //console.log("west, this is a,"+ a + ", and this is b - 1," + (b - 1));
                                //console.log("this is j "+j);
                                //console.log("this is the roomPosition array "+ roomPosition[j-1]);
                                if (roomPosition[j-1][0]===(a-1) && roomPosition[j-1][1]===b)  {  //if the room in the west position exists, check to see if it has a connection to the south, if it does not then don't create one in the new room
                                    console.log("there is a room to the west");
                                    let rp= roomPosition[j-1][2];
                                    //console.log("this is rp "+rp);
                                    let keyNew= roomIndexBreakdown(rp);
                                    let rpDirArr= keyRoom[keyNew].directionArray.join();
                                    if (rpDirArr.indexOf("East")!==-1)  {  //does the room to the West have a connection to the east room?
                                        //console.log("This is the index of an east connection in the room to the west" + rpDirArr.indexOf("East"));
                                        let rpda= that.whichWayArray.indexOf("West");
                                        if (rpda===3) {
                                            that.directionArray.push(that.whichWayArray.splice(3, 1));
                                        } else if (rpda===2)  {
                                            that.directionArray.push(that.whichWayArray.splice(2, 1));
                                        } else if (rpda===1)  {
                                            that.directionArray.push(that.whichWayArray.splice(1, 1));
                                        } else if (rpda===0)  {
                                            that.directionArray.push(that.whichWayArray.splice(0, 1));
                                        }
                                        that.randomNumber -=1;
                                        keyRoom[keyNew].roomConnectionsArray[2].push('keyRoom['+ y +']');
                                        keyRoom[y].roomConnectionsArray[3].push('keyRoom['+ keyNew +']');
                                    } else if (rpDirArr.indexOf("East")===-1)  {  //if the existing room to the west doesn't have a connection to the east
                                        console.log("false, no connection to the room to the west");
                                        let rpda= that.whichWayArray.indexOf("West");
                                        console.log(rpda);
                                        if (rpda===3)  {  //and runs this check to be sure we are removing west from the array
                                            that.whichWayArray.splice(3, 1);
                                        } else if (rpda===2)  {
                                            that.whichWayArray.splice(2, 1);
                                        } else if (rpda===1)  {
                                            that.whichWayArray.splice(1, 1);
                                        } else if (rpda===0)  {
                                            that.whichWayArray.splice(0, 1);
                                        }
                                        if (that.randomNumber>that.whichWayArray.length)  {  //if the number of doors in the new room exceeds the number of available directions
                                            that.randomNumber -=1;  //remove a doorway
                                            $("#textwindow").append("<p>You see " + that.randomNumber + " doors.</p>");
                                            textWindowScroller();
                                        }
                                    }
                                } else {
                                    j--;
                                    return dccwRunner();
                                }
                            }
                            //console.log("there is no room to the west");
                        } else if (a===-12)  {
                            let rpda= that.whichWayArray.indexOf("West");
                            console.log(rpda);
                            if (rpda===3)  {  //and runs this check to be sure we are removing west from the array
                                that.whichWayArray.splice(3, 1);
                            } else if (rpda===2)  {  //check to see where east is in whichWayArray and remove it so it cannot be chosen
                                that.whichWayArray.splice(2, 1);
                            } else if (rpda===1)  {
                                that.whichWayArray.splice(1, 1);
                            } else if (rpda===0)  {
                                that.whichWayArray.splice(0, 1);
                            }
                        }
                    }
                    dccwRunner();
                }
            } else if (lastDirection===undefined)  {
                //add the container here, this should be the first room created so the container will only be created once
            }
            if (that.randomNumber>0)  {
                that.whichChoice.pop();
                that.whichChoice.push(randomArray());  //this gives a random number to be able to choose directions from the remaining whichWayArray
                let randomDirection= that.whichWayArray.splice(that.whichChoice, 1);
                console.log(randomDirection);
                that.directionArray.push(randomDirection);  //push to directionArray a random choice from whichWayArray
                console.log("which way array -->" + that.whichWayArray);  //what is left in whichWayArray
                console.log("direction array -->" + that.directionArray); //what has been put into directionArray
                that.randomNumber -=1;
                //console.log("random number after a random insert" + that.randomNumber);
                return innerWhich(that);
            } else {
                that.thePath();
                return;
            }
        }
        innerWhich(that);
    },

    mapIndicator: function()  {
        let directionCounter= 0;
        let that = this;
        function mapDirectionRunner(that)  {
            let {a,b}= import('../control/game_controller.js');
            if (that.directionArray.length===1)  {
                console.log('length of the direction array: '+that.directionArray.length);
                if (that.directionArray[0].indexOf("North")!==-1)  {
                    console.log('the only direction is north!');
                    $("#x"+a+"y"+b).addClass("ndirections");
                } else if (that.directionArray[0].indexOf("South")!==-1)  {
                    console.log('the only direction is south!');
                    $("#x"+a+"y"+b).addClass("sdirections");
                } else if (that.directionArray[0].indexOf("East")!==-1)  {
                    console.log('the only direction is east!');
                    $("#x"+a+"y"+b).addClass("edirections");
                } else if (that.directionArray[0].indexOf("West")!==-1)  {
                    console.log('the only direction is west!');
                    $("#x"+a+"y"+b).addClass("wdirections");
                }
            } else if (that.directionArray.length===2)  {
                if (that.directionArray[0].indexOf("North")!==-1) {
                    if (that.directionArray[1].indexOf("South")!==-1)  {
                        $("#x"+a+"y"+b).addClass("nsdirections");
                    } else if (that.directionArray[1].indexOf("East")!==-1)  {
                        $("#x"+a+"y"+b).addClass("nedirections");
                    } else if (that.directionArray[1].indexOf("West")!==-1)  {
                        $("#x"+a+"y"+b).addClass("nwdirections");
                    }
                } else if (that.directionArray[0].indexOf("South")!==-1)  {
                    if (that.directionArray[1].indexOf("North")!==-1)  {
                        $("#x"+a+"y"+b).addClass("nsdirections");
                    } else if (that.directionArray[1].indexOf("East")!==-1)  {
                        $("#x"+a+"y"+b).addClass("sedirections");
                    } else if (that.directionArray[1].indexOf("West")!==-1)  {
                        $("#x"+a+"y"+b).addClass("swdirections");
                    }
                } else if (that.directionArray[0].indexOf("East")!==-1)  {
                    if (that.directionArray[1].indexOf("North")!==-1)  {
                        $("#x"+a+"y"+b).addClass("nedirections");
                    } else if (that.directionArray[1].indexOf("South")!==-1)  {
                        $("#x"+a+"y"+b).addClass("sedirections");
                    } else if (that.directionArray[1].indexOf("West")!==-1)  {
                        $("#x"+a+"y"+b).addClass("ewdirections");
                    }
                } else if (that.directionArray[0].indexOf("West")!==-1)  {
                    if (that.directionArray[1].indexOf("North")!==-1)  {
                        $("#x"+a+"y"+b).addClass("nwdirections");
                    } else if (that.directionArray[1].indexOf("South")!==-1)  {
                        $("#x"+a+"y"+b).addClass("swdirections");
                    } else if (that.directionArray[1].indexOf("East")!==-1)  {
                        $("#x"+a+"y"+b).addClass("ewdirections");
                    }
                }
            } else if (that.directionArray.length===3)  {
                if (that.directionArray[0].indexOf("North")!==-1)  {
                    if (that.directionArray[1].indexOf("South")!==-1)  {
                        if (that.directionArray[2].indexOf("East")!==-1)  {
                            $("#x"+a+"y"+b).addClass("nsedirections");
                        } else if (that.directionArray[2].indexOf("West")!==-1)  {
                            $("#x"+a+"y"+b).addClass("nswdirections");
                        }
                    } else if (that.directionArray[1].indexOf("East")!==-1)  {
                        if (that.directionArray[2].indexOf("South")!==-1)  {
                            $("#x"+a+"y"+b).addClass("nsedirections");
                        } else if (that.directionArray[2].indexOf("West")!==-1)  {
                            $("#x"+a+"y"+b).addClass("newdirections");
                        }
                    } else if (that.directionArray[1].indexOf("West")!==-1)  {
                        if (that.directionArray[2].indexOf("South")!==-1)  {
                            $("#x"+a+"y"+b).addClass("nswdirections");
                        } else if (that.directionArray[2].indexOf("East")!==-1)  {
                            $("#x"+a+"y"+b).addClass("newdirections");
                        }
                    }
                } else if (that.directionArray[0].indexOf("South")!==-1)  {
                    if (that.directionArray[1].indexOf("North")!==-1)  {
                        if (that.directionArray[2].indexOf("East")!==-1)  {
                            $("#x"+a+"y"+b).addClass("nsedirections");
                        } else if (that.directionArray[2].indexOf("West")!==-1)  {
                            $("#x"+a+"y"+b).addClass("nswdirections");
                        }
                    } else if (that.directionArray[1].indexOf("East")!==-1)  {
                        if (that.directionArray[2].indexOf("North")!==-1)  {
                            $("#x"+a+"y"+b).addClass("nsedirections");
                        } else if (that.directionArray[2].indexOf("West")!==-1)  {
                            $("#x"+a+"y"+b).addClass("sewdirections");
                        }
                    } else if (that.directionArray[1].indexOf("West")!==-1)  {
                        if (that.directionArray[2].indexOf("North")!==-1)  {
                            $("#x"+a+"y"+b).addClass("nswdirections");
                        } else if (that.directionArray[2].indexOf("East")!==-1)  {
                            $("#x"+a+"y"+b).addClass("sewdirections");
                        }
                    }
                } else if (that.directionArray[0].indexOf("East")!==-1)  {
                    if (that.directionArray[1].indexOf("South")!==-1)  {
                        if (that.directionArray[2].indexOf("North")!==-1)  {
                            $("#x"+a+"y"+b).addClass("nsedirections");
                        } else if (that.directionArray[2].indexOf("West")!==-1)  {
                            $("#x"+a+"y"+b).addClass("sewdirections");
                        }
                    } else if (that.directionArray[1].indexOf("North")!==-1)  {
                        if (that.directionArray[2].indexOf("South")!==-1)  {
                            $("#x"+a+"y"+b).addClass("nsedirections");
                        } else if (that.directionArray[2].indexOf("West")!==-1)  {
                            $("#x"+a+"y"+b).addClass("newdirections");
                        }
                    } else if (that.directionArray[1].indexOf("West")!==-1)  {
                        if (that.directionArray[2].indexOf("South")!==-1)  {
                            $("#x"+a+"y"+b).addClass("sewdirections");
                        } else if (that.directionArray[2].indexOf("North")!==-1)  {
                            $("#x"+a+"y"+b).addClass("newdirections");
                        }
                    }
                } else if (that.directionArray[0].indexOf("West")!==-1)  {
                    if (that.directionArray[1].indexOf("South")!==-1)  {
                        if (that.directionArray[2].indexOf("East")!==-1)  {
                            $("#x"+a+"y"+b).addClass("sewdirections");
                        } else if (that.directionArray[2].indexOf("North")!==-1)  {
                            $("#x"+a+"y"+b).addClass("nswdirections");
                        }
                    } else if (that.directionArray[1].indexOf("East")!==-1)  {
                        if (that.directionArray[2].indexOf("South")!==-1)  {
                            $("#x"+a+"y"+b).addClass("sewdirections");
                        } else if (that.directionArray[2].indexOf("North")!==-1)  {
                            $("#x"+a+"y"+b).addClass("newdirections");
                        }
                    } else if (that.directionArray[1].indexOf(" North")!==-1)  {
                        if (that.directionArray[2].indexOf("South")!==-1)  {
                            $("#x"+a+"y"+b).addClass("nswdirections");
                        } else if (that.directionArray[2].indexOf("East")!==-1)  {
                            $("#x"+a+"y"+b).addClass("newdirections");
                        }
                    }
                }
            } else if (that.directionArray.length===4)  {
                $("#x"+a+"y"+b).addClass("fourdirections");
            }
        }
        mapDirectionRunner(that);
    },

    thePath: async function()  {  //this function takes the entries from directionArray and reads them out on the screen
        console.log('direction array: '+this.directionArray);
        let x=this.directionArray.length;
        let directionString=[];
        //console.log(x);
        if ((x) === 0)  {  //if there is only one direction of travel
            console.log('the path, direction array: '+this.directionArray);
            directionString.push(this.directionArray[x]);
            $("#textwindow").append("<p>You can travel "+ directionString +".</p>");
            textWindowScroller();
            console.log("direction string -->"+directionString);
            this.joinedArray= this.directionArray.join();
            return directionString;
        } else {
            let that= this;
            async function readThePath(that)  {  //if there are several directions of travel
                console.log('the path, direction array: '+that.directionArray);
                if (x<0)  {
                    console.log('readThePath: x is less than 0!');
                } else if ((x) !== 0)  {
                    directionString.push(" " + that.directionArray[(x-1)]);
                    console.log("direction string -->"+directionString);
                    x-=1;
                    return readThePath(that);
                } else if ((x) === 0)  {
                    //$("#twopointfive").append(" and " + that.directionArray[x] + ".");
                    directionString.push(" and " + that.directionArray[x] + ".");
                    $("#textwindow").append("<p>You can travel "+ directionString +".</p>");
                    textWindowScroller();
                    console.log("direction string -->"+directionString);
                    that.joinedArray= that.directionArray.join();
                    return directionString;
                }
            }
            readThePath(that);
        }
    }
}

export {Room};