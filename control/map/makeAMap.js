import {MapBuilder} from '../../model/MapBuilder.js';

/**********************************************************************************/
//an array and counter for new maps (new levels)
let q= 0;
let aNewMap= [];
/**********************************************************************************/

function makeAMap()  {
    aNewMap[q]= new MapBuilder();
    aNewMap[q].buildTheMap(aNewMap[q].xright,aNewMap[q].xsubtract);
    q++;
}

export {makeAMap};