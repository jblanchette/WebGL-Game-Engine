G.resources.ResourceBank = Class.create({

    /*
     * @TODO: Eventually we could use a GUID system for each controller/comp
     * so that we don't have to worry at all about local name collisions.
     *
     * So you could have other developers controllers / components in your
     * project and not worry about obvious name collisions ever.
     *
     * For now we'll just keep the basic system, since it should be trivial to
     * extend it further.
     *
     */

    initialize: function() {
        this.list = {};
        this.entryCounter = 0;
    },

    add: function(name,data){
        G.log("******* RB add",name);
        if(this.hasEntry(name)){
            G.error("Adding resource with the same local name.");
            return;
        }
        this.entryCounter++;
        this.list[name] = data;
    },

    hasEntry: function(key){
        return _.has(this.list,key);
    },

    get: function(name){
        if(this.hasEntry(name)){
            return this.list[name];
        }else{
            G.warning("Couldn't find resource name " + name);
            return null;
        }
    },

    count: function(){
        return this.entryCounter;
    }
});