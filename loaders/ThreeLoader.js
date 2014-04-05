G.loader.ThreeLoader = Class.create(G.loader.Loader,{
    initialize : function() {
        G.log("init threeloader");

        /*THREE.DefaultLoadingManager.onProgress = this.progress.bind(this);
        THREE.DefaultLoadingManager.onLoad     = this.finish.bind(this);
        THREE.DefaultLoadingManager.onError    = this.error.bind(this);*/

        this.loader = new THREE.ObjectLoader(  );
        this.url = "";
    },

    start: function(){

    },

    load: function(url){
        G.log("starting load with",this.url);
        this.url = url;
        G.log("Loading",url);
        this.loader.load(url,this.finish);
    },

    error: function(){
        G.log("Error",arguments);
    },

    progress: function(item, loaded, total){
        G.log("Loader progress");
        G.log(item,loaded,total);
    },

    finish: function(result){
        G.log("Loader END");
        G.log("Load result",result);
    }
});