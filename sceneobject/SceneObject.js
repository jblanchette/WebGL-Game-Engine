G.scene.SceneObject = Class.create({
    initialize: function() {
        /*
         * boundingBox is the rectangle surrounding the SceneObject
         *  used for collision detection.
         *
         * Defined as height, width, length of the rectangle and has its
         * local position defined always as the center of the rectangle
         * being in the center of the entity.
         *
         *
         *  Top Face of rectangle
         *  ==========================================================
         *
         *  (-w/2,-l/2,-h/2)--------(w/2,l/2,-h/2)
         *      \                               \
         *       \                                \
         *        \             (0,0,-h/2)          \
         *         \                                  \
         *          \                                   \
         *     (-w/2,-l/2,-h/2)--------------------(w/2,l/2,-h/2)
         *
         */


        // DEF boundingBox: Array(width, height, length)
        this.boundingBox = [0,0,0];

    },


   /*
    * TODO There needs to be some drawing utility functions in the interface
    *      for a SceneObject.  Most likely these will be things for
    *      manipulating the vertices, material, possibly shaders / textures?
    *
    *      There is room for more to be added here.
    *
    *
    */

    // Return the coordinates of the rectangle bounding box.
    // getBoundingBox: Array( Array(Vector3: [x,y,z]) )
    getBoundingBox: function(){

    },

    // Change the size of the bounding box.
    // SIDE EFFECT Forces the engine to recalculate the box
    setBoundingBox: function(sizeArray){

    },

    // getVertices: Array(Array(Vector3))
    getVertices: function(){

    },
    // setVertices:
    //  Arguments (Array vertArray:
    //                      Array( Array( Vector3 (x,y,z))))
    setVertices: function(vertArray){

    },

    // translatePosition: Arguments(Array xyzArray: [x,y,z])
    translatePosition: function(xyzArray){

    },

    translatePositionX: function(n){

    },

    translatePositionY: function(n){

    },

    translatePositionZ: function(n){

    },

    // getPosition: Array(Float [x,y,z]))
    getPosition: function(){

    },

    // setPosition: Arguments (Array xyzArray: [x,y,z])
    setPosition: function(xyzArray){

    },

    setX: function(n){

    },

    setY: function(n){

    },

    setZ: function(n){

    },

    // applyRotation: Arguments(Array xyzArray: [x,y,z])
    applyRotation: function(xyzArray){

    },

    applyRotationX: function(n){

    },

    applyRotationY: function(n){

    },

    applyRotationZ: function(n){

    },

    // getRotation: Array(Float [x,y,z])
    getRotation: function(){

    },

    // setRotation: Arguments (Array xyzArray: [x,y,z])
    setRotation: function(xyzArray){

    },

    setRotationX: function(n){

    },

    setRotationY: function(n){

    },

    setRotationZ: function(n){

    },

    // applyScale: Arguments(Array xyzArray: [x,y,z])
    applyScaleScale: function(xyzArray){

    },

    applyScaleX: function(n){

    },

    applyScaleY: function(n){
    },

    applyScaleZ: function(n){

    },

    // getScale: Array(Float [x,y,z])
    getScale: function(){

    },

    // setScale: Arguments (Array xyzArray: [x,y,z])
    setScale: function(xyzArray){

    },

    setScaleX: function(n){

    },

    setScaleY: function(n){

    },

    setScaleZ: function(n){

    },


});