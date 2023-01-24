function roomIndexBreakdown(thisRoom)  {  //this function pulls the y number out of the currentRoom array based on which room you pass in and turns it into an integer so that properties of the current room can be accessed
    console.log(thisRoom);
    let thisRoomArray= [];
    thisRoomArray.push(thisRoom);
    console.log('this room array '+thisRoomArray[0]);
    let thisRoomSplit= thisRoomArray[0].split("");
    let thisRoomEight= thisRoomSplit[8];
    let thisRoomNine= thisRoomSplit[9];
    let thisRoomTen= thisRoomSplit[10];
    let thisRoomParse= parseInt(thisRoomEight);
    let trn= parseInt(thisRoomNine);
    let trt= parseInt(thisRoomTen);
    if (isNaN(trn))  {  //this checks to see if the keyRoom number is greater than 10
        console.log("this is the next room number: "+thisRoomParse);
        return thisRoomParse;
    } else {
        if (isNaN(trt))  {  //this checks if the keyRoom number is not greater than 100
            console.log("the ninth number"+trn);
            let numberNew= (thisRoomParse*10)+trn;
            console.log("this is the next room number: "+numberNew);
            return numberNew;	
        } else {
            let numberNew= (thisRoomParse*100)+(trn*10)+trt;
            console.log("Over one hundred rooms! -----------------"+numberNew);
            return numberNew;
        }
    }
}

export {roomIndexBreakdown};