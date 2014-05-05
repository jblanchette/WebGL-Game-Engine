G.resources.ResourceBank = Class.create({
    initialize: function() {
        this.list = {};
    },

    create: function(name,url){

    }

    add: function(url,data){
        if(this.hasEntry(url)){
            G.warning("Adding resource with the same URL");
        }
        this.list[url] = data;
    },

    hasEntry: function(key){
        return _.has(this.list,key);
    },

    get: function(url){
        if(this.hasEntry(url)){
            return this.list[url];
        }else{
            G.warning("Couldn't find resource url " + url);
            return null;
        }
    },

    count: function(){
        return _.size(this.list);
    }
});