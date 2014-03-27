G.scene.THREESceneObject = Class.create(G.scene.SceneObject, {
    initialize: function($super) {
        $super();

       /*
        * The "ParentMesh" is the master parent in the group of our
        * THREE.js Scene Graph.  This keeps things within it local
        * to the parent.  So when we move the parent object everything
        * that is local child will move the same / rotate the same /
        * scale the same.
        */
        G.log("before extend",this);
        Object.extend(this,new THREE.Object3D());
        G.log("after extend:",this);
    },

    // getVertices: Array(Array(Vector3))
    getVertices: function(){
        return this.Geometry.vertices;
    },

    // setVertices:
    //  Arguments (Array vertArray:
    //                      Array( Array( Vector3 (x,y,z))))
    // SIDE EFFECT Sets teh "verticiesNeedUpdate" flag to true on the Geom
    //             This flag is used by openGL to know it needs an update
    setVertices: function(vertArray){
        this.Geometry.verticies = vertArray;
        this.Geometry.verticiesNeedUpdate = true;
    },

    // translatePosition: Arguments(Array xyzArray: [x,y,z])
    translatePosition: function(xyzArray){
        this.translateX(xyzArray[0]);
        this.translateY(xyzArray[1]);
        this.translateZ(xyzArray[2]);
    },

    translatePositionX: function(n){
        this.translateX(n);
    },

    translatePositionY: function(n){
        this.translateY(n);
    },

    translatePositionZ: function(n){
        this.translateZ(n);
    },

    // getPosition: Array(Float [x,y,z]))
    getPosition: function(){
        return this.position;
    },

    // setPosition: Arguments (Array xyzArray: [x,y,z])
    setPosition: function(xyzArray){
        this.position.fromArray(xyzArray);
    },

    setX: function(n){
        this.position.x = n;
    },

    setY: function(n){
        this.position.y = n;
    },

    setZ: function(n){
        this.position.z = n;
    },

    // applyRotation: Arguments(Array xyzArray: [x,y,z])
    applyRotation: function(xyzArray){
        this.rotation.x += xyzArray[0];
        this.rotation.y += xyzArray[1];
        this.rotation.z += xyzArray[2];
    },

    applyRotationX: function(n){
        this.rotation.x += n;
    },

    applyRotationY: function(n){
        this.rotation.y += n;
    },

    applyRotationZ: function(n){
        this.rotation.z += n;
    },

    // getRotation: Array(Float [x,y,z])
    getRotation: function(){
        return this.rotation;
    },

    // setRotation: Arguments (Array xyzArray: [x,y,z])
    setRotation: function(xyzArray){
        this.rotation.fromArray(xyzArray);
    },

    setRotationX: function(n){
        this.rotation.x = n;
    },

    setRotationY: function(n){
        this.rotation.y = n;
    },

    setRotationZ: function(n){
        this.rotation.z = n;
    },

    // applyScale: Arguments(Array xyzArray: [x,y,z])
    applyScaleScale: function(xyzArray){
        this.scale.x += xyzArray[0];
        this.scale.y += xyzArray[1];
        this.scale.z += xyzArray[2];
    },

    applyScaleX: function(n){
        this.scale.x = n;
    },

    applyScaleY: function(n){
        this.scale.y = n;
    },

    applyScaleZ: function(n){
        this.scale.z = n;
    },

    // getScale: Array(Float [x,y,z])
    getScale: function(){
        return this.scale;
    },

    // setScale: Arguments (Array xyzArray: [x,y,z])
    setScale: function(xyzArray){
        this.scale.set(xyzArray);
    },

    setScaleX: function(n){
        this.scale.x = n;
    },

    setScaleY: function(n){
        this.scale.y = n;
    },

    setScaleZ: function(n){
        this.scale.z = n;
    },

});