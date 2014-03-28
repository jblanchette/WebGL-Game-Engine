G.entity.Entity = Class.create({
    initialize: function(options) {

        this.type = G.const.Entity.ENTITY;
        this.model = null;
        this.commandQueue = new G.command.CommandQueue(this);
        this.SceneObject = null;
    },

    events: {
        'change:x': 'setX',
        'change:y': 'setY'
    },

    getSceneObject: function(){
        return this.SceneObject;
    },

    getModel: function(){
        return this.model;
    },

    getType: function() {
        return this.type;
    },

    setType: function(type){
        this.type = type;
        return this;
    },

    setX: function(x) {
        //this.mesh.x = x;
    },
    setY: function(y) {
        //this.mesh.y = y;
    },

    addCommand: function(commandAlias, options) {
        this.commandQueue.addCommand(commandAlias, options);
    },

    /**
     * @TODO: Move this to the model, and then use setRotation
     * to change the mesh / sceneobject
     */
    turn: function(finalTurnRadian,isClockwise) {
        return;
        var currentRotationZ  = this.SceneObject.getRotationZ();
        var currentTurnRate   = this.model.getTurnRate();
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