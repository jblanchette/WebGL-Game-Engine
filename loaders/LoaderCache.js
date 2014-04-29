G.loader.LoaderCache = Class.create({
    initialize: function() {
        this.entries = {};
    },

    /**
     * Determines if the cache has an entry for the given URL.
     *
     * @param {String} url URL of the asset stored in the cache
     * @returns {Boolean} True if an entry exists. False if no entry exists.
     */
    hasEntry: function(url){
        if(url !== "" && this.entries[url] !== undefined){
            return true;
        }else{
            G.log("Cache.hasEntry FALSE",url,this.entries[url]);
            return false;
        }
    },

    /* @Idea maybe we make a special return type which we use to return
     *       from the "get()" function or possibly "hasEntry()". This value
     *       can't just simply be false because then you can't store the
     *       value false as a resource (idk that you would want to, but
     *       it seems like we should just be sure).
     *
     *       Something just like a certain binary number or whatnot but
     *       written as a constant.
     *
     *       So when the function returns that constant it means "no entry",
     *       but otherwise it returns what it has.
     *
     *       Nice way of saving some calls to "hasEntry" in the code and such.
     */

    /**
     * Get the contents of the entries Array for the given url.
     *
     * * No check is done to ensure the result is not undefined.
     * * This method should be called only after hasEntry() has
     * * been ensured.
     *
     *
     */
    get: function(url){
        return this.entries[url];
    },

    /**
     * Add to the entries Array with given url.
     *
     * If the cache already has an entry for this url,
     * the function returns false.
     *
     * @param {String} url The url of the resource
     * @param {Any} entry The resource which has been loaded from it's URL.
     * @returns {Boolean} True on success. False if an entry exists for the URL.
     */
    add: function(url,entry){
        G.log("Cache.ADD",url);
        if(this.hasEntry(url)){
            G.log("Cache.ADD return")
            return false;
        }

        this.entries[url] = entry;
        return true;
    },

    /**
     * Update the entries Array for the given url.
     *
     * No checks are done to see if something is being over-written.
     *
     * @param {String} url The url of the resource
     * @param {Any} entry The resource which has been loaded from it's URL.
     *
     */
    update: function(url,entry){
        this.entries[url] = entry;
    },

    remove: function(url){

    },

    clearAll: function(){
        this.entries = {};
    }
});