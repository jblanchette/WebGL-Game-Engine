G.command.IdleCommand = Class.create(G.command.Command, {
    initialize: function(entity,options) {

        this.entity = entity;
        this.options = options;
        this.setProperties({interuptable: true});
        G.log("init idle");
    },
    start: function($super){
      $super();
      G.log("start idle");
    },
    update: function(player){

        return;
    }
});