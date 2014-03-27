G.model.Entity = Class.create({
    initialize: function() {

        this.type = G.const.Entity.ENTITY;
        this.isSelected = false;

        this.objWidth = 0;
        this.objHeight = 0;
        this.objLength = 0;

        this.Material = null;
        this.Geom = null;
        this.Mesh = null;

        this.objectMesh = null; // Every entity has an object mesh inside an Object3D group]
                                // This is the mesh used in collision

    },

    getMesh: function() {
        return this.Mesh;
    },

    getObjectMesh: function(){
        return this.objectMesh;
    },

    getBounds: function(){
        // returns the width, height, length of the bounding collision box
        return {width: this.objWidth,
                height: this.objHeight,
                length: this.objLength};
    },

    getRotation: function() {
        return this.Mesh.rotation;
    },

    setRotationX: function(n) {
        this.Mesh.rotation.x = n;
    },

    setRotationY: function(n) {
        this.Mesh.rotation.y = n;
    },

    setRotationZ: function(n) {
        this.Mesh.rotation.z = n;
    },

    setPosition: function(x, y, z) {
        this.Mesh.position.x = x;
        this.Mesh.position.y = y;
        this.Mesh.position.z = z;
    },

    setX: function(n) {
        this.Mesh.position.x = n;
    },

    setY: function(n) {
        this.Mesh.position.y = n;
    },

    setZ: function(n) {
        this.Mesh.position.z = n;
    },

    getPosition: function() {
        return this.Mesh.position;
    },

    getPositionString: function() {
        return this.Mesh.position.x.toFixed(2) + "," + this.Mesh.position.y.toFixed(2);
    },

    getX: function() {
        return this.Mesh.position.x;
    },

    getY: function() {
        return this.Mesh.position.y;
    },

    getZ: function() {
        return this.Mesh.position.z;
    },

    addX: function(n) {
        this.Mesh.position.x += n;
    },

    addY: function(n) {
        this.Mesh.position.y += n;
    },

    addZ: function(n) {
        this.Mesh.position.z += n;
    },

    getMoveSpeed: function() {
        return this.movespeed;
    },

    update: function() {
        var currentCommand = this.commandQueue.getCurrentCommand(this);

        if (currentCommand) {
            currentCommand.update(this);
        } else {
            this.addCommand('Idle');
        }
    }
});