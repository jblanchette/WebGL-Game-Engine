G.command.Command = Class.create({
    initialize: function(entity,options) {

        this.alias = 'none';
        this.entity = entity;
        this.options = options || [];

        this.started = false;

        this.properties = {};
    },

    setProperties: function(properties){
        this.properties = properties;
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

    start: function (){
      this.started = true;
    },

    // @TODO: Fix this, circular, maybe use a callback to say it is done
    // rather than delegate the next command itself?
    finish: function(){
        this.getEntity().commandQueue.nextCommand();
    },

    update: function() {

    }
});