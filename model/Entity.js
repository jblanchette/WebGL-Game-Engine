G.model.Entity = Class.create({
    initialize: function() {

        // TypeID points to a Const entry for the TypeName
        this.TypeID = 0;
        this.TypeName = "Entity";
        this.TypeBase = "Entity";

        this.isSelected = false;

        this.destX = null;
        this.destZ = null;

        this.Material = null;
        this.Geom = null;
        this.Mesh = null;

        this.objectMesh = null; // Every entity has an object mesh inside an Object3D group]
                                // This is the mesh used in collision

        this.cmd = new G.command.CommandQueue(this);
    },

    getType: function() {
        return this.TypeName;
    },

    getTypeID: function(){
        return this.TypeID;
    },

    getTypeBase: function(){
        return this.TypeBase;
    },

    setType: function(newType){

        for(var i = 0; i < G.const.Entity.length; i++){
            if(G.const.Entity[i] === newType){
                this.TypeID = i;
                this.TypeName = newType;
                return;
            }
        }

        G.warning("Type not found in const in [" + this.TypeBase + "]: " + newType);

    },

    setSceneOptions: function(sceneOptions){
        for(prop in sceneOptions){
            switch(prop){
                case "position":
                    this.Mesh.position.fromArray(sceneOptions.position);
                break;
            }
        }
    },
    addCommand: function(cmd, options) {
        var command = new G.command[cmd + 'Command'](this, options);
        command.setAlias(cmd);

        this.cmd.addCommand(command);
    },
    getMesh: function() {
        return this.Mesh;
    },
    getObjectMesh: function(){
        return this.objectMesh;
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
    turn: function(finalRadians,isClockwise) {
        var curAngle = this.getRotation().y;
        var d = Math.abs(curAngle - finalRadians);

        if (this.turnrate > d) {
            this.Mesh.rotation.y = finalRadians;
        } else {
            if (isClockwise) {
                this.Mesh.rotation.y -= this.turnrate;
                if(this.Mesh.rotation.y < 0){
                    this.Mesh.rotation.y = (G.twoPI - Math.abs(this.Mesh.rotation.y));
                }
            } else {
                this.Mesh.rotation.y += this.turnrate;
                if(this.Mesh.rotation.y > G.twoPI){
                    this.Mesh.rotation.y -= G.twoPI;
                }
            }
        }

        if(this.Mesh.rotation.y > 2*Math.PI || this.Mesh.rotation.y < -2*Math.PI){
            G.log("something went wrong with turn");
            this.Mesh.rotation.y = finalRadians;
        }
    },
    update: function() {
        var currentCommand = this.cmd.getCurrentCommand(this);

        if (currentCommand) {
            currentCommand.update(this);
        } else {
            this.addCommand('Idle');
        }
    }
});