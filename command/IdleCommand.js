G.command.IdleCommand = Class.create(G.command.Command, {
    initialize: function(entity,options) {

        this.entity = entity;
        this.options = options;
        this.setProperties({interuptable: true});

    },
    update: function(player){

        return;
    }
});