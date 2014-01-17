G.command.Command = Class.create({
    initialize: function(entity,options) {
        this.alias = 'none';
        this.entity = entity;
        this.options = options || [];
    },

    setAlias: function(alias) {
        this.alias = alias;
    },

    getAlias: function() {
        return this.alias;
    },

    getEntity: function(){
        return this.entity;
    },

    finish: function(){

    },

    update: function() {

    }
});