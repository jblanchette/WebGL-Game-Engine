G.scenegraph.threejs.SceneGraph = Class.create({
    initalize: function(){
        this.container = null;
    },



    /**
     * buildScene is the base method which calls setup() which is
     * stored into the container.  The model is used as the argument
     * to define specifics about the sceneGraph.
     *
     * @param {G.model.Model} model Model used to build the sceneGraph
     * @returns {SceneGraph}
     */
    buildScene: function(model){
        return (this.container = this.setup(model));
    },

    /**
     * setup is the method defined by each individual sceneGraph to
     * define itself using the model optionally.
     *
     * @param {G.model.Model} model Model used to build the sceneGraph
     * @returns {SceneGraph}
     */
    setup: function(model){

    },

    events: {
        'change:x': 'setX',
        'change:y': 'setY',
        'change:z': 'setZ'
    },

    setX: function(x) {
        G.log("setX",x);
        this.container.position.x = x;
    },

    setY: function(y) {
        this.container.position.y = y;
    },

    setZ: function(z) {
        this.container.position.z = z;
    }

});