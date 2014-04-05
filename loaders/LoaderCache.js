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
        return (this.entries[url] !== undefined);
    },

    add: function(url,entry){
        if(url === "" && this.hasEntry(url)){
            return;
        }

        this.entries[url] = entry;
    },

    remove: function(url){

    },

    clearAll: function(){
        this.entries = {};
    }
});