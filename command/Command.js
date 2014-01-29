G.command.Command = Class.create({
    initialize: function(entity,options) {
        G.log("Rand command init");
        G.log("entity",entity);
        G.log("opt",options);
        this.alias = 'none';
        this.entity = entity;
        this.options = options || [];

        this.properties = {};

    },

    setProperties: function(propObject){
        this.properties = propObject;
    },

    getProperty: function(key){
        if(this.properties[key] !== undefined){
            return this.properties[key];
        }
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