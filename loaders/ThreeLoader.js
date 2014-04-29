G.loader.ThreeLoader = Class.create(G.loader.Loader,{
    initialize: function($super) {
        $super();
        this.manager =
            new THREE.LoadingManager(
                this.finish.bind(this),this.progress.bind(this),this.error.bind(this));

        this.loader = new THREE.ObjectLoader( this.manager );

    },

    start: function(){

    },

    finish: function(){

    },

    /**
     * The load method will check the cache for an entry of the given URL.
     * When no entry is found the THREE.ObjectLoader then calls the load
     * method with an anonymous 'onLoad' function to update the cache entry.
     *
     * @param {String} url The url of the resource to load.
     */
    load: function(url){

        var _this = this;
        // The LoaderCache add method will call hasEntry on the given
        // url and return false if there is an entry already.
        // The null value is a placeholder until the resource is loaded.
        if(this.cache.add(url,null)){
            this.loader.load(url, function(result){
                _this.cache.update(url,result);

                G.log("FIRE LOAD EVENT");
                // Dispatch Finish event
                G.globalDispatcher.dispatchEvent({
                    type: "LOADER.Finish",
                    url: url,
                    result: result
                });
            });
        }

    },

    get: function(url){
        return this.cache.get(url);
    },

    hasBeenLoaded: function(url){

        return this.cache.hasEntry(url);

    },

    error: function(){
        G.log("Error",arguments);
    },

    itemStart: function(){
        G.log("Loader.itemStart",arguments);
    },

    itemEnd: function(result){
        G.log("Loader.itemEnd",result);
    },

    progress: function(url, loaded, total){
        G.log("Loader progress", url, loaded, total);
        // probably update our custom UI loadder counter bar here.
    }
});