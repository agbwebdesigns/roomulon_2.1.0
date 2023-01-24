import { currentRoomBreakdown } from '../control/helper_functions/current_room_breakdown.js';
import { textWindowScroller } from '../control/helper_functions/text_window_scroller.js';
import { roomIndexBreakdown } from '../control/helper_functions/room_index_breakdown.js';

function Player()  {
    this.playerName= " ";
    this.playerHP= 0;  //***
    this.gold=0;
    this.baddieKills=0;
    this.medpacksUsed=0;
    this.playerTarget= 0;
    this.room= [];  //this is the room the hero/baddie is currently in
    this.turn= 0;  //who's attack turn it is, may be irrelevant now
    this.knowThyCounter= 0;  //forgot what this does?  need to find out
    this.inventory= [];  //hero's inventory, baddies don't use this yet, they could carry droppable loot here 
    this.mRunner;  //baddies move around with this, i am able to stop their movement with this as well
    this.baddieAttacker;
    this.playerSkills= {
        'weaponBonus': '0',  //bonus from carried weapon  ..attack
        'weaponSkill': '0',  //skill with using weapons
        'attackSkill': '0',  //overall skill in attacking  ..attack  //***
        'attackCounter': '0',
        'armorBonus': '0',  //bonus from equiped armor  ..defense
        //'armorSkill': '0',  //skill in wearing armor  ..defense
        //'armorCounter': '0',
        'defenseSkill': '0',  //overall skill in defense  ..defense  //***
        'defenseCounter': '0',
        //block, parry and luck should be random as to whether they help or not
        //block and parry can be affected by armor skill and defense skill
        //also need the ability to miss
          //what percent chance should the player have to miss an attack? (30%, 25%, 15%, 10%)
            //it could be all and which percent chance is random and then hit or miss is calculated
        'block': '0',  //bonus from equiped shield, can only happen when shield is equiped and can only represent a block chance, not a definite block roll  ..defense
        'blockCounter': '0',
        'parry': '0',  //done if a melee weapon is equiped and can only represent a parry chance, not a definite parry roll  ..defense
        'parryCounter': '0',
        'luck': '0',  //you were born lucky, get as many random dice rolls as points in luck you have  ..attack  ..defense  //***
        'luckCounter': '0'
    };
    this.playerEquiped= {
        'weapon': []
        //'mainHand': ''  //what is equiped in the main fighting hand

    };
}

