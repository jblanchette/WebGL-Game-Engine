G.entity.Entity = Class.create({
    initialize: function() {
        this.type = G.const.Entity.ENTITY;
        this.SceneObject = null;
        this.Model = null;
    },

    getSceneObject: function(){
        return this.SceneObject;
    },

    getModel: function(){
        return this.Model;
    },

    getType: function() {
        return this.type;
    },

    setType: function(type){
        this.type = type;
        return this;
    },

    // setSceneOptions: Arguments (Object sceneOptions
    //                              [opt position (x,y,z),
    //                               opt rotation (x,y,z),
    //                               opt scale (x,y,z)])
    setSceneOptions: function(sceneOptions){
        for(prop in sceneOptions){
            switch(prop){
                case "position":
                    this.SceneObject.setPosition(sceneOptions.position);
                break;
                case "rotation":
                    this.SceneObject.setRotation(sceneOptions.rotation);
                break;
                case "scale":
                    this.SceneObject.setScale(sceneOptions.scale);
                break;
            }
        }
    },

    addCommand: function(commandAlias, options) {
        this.commandQueue.addCommand(commandAlias, options);
    },

    turn: function(finalTurnRadian,isClockwise) {
        var currentRotationZ  = this.SceneObject.getRotationZ();
        var currentTurnRate   = this.Model.getTurnRate();
        var distanceRemaining = Math.abs(currentRotationZ - finalTurnRadian);

        if (currentTurnRate > distanceRemaining) {
            this.SceneObject.setRotationZ(finalTurnRadian);
        } else {
            if (isClockwise) {
                this.SceneObject.applyRotationZ(-currentTurnRate);
                if(currentRotationZ < 0){
                    this.SceneObject.setRotationZ(G.twoPI - Math.abs(this.Mesh.rotation.z));
                }
            } else {
                this.SceneObject.applyRotationZ(this.turnrate);
                if(currentRotationZ > G.twoPI){
                    this.SceneObject.applyRotationZ(-G.twoPI);
                }
            }
        }
    },

    // Entity class needs to update its command each time.
    // SIDE EFFECT When there is no current command, the default 'Idle'
    //             command is added to the commandQueue.
    //
    update: function() {
        var currentCommand = this.commandQueue.getCurrentCommand(this);

        if (currentCommand) {
            currentCommand.update(this);
        } else {
            this.addCommand('Idle');
        }
    }

});