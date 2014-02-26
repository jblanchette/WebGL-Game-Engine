G.model.EntityUnit = Class.create(G.model.Entity, {
    initialize: function($super){
        $super();
        this.health = 100;
        this.mana = 100;
        this.addCommand('Idle');




        this.cursorMode = 0;
        this.cursorAlias = ['Default','Attack Move','Manual Move','Spell Cast'];

    },
    getMoveSpeed: function(){
        return this.movespeed;
    }
});