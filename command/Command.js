G.command.Command = Class.create({
    initialize: function(entity,options) {
        this.entity = entity;
        this.options = options || [];
    },
    getEntity: function(){
        return this.entity;
    },
    finish: function(){
        
    },
    update: function() {
    }
});