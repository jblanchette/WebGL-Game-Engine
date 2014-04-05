G.loader.ThreeLoader = Class.create(G.loader.Loader,{
    initialize: function($super,finishCallback) {
        $super();

        this.cache = {};
        this.finishCallback = finishCallback;
        this.manager =
            new THREE.LoadingManager(
                this.finishCallback,this.progress,this.error);

        this.loader = new THREE.ObjectLoader( this.manager );
        this.currentFileUrl = "";
    },

    start: function(){

    },

    load: function(url){
        this.currentFileUrl = url;
        G.log("Loader.load",url);
        this.loader.load(url,this.itemEnd);
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

    progress: function(item, loaded, total){
        G.log("Loader progress");
        G.log(item,loaded,total);
    }
});