G.component.Component = Class.create({
    initialize: function(options) {
        this.options = options || [];
        this.scene  = null;
        this.camera = null;
        this.subscribeList = [];
    },
    buildScene: function() {

    },

    getSubscribers: function(){
        return this.subscribeList;
    },
    ////////////////////////////////////////////////////////////
    // helper function for components to track a list of
    // event subscriptions
    subscribe: function(eventType,eventHandler){
        this.subscribeList.push([eventType,eventHandler]);
    },

    unsubscribe: function(eventType,eventHandler){
        var e;
        for(var i = 0; i < this.subscribeList.length; i++){
            e = this.subscribeList[i];
            if(e !== undefined && e.length == 2){
                if(eventType == e[0] && eventHandler === e[1]){
                    this.subscribeList.splice(i,1);
                }
            }
        }
    },

    setScene: function(scene) {
        this.scene = scene;
    },

    setCamera: function(camera){
        this.camera = camera;
    },
    getScene: function(){
         return this.scene;
    },
    getCamera: function(){
        return this.camera;
    }

});