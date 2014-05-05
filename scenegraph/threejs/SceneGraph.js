G.scenegraph.threejs.SceneGraph = Class.create({
    initialize: function(){
        this.container = null;
    },

    buildScene: function(scene,model,resourceBank){

    },

    get: function(){
        return this.container;
    },

    events: {
        'change:x': 'setX',
        'change:y': 'setY',
        'change:z': 'setZ'
    },

    getEvents: function(){
        return this.events;
    },

    setX: function(x) {
        this.container.position.x = x.value;
    },

    setY: function(y) {
        this.container.position.y = y.value;
    },

    setZ: function(z) {
        this.container.position.z = z.value;
    }

});