Player.prototype={

    blockAndParryRoller: function()  {  //you shouldn't be able to block and parry at the same time
        let that= this;
        let block= this.playerSkills.block;
        let parry= this.playerSkills.parry;
        let luckyNumber= 0;
        function blockRunner()  {  //need to have a shield to be able to do this
            if (block>0)  {
                let chanceRoll= Math.floor((Math.random()*20)+1);
                if (chanceRoll>15)  {
                    let ln= Math.floor((Math.random()*6)+1);  //what is the lucky number this time?
                    console.log("your lucky number is "+ln+"!");
                    luckyNumber+= ln;
                    if (ln===6)  {  //if the rolled number is equal to 6
                        that.playerSkills.blockCounter++;  //increase the luck counter plus 1
                        console.log("Your block counter has increased +1");
                    }
                    block--;
                    return blockRunner();  //roll again if applicable
                }
            }
        }
        blockRunner();

        function parryRunner()  {  //need to have a blade weapon to be able to do this and so does your opponent
            if (parry>0)  {
                let chanceRoll= Math.floor((Math.random()*20)+1);
                if (chanceRoll>15)  {
                    let ln= Math.floor((Math.random()*6)+1);  //what is the lucky number this time?
                    console.log("your lucky number is "+ln+"!");
                    luckyNumber+= ln;
                    if (ln===6)  {  //if the rolled number is equal to 6
                        that.playerSkills.parryCounter++;  //increase the luck counter plus 1
                        console.log("Your parry counter has increased +1");
                    }
                    parry--;
                    return parryRunner();  //roll again if applicable
                }
            }
        }
        parryRunner();

        return luckyNumber;  //return the lucky number
    },

    attackRoller: function()  {  //need to write this as though the attacker and defender are ambiguous
        //a point in each skill only determines the amount of rolls that can happen, the more skill points you have in each skill the more rolls you get, rolling a 6 increases the points in each skill counter
        let that= this;
        let weapon= this.playerSkills.weaponBonus;
        let attack= this.playerSkills.attackSkill;
        let luckyroll= this.playerSkills.luck;  //how many times can you roll?
        let luckyNumber=0;
        function weaponRunner()  {  //a check to see if you have a weapon equiped
            if (weapon>0)  { //if you have one or more rolls available
                let ln= Math.floor((Math.random()*6)+1);  //what is the lucky number this time?
                console.log("your weapon bonus is "+ln+"!");
                luckyNumber+= ln;
                if (ln===6)  {  //if the rolled number is equal to 6
                    that.playerSkills.weaponSkill++;  //increase the luck counter plus 1
                    console.log("Your attack counter has increased +1");
                }
                weapon--;
                return weaponRunner();  //roll again if applicable
            }
        }
        weaponRunner();

        function attackRunner()  {  //if you are able to attack, everyone should be able to
            if (attack>0)  { //if you have one or more rolls available
                let ln= Math.floor((Math.random()*6)+1);  //what is the lucky number this time?
                console.log("your attack bonus is "+ln+"!");
                luckyNumber+= ln;
                if (ln===6)  {  //if the rolled number is equal to 6
                    that.playerSkills.attackCounter++;  //increase the luck counter plus 1
                    console.log("Your attack counter has increased +1");
                }
                attack--;
                return attackRunner();  //roll again if applicable
            }
        }
        attackRunner();

        function luckRunner()  {  //roll for luck
            let chanceRoll= Math.floor((Math.random()*20)+1);
            if (chanceRoll>15)  {  //will you have a luck roll?
                console.log("a lucky roll!");
                if (luckyroll>0)  { //if you have one or more rolls available
                    let ln= Math.floor((Math.random()*6)+1);  //what is the lucky number this time?
                    console.log("your lucky number is "+ln+"!");
                    luckyNumber+= ln;
                    if (ln===6)  {  //if the rolled number is equal to 6
                        that.playerSkills.luckCounter++;  //increase the luck counter plus 1
                        console.log("Your luck counter has increased +1");
                    }
                    luckyroll--;
                    return luckRunner();  //roll again if applicable
                }
            } else if (chanceRoll<16)  {
                console.log("no luck this time");
            }
        }
        luckRunner();
        console.log("this is the attack bonus number "+luckyNumber);
        return luckyNumber;  //return the lucky number
    },

    defendRoller: function()  {  //need to write this as though the attacker and defender are ambiguous
        //a point in each skill only determines the amount of rolls that can happen, the more skill points you have in each skill the more rolls you get, rolling a 6 increases the points in each skill counter
        let that=this;
        let armor= this.playerSkills.armorbonus;
        let defend= this.playerSkills.defenseSkill;
        let luckyroll= this.playerSkills.luck;  //how many times can you roll?
        let luckyNumber=0;
        function armorRunner()  {  //are you wearing armor?
            if (armor>0)  { //if you have one or more rolls available
                let ln= Math.floor((Math.random()*6)+1);  //what is the lucky number this time?
                console.log("your armor bonus is "+ln+"!");
                luckyNumber+= ln;
                armor--;
                return armorRunner();  //roll again if applicable
            }
        }
        armorRunner();

        function defendRunner()  {  //are you able to defend?
            if (defend>0)  { //if you have one or more rolls available
                let ln= Math.floor((Math.random()*6)+1);  //what is the lucky number this time?
                console.log("your defense bonus is "+ln+"!");
                luckyNumber+= ln;
                if (ln===6)  {  //if the rolled number is equal to 6
                    that.playerSkills.defenseCounter++;  //increase the luck counter plus 1
                    console.log("Your defense counter has increased +1");
                }
                defend--;
                return defendRunner();
            }
        }
        defendRunner();

        function luckRunner()  {  //roll for luck
            let chanceRoll= Math.floor((Math.random()*20)+1);
            if (chanceRoll>15)  {  //will you get a luck roll?
                console.log("a lucky roll!");
                if (luckyroll>0)  { //if you have one or more rolls available
                    let ln= Math.floor((Math.random()*6)+1);  //what is the lucky number this time?
                    console.log("your defense luck bonus is "+ln+"!");
                    luckyNumber+= ln;
                    if (ln===6)  {  //if the rolled number is equal to 6
                        that.playerSkills.luckCounter++;  //increase the luck counter plus 1
                        console.log("Your luck counter has increased +1");
                    }
                    luckyroll--;
                    return luckRunner();  //roll again if applicable
                }
            } else if (chanceRoll<16)  {
                console.log("no luck this time");
            }
        }
        luckRunner();
        console.log("this is the defense bonus number "+luckyNumber);
        return luckyNumber;  //return the lucky number
    },

    baddieAttack: async function()  {
        let number = await currentRoomBreakdown();  //saves the number for which room the player is in
        let {hero,roomBuilder}= await import('../control/game_controller.js');
        if (this.playerTarget===0)  {
            this.playerTarget++;
        }
        let dr= hero.defendRoller();  //when you attack the baddie runs the defense roller to get a defense roll number
        let bp= hero.blockAndParryRoller();
        let ar= this.attackRoller();  //you run an attack roll to get an attack number
        console.log("this is the hero's defense roll: "+dr);
        console.log("this is the hero's block and parry roll: "+bp);
        console.log("this is the baddies attack roll: "+ar);
        //keyRoom[number].baddies[0].playerHP-=hero.playerSkills.attackSkill;  //need to replace this with a combat and defense algorithm
        //$("#six").html(" ");
        if (hero.playerSkills.blockCounter===10)  {  //if luckCounter is equal to 10
            hero.playerSkills.block++;  //luck is increased plus 1
            $("#textwindow").append("<p>Your skill at blocking has increased.</p>");
            textWindowScroller();
            hero.playerSkills.blockCounter-=10
        }
        if (hero.playerSkills.parryCounter===10)  {  //if luckCounter is equal to 10
            hero.playerSkills.parry++;  //luck is increased plus 1
            $("#textwindow").append("<p>You feel more able to parry.</p>");
            textWindowScroller();
            hero.playerSkills.parryCounter-=10
        }
        if (hero.playerSkills.defenseCounter===10)  {  //if luckCounter is equal to 10
            hero.playerSkills.defenseSkill++;  //luck is increased plus 1
            $("#textwindow").append("<p>You feel a little more knowledgable about defense.</p>");
            $("#defenseskill").html("Defense Skill: "+hero.playerSkills.defenseSkill);
            textWindowScroller();
            hero.playerSkills.defenseCounter-=10
        }
        if (hero.playerSkills.luckCounter===10)  {  //if luckCounter is equal to 10
            hero.playerSkills.luck++;  //luck is increased plus 1
            $("#textwindow").append("<p>Your luck has increased +1</p>");
            $("#luck").html(this.playerSkills.luck);
            textWindowScroller();
            hero.playerSkills.luckCounter-=10
        }
        if (ar>(dr+bp))  {
            hero.playerHP-=(ar-(dr+bp));  //if your attack roll is greater than the baddies defense roll you will land a blow for the difference
            $("#herohp").html("HP: "+hero.playerHP);
            $("#textwindow").append("<p>"+this.playerName+" lands a blow for "+(ar-(dr+bp))+ " damage!</p>");
            textWindowScroller();
            /*setTimeout(function()  {
                $("#seven").html(" ");
            }, 3000);*/
        } else if (ar<(dr+bp))  {  //if your attack roll is less than the baddies defense roll you will miss
            $("#textwindow").append("<p>"+this.playerName+" lunges at you wildly and misses!</p>");
            textWindowScroller();
        } else if (ar===(dr+bp))  {
            $("#textwindow").append("<p>"+this.playerName+" snaps at you and barely misses!</p>");
            textWindowScroller();
        }
        if (hero.playerHP<=0)  {  //when the hero loses all of their hitpoints
            this.playerTarget--;
            //$("#five").html(" ");
            setTimeout(function()  {
                //$("#five").html(" ");
                $("#textwindow").append("<p>You have been slain!</p>");
                textWindowScroller();
                if (hero.gold===1)  {
                    $("#textwindow").append("<p>You collected "+hero.gold+" gold piece.</p>");
                    textWindowScroller();
                } else if (hero.gold===0||hero.gold>1)  {
                    $("#textwindow").append("<p>You collected "+hero.gold+" gold pieces.</p>");
                    textWindowScroller();
                }
                if (hero.medpacksUsed===1)  {
                    $("#textwindow").append("<p>You used "+hero.medpacksUsed+" medpacks.</p>");
                    textWindowScroller();
                } else if (hero.medpacksUsed===0||hero.medpacksUsed>1)  {
                    $("#textwindow").append("<p>You used "+hero.medpacksUsed+" medpacks.</p>");
                    textWindowScroller();
                }
                if (hero.baddieKills===1)  {
                    $("#textwindow").append("<p>You killed "+hero.baddieKills+" baddie!</p>");
                    textWindowScroller();
                }else if (hero.baddieKills===0||hero.baddieKills>1)  {
                    $("#textwindow").append("<p>You killed "+hero.baddieKills+" baddies!</p>");
                    textWindowScroller();
                }
                $("#textwindow").append("<p>"+roomBuilder.keyRoom.length+" rooms were created.</p>");
                textWindowScroller();

                // $("#textwindow").append("<p>The game will reload in 10 seconds.</p>");
                // textWindowScroller();
                let r= confirm('Alas, you have been slain!');
                if (r===true)  {
                    window.location.reload();
                } else if (r===true)  {
                    window.location.reload();
                }
                // setTimeout(function()  {
                // 	window.location.reload();
                // }, 3000);
            }, 3000);
        }
    },

    heroAttack: async function()  {
        let {roomBuilder}= await import('../control/game_controller.js');
        let {hero}= await import('../control/game_controller.js');
        let number = await currentRoomBreakdown();  //saves the number for which room the player is in
        if (this.playerTarget===0)  {
            $("#textwindow").append("<p>You must target something first!</p>");
            textWindowScroller();
        } else if (this.playerTarget===1)  {  //if the hero has targeted a baddie
            //luckRoller();
            let dr= roomBuilder.keyRoom[number].baddies[0].defendRoller();  //when you attack the baddie runs the defense roller to get a defense roll number
            let bp= roomBuilder.keyRoom[number].baddies[0].blockAndParryRoller();
            let ar= this.attackRoller();  //you run an attack roll to get an attack number
            console.log("this is the baddies defense roll: "+dr);
            console.log("this is the baddies block and parry roll: "+bp);
            console.log("this is the hero's attack roll: "+ar);
            //keyRoom[number].baddies[0].playerHP-=hero.playerSkills.attackSkill;  //need to replace this with a combat and defense algorithm
            //$("#six").html(" ");
            if (this.playerSkills.weaponSkill===10)  {  //if weaponSkill is equal to 10
                this.playerSkills.weaponBonus++;  //luck is increased plus 1
                $("#textwindow").append("<p>You feel a little more skilled at using a weapon.</p>");
                $("#weaponbonus").html("Weapon: "+'<br>'+hero.playerSkills.attackSkill);
                textWindowScroller();
                this.playerSkills.attackCounter-=10
            }
            if (this.playerSkills.attackCounter===10)  {  //if attackCounter is equal to 10
                this.playerSkills.attackSkill++;  //luck is increased plus 1
                $("#textwindow").append("<p>You feel a little more knowledgable about attacking.</p>");
                $("#attackskill").html("Attack: "+'<br>'+hero.playerSkills.attackSkill);
                textWindowScroller();
                this.playerSkills.attackCounter-=10
            }
            if (this.playerSkills.luckCounter===10)  {  //if luckCounter is equal to 10
                this.playerSkills.luck++;  //luck is increased plus 1
                $("#textwindow").append("<p>Your luck has increased +1</p>");
                $("#luck").html(this.playerSkills.luck);
                textWindowScroller();
                this.playerSkills.luckCounter-=10
            }
            if (ar>(dr+bp))  {
                roomBuilder.keyRoom[number].baddies[0].playerHP-=(ar-(dr+bp));  //if your attack roll is greater than the baddies defense roll you will land a blow for the difference
                $("#textwindow").append("<p>You punch "+roomBuilder.keyRoom[number].baddies[0].playerName+" for "+(ar-(dr+bp))+ " damage!</p>");
                textWindowScroller();
                /*setTimeout(function()  {
                    $("#seven").html(" ");
                }, 3000);*/
            } else if (ar<(dr+bp))  {  //if your attack roll is less than the baddies defense roll you will miss
                $("#textwindow").append("<p>You swing wildly and miss!</p>");
                textWindowScroller();
            } else if (ar===(dr+bp))  {
                $("#textwindow").append("<p>You barely miss hitting "+roomBuilder.keyRoom[number].baddies[0].playerName+"!</p>");
                textWindowScroller();
            }
            if (keyRoom[number].baddies[0].playerHP<=0)  {  //when the baddie loses all of their hitpoints
                //$("#five").html(" ");
                this.playerTarget--;
                // combatOnOff--;
                setTimeout(function()  {
                    //$("#five").html(" ");
                    //$("#six").html(" ");
                    $("#textwindow").append("<p>You have slain "+roomBuilder.keyRoom[number].baddies[0].playerName+ "!</p>");
                    textWindowScroller();
                    hero.baddieKills++;
                    if (roomBuilder.keyRoom[number].baddies[0].gold>0)  {
                        $("#textwindow").append("<p>"+roomBuilder.keyRoom[number].baddies[0].playerName+ " has dropped "+roomBuilder.keyRoom[number].baddies[0].gold+" gold pieces!</p>");
                        textWindowScroller();
                        hero.gold+=roomBuilder.keyRoom[number].baddies[0].gold;
                        $('#herogold').html('');
                        $('#herogold').html('Gold: '+hero.gold);
                    }
                    /*setTimeout(function()  {
                        $("#seven").html(" ");
                    }, 3000);*/
                    roomBuilder.keyRoom[number].baddies[0].combatStopper;
                    roomBuilder.keyRoom[number].baddies.shift();
                }, 3000);
            }
        }
    },

    battleTurner: async function(wgf, krNum, thatBaddie)  {  //wgf is who goes first, 1 for the hero or 2 for the baddie
        let {roomBuilder}= await import('../control/game_controller.js');
        let {hero}= await import('../control/game_controller.js');
        let wgeef= wgf;
        let that=this;
        function wgfRunner()  {
            console.log("which baddie test: "+roomBuilder.keyRoom[krNum].baddies[0].playerHP);
            if (hero.playerHP>0)  {
                if (roomBuilder.keyRoom[krNum].baddies[0].playerHP>0 && that.playerHP>0)  {
                    if (wgf===1)  {  //the hero claims the turn
                        if (roomBuilder.keyRoom[krNum].baddies.length>0)  {
                            hero.turn++;
                            setTimeout(function()  {
                                console.log("hero attack commencing!");
                                hero.heroAttack();
                                wgeef++;
                                hero.turn--;
                                return wgfRunner();
                            }, 10000)
                        }
                    } else if (wgf===2)  {  //the baddie claims the turn
                        that.turn++;
                        that.baddieAttacker= setTimeout(function()  {
                            if (that.playerHP>0)  {
                                that.baddieAttack();
                                console.log("baddie attack commencing!");
                                wgeef--;
                                that.turn--;
                                return wgfRunner();
                            }
                        }, 10000)
                    }
                }
            } else {
                console.log("combat has ended! "+that.playerName);
            }
        }
        wgfRunner();
    },

    combatStopper: function()  {  // this stops the baddie from moving around the map anymore when you enter the room with him in it
        clearTimeout(this.baddieAttacker);  //-a check needs to be run when I enter a new room, when a baddie enters a new room and if a new baddie is created to see if it is occupied and if so, stop the mRunner timer
    },

    baddieMover: async function()  {

        // as soon as the baddie enters the room the baddieMover function needs to be run
        // a check needs to be run to see if the hero is in the room that is being left and that is being entered
        // if the hero is in either room then a notification will be displayed that a baddie is entering or leaving a room
        // if there is no hero then the counter will need to be started to move the baddie out of the room and into another one
        // a check will need to be run on if there are available directions of travel
        // those directions need to be put into an array
        // a random direction will be chosen from the array
        // the integer will need to be taken out of the string ex. keyRoom[0]
        // the baddie at index 0 will be taken out of the keyRoom[x].baddies array
        // and then moved to the chosen room
        // then a check to see if the hero is in the room
        // if the hero is in the room, notify the hero that the baddie has entered from x direction
        // combat needs to interrupt baddieMover() for both the player and the baddie
        //- after successful combat, the baddie keeps trying to move even though he is dead, how do we stop this?  Technically it is stopped already when it finds undefined.

        let {roomBuilder}= await import('../control/game_controller.js');
        let moveTimeChoice= Math.floor((Math.random()*180)+120);
        console.log("this is how long it will be before the baddie switches rooms: "+moveTimeChoice);
        let that= this;
        let baddieRoom= this.room[0];
        let travelCounter= 0;
        let travelArray= [];
        console.log(that);
        let rib= roomIndexBreakdown(baddieRoom);
        let ribt;
        //let thisRoom= this.room;
        //let thisRoomNumber= roomIndexBreakdown(thisRoom);
        //console.log("connections array entry length: "+keyRoom[thisRoomNumber].roomConnectionsArray[0].length);

            //need to create a counter that cycles through the roomConnectionsArray to check if each array index is equal to 2, if so, the baddie can travel in that direction
            //if the counter detects a direction that can be travelled then that index number needs to be saved in an array
            //then a random number should be chosen based on the length of that array and that will be the direction travelled
        console.log("rib: "+rib);
            function rcaCounter(rib)  {  //roomConnectionsArray counter, this creates an array of available directions based on the roomConnectionsArray
                console.log('inside rca counter, that: '+rib);
                if (travelCounter<=3)  {
                    if (roomBuilder.keyRoom[rib].roomConnectionsArray[travelCounter].length===2)  {  //2 indicates there is a room in this direction
                        console.log("connections array entry length: "+roomBuilder.keyRoom[rib].roomConnectionsArray[travelCounter].length);
                        travelArray.push(roomBuilder.keyRoom[rib].roomConnectionsArray[travelCounter][1]);
                        travelCounter++;
                        return rcaCounter(rib);
                    } else if (roomBuilder.keyRoom[rib].roomConnectionsArray[travelCounter].length<2)  {
                        travelCounter++;
                        return rcaCounter(rib);
                    }
                }
                return console.log('this is the travel array: '+travelArray);
            }
            rcaCounter(rib);
            let tal= travelArray.length;
            async function moverRunner(that,ribt)  {
                let krNum= await currentRoomBreakdown();
                let chanceRoll= Math.floor((Math.random()*20)+1);
                if (travelArray.length===1)  {
                    ribt= roomIndexBreakdown(travelArray[0]);
                    that.room.splice(0,1,'keyRoom['+ribt+']');
                    roomBuilder.keyRoom[ribt].baddies.push(keyRoom[rib].baddies.shift());
                    console.log('the baddie has moved to keyRoom['+ribt+']');
                    if (travelArray[0]===roomBuilder.currentRoom[0])  {
                        let baddieName= that.playerName;
                        $("#textwindow").append("<p>" + baddieName + " has entered the room!");
                        textWindowScroller();
                        //baddie needs to attack here
                        if (that.playerTarget===0)  {
                            that.playerTarget++;
                            setTimeout(() =>  {
                                console.log("this is which baddie is attacking: "+that.playerName);
                                textWindowScroller();
                                // combatOnOff++;
                                $("#textwindow").append("<p>"+that.playerName+" takes initiative, you brace for attack.</p>");
                                that.battleTurner(2, krNum, that.knowThyCounter);
                            }, chanceRoll*1000)
                        }
                        return;
                    }
                } else if (travelArray.length>1)  {
                    let rtaNum= Math.floor(Math.random()*tal);
                    console.log('rtaNum '+rtaNum);
                    ribt= roomIndexBreakdown(travelArray[rtaNum]);
                    that.room.splice(0,1,'keyRoom['+ribt+']');
                    roomBuilder.keyRoom[ribt].baddies.push(keyRoom[rib].baddies.shift());
                    console.log('the baddie has moved to keyRoom['+ribt+']');
                    if (travelArray[rtaNum]===currentRoom[0])  {
                        let baddieName= that.playerName;
                        $("#textwindow").append("<p>" + baddieName + " has entered the room!");
                        textWindowScroller();
                        //baddie needs to attack here
                        if (that.playerTarget===0)  {
                            that.playerTarget++;
                            setTimeout(() =>  {
                                console.log("this is which baddie is attacking: "+that.playerName);
                                textWindowScroller();
                                // combatOnOff++;
                                $("#textwindow").append("<p>"+that.playerName+" takes initiative, you brace for attack.</p>");
                                that.battleTurner(2, krNum, that.knowThyCounter);
                            }, chanceRoll*1000)
                        }
                        return;
                    }
                }
                return that.baddieMover();
            }

        this.mRunner= setTimeout(async function()  {  //this will be the counter to decide how long to wait before moving to another room, up to 3 minutes
            let {roomBuilder}= await import('../control/game_controller.js');
            if (roomBuilder.keyRoom[rib]!==roomBuilder.currentRoom[0])  {
                moverRunner(that,ribt);
            }
        }, moveTimeChoice*1000);

    },

    baddieStopper: function()  {  // this stops the baddie from moving around the map anymore when you enter the room with him in it
        clearTimeout(this.mRunner);  //-a check needs to be run when I enter a new room, when a baddie enters a new room and if a new baddie is created to see if it is occupied and if so, stop the mRunner timer
    }
}

export {Player};