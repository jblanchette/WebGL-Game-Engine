G.model.Player = Class.create(G.model.Entity, {
    initialize: function($super){
        $super();
        this.health = 100;
        this.mana = 100;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.addCommand('Idle');
    }
});