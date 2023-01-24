function MapBuilder()  {  //this function will build the map grid of possible rooms
    const mw1993 = window.matchMedia("(min-width: 1993px)");
    const mw1921 = window.matchMedia("(min-width: 1920px) and (max-width: 1992px)");  //this sets y to match a screensize check of at least 1921px wide
    const mw1849 = window.matchMedia("(min-width: 1849px) and (max-width: 1919px)");
    const mw1777 = window.matchMedia("(min-width: 1777px) and (max-width: 1848px)");
    const mw1633 = window.matchMedia("(min-width: 1633px) and (max-width: 1776px)");
    const mw1561 = window.matchMedia("(min-width: 1561px) and (max-width: 1632px)");
    const mw1488 = window.matchMedia("(min-width: 1488px) and (max-width: 1560px)");
    const mw1416 = window.matchMedia("(min-width: 1416px) and (max-width: 1487px)");
    const mw1344 = window.matchMedia("(min-width: 1344px) and (max-width: 1415px)");

    if (mw1993.matches)  {
        console.log('---------------1993 is a match!');
        this.xy= 520;  //total number of boxes in the map, all x,y numbers declared here help designate the (0,0) box and the starting point for the game, they are necessary for the map to work correctly
        this.x_axis= -13;  //starting x value
        this.xright= 12;  //ending x value
        this.xsubtract= 25;  //total boxes in a row including 0 row
        this.y_axis= 9;  //y total will be twice this plus the zero column
    } else if (mw1921.matches)  {
        console.log('---------------1921 is a match!');
        this.xy= 500;
        this.x_axis= -12;
        this.xright= 12;
        this.xsubtract= 24;
        this.y_axis= 9;
    } else if (mw1849.matches)  {
        console.log('---------------1849 is a match!');
        this.xy= 475;
        this.x_axis= -12;
        this.xright= 12;
        this.xsubtract= 24;
        this.y_axis= 9;
    } else if (mw1777.matches)  {
        console.log('---------------1777 is a match!');
        this.xy= 475;
        this.x_axis= -12;
        this.xright= 12;
        this.xsubtract= 24;
        this.y_axis= 9;
    } else if (mw1633.matches)  {
        console.log('---------------1633 is a match!');
        this.xy= 475;
        this.x_axis= -12;
        this.xright= 12;
        this.xsubtract= 24;
        this.y_axis= 9;
    } else if (mw1561.matches)  {
        console.log('---------------1561 is a match!');
        this.xy= 475;
        this.x_axis= -12;
        this.xright= 12;
        this.xsubtract= 24;
        this.y_axis= 9;
    } else if (mw1488.matches)  {
        console.log('---------------1488 is a match!');
        this.xy= 475;
        this.x_axis= -12;
        this.xright= 12;
        this.xsubtract= 24;
        this.y_axis= 9;
    } else if (mw1416.matches)  {
        console.log('---------------1416 is a match!');
        this.xy= 475;
        this.x_axis= -12;
        this.xright= 12;
        this.xsubtract= 24;
        this.y_axis= 9;
    } else if (mw1344.matches)  {
        console.log('---------------1344 is a match!');
        this.xy= 475;
        this.x_axis= -12;
        this.xright= 12;
        this.xsubtract= 24;
        this.y_axis= 9;
    }
    console.log('before the command to build the map! '+this.xright);
}
    
MapBuilder.prototype=  {
    buildTheMap: function(xright,xsubtract)  {  //this function creates a grid giving each square (x,y) coordinates with (0,0) at the center of the map
        const roomOnMap= "<div id= 'x" + this.x_axis + "y" + this.y_axis + "' class= 'maproom'></div>";
        if (this.xy>0)  {
            $("#mapback").append(roomOnMap);
            this.xy--;
            console.log(this.x_axis,xright);
            if (this.x_axis<xright)  {
                this.x_axis++;
            } else if (this.x_axis===xright)  {
                this.x_axis-=xsubtract;
                this.y_axis--;
                console.log("y_axis"+this.y_axis)
            }
            console.log('This is the x_axis! '+this.x_axis);
            return this.buildTheMap(this.xright,this.xsubtract);
        }
    }
}

export {MapBuilder};