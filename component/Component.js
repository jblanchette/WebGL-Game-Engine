G.component.Component = Class.create({
    initialize: function(options) {
        this.options = options || [];
        this.scene  = null;
        this.camera = null;
    },
    buildScene: function() {

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