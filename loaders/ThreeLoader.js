G.loader.ThreeSceneLoader = Class.create(G.loader.Loader,{
    initialize : function() {
        THREE.DefaultLoadingManager.onProgress = this.progress.bind(this);
        THREE.DefaultLoadingManager.onLoad     = this.finish.bind(this);
        THREE.DefaultLoadingManager.onError    = this.error.bind(this);
    },

    start: function(){

    },

    error: function(){
        G.log("Error",arguments);
    },

    progress: function(item, loaded, total){
        G.log("Loader progress");
        G.log(item,loaded,total);
    },

    finish: function(){
        G.log("Loader END");
    }
});