G.model.Player = Class.create(G.model.Entity, {
    initialize: function($super){
        $super();
        this.health = 100;
        this.mana = 100;
        this.xv = 5;
        this.yv = 5;
        this.zv = 0;
        this.addCommand('Idle');
    }
});