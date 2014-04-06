G.loader.LoaderCache = Class.create({
    initialize: function() {
        this.entries = {};
    },

    /**
     * hasEntry
     *
     * @param {String} url of the asset stored in the cache
     * @returns {Boolean}
     */
    hasEntry: function(url){
        if(url !== "" && this.entries[url] !== undefined){
            return true;
        }else{
            G.log("Cache.hasEntry FALSE",url,this.entries[url]);
            return false;
        }
    },

    get: function(url){
        if(this.hasEntry(url)){
            return this.entries[url];
        }else{
            return false;
        }
    },

    add: function(url,entry){
        G.log("Cache.ADD",url);
        if(this.hasEntry(url)){
            G.log("Cache.ADD retu")
            return;
        }

        this.entries[url] = entry;
    },

    update: function(url,entry){
        this.entries[url] = entry;
    },

    remove: function(url){

    },

    clearAll: function(){
        this.entries = {};
    }
});