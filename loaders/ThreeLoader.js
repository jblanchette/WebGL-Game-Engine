G.loader.ThreeLoader = Class.create(G.loader.Loader,{
    initialize: function(finishCallback) {
        G.log("init threeloader");
        this.finishCallback = finishCallback;
        this.manager =
            new THREE.LoadingManager(
                this.finishCallback,this.progress,this.error);

        this.loader = new THREE.ObjectLoader( this.manager );
        this.url = "";
    },
    
    start: function(){

    },

    load: function(url){
        this.url = url;
        G.log("Loading",url);
        this.loader.load(url,this.itemEnd);
    },

    error: function(){
        G.log("Error",arguments);
    },

    itemEnd: function(result){
        G.log("Loader itemEnd",arguments);
    },

    progress: function(item, loaded, total){
        G.log("Loader progress");
        G.log(item,loaded,total);
    }
});