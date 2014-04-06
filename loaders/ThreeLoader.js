G.loader.ThreeLoader = Class.create(G.loader.Loader,{
    initialize: function($super,finishCallback) {
        $super();

        this.finishCallback = finishCallback;
        this.manager =
            new THREE.LoadingManager(
                this.finishCallback,this.progress.bind(this),this.error.bind(this));

        this.loader = new THREE.ObjectLoader( this.manager );
        this.currentFileUrl = "";
    },

    start: function(){

    },

    load: function(url){
        var _this = this;
        this.currentFileUrl = url;

        if(this.cache.hasEntry(url)){
            G.log("Loader.CacheHit",url);
            return;
        }
        G.log("Loder.CacheMiss",url);

        this.loader.load(url,function(result){
            G.log("Loader.CacheUPDATE",url,result);
            _this.cache.update(_this.currentFileUrl,result);
        });

        this.cache.add(url,null);
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