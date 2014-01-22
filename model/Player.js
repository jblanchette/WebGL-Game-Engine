G.model.Player = Class.create(G.model.Entity, {
    initialize: function($super){
        $super();
        this.health = 100;
        this.mana = 100;
        this.movespeed = 6;
        this.addCommand('Idle');
    },
    getMoveSpeed: function(){
        return this.movespeed;
    }
});