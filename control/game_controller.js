import { heroBuilder } from './heroBuilder.js';
import { makeAMap } from './map/makeAMap.js';
import { roomBuilder } from './map/roomBuilder.js';
import { containerBuilder } from './containerBuilder.js';
import { north } from './directions/north.js';
import { south } from './directions/south.js';
import { east } from './directions/east.js';
import { west } from './directions/west.js';
import { textWindowScroller } from './helper_functions/text_window_scroller.js';

console.log('the game has started');
let hero= heroBuilder();
makeAMap();
console.log('a,b: '+a,b);
$("#x"+a+"y"+b).addClass("currentroom");
let room= async () => roomBuilder(a,b,y);
keyRoom.push(await room(a,b,y));  //this is the roomBuilder object for the game instance, it contains all of the keyroom objects in the game and the current room position of the hero
// roomBuilder.roomBuilder(a,b,y);  //this builds the first room
// currentRoom.pop();
currentRoom.push('keyRoom[' + y + ']');  //updates what the current room is
roomPosition.push([a,b,'keyRoom[' + y + ']']);  //creates a new room listing with object and room position in the roomPosition array
let container= async () => containerBuilder(roomPosition,y,keyRoom);  //maybe build a container in the room
console.log('keyRoom check: '+JSON.stringify(keyRoom[0]));
keyRoom[y].roomContainer.push(await container(roomPosition,y,keyRoom));  //this puts the newly created chest in the roomContainer array
$("#textwindow").append("<p>You see "+ keyRoom[y].roomContainer[0].rcName +".</p>");
textWindowScroller();
y++;

$("#north").on('click',async () => {
	let result= await north(a,b,y);
	console.log('result: '+result);
	console.log('b,y, before: '+b,y);
	if (result==='success1')  {
		y++;
		b++;
		console.log('b,y, after: '+b,y);
	} else if (result==='success2')  {
		b++;
		console.log('b, after: '+b);
	}
});
$("#south").on('click',async () => {
	let result= await south(a,b,y);
	if (result==='success1')  {
		y++;
		b--;
	} else if (result==='success2')  {
		b--;
	}
});
$("#east").on('click',async () => {
	let result= await east(a,b,y);
	if (result==='success1')  {
		y++;
		a++;
	} else if (result==='success2')  {
		a++;
	}
});
$("#west").on('click',async () => {
	let result= await west(a,b,y);
	if (result==='success1')  {
		y++;
		a--;
	} else if (result==='success2')  {
		a--;
	}
});


export {a,b,y,lastDirection,combatOnOff,hero,roomBuilder,roomPosition,keyRoom,currentRoom};