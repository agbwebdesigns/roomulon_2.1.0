function ItemCreator()  {   //this object creates new items to go into the containers
    this.itemName= "";
    this.weaponBonus;
    this.playerHP;
    this.designator= "";
}

ItemCreator.prototype=  {
    knife: function()  {
        this.itemName= "knife";
        this.weaponBonus= 1;
        this.designator= "weapon";
    },

    medpack: function()  {
        this.itemName= "medpack";
        this.playerHP= 15;
        this.designator= "health";

    }
}

export {ItemCreator};