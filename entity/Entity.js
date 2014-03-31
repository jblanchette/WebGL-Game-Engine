G.entity.Entity = Class.create({
    initialize: function(type, model, scenegraph) {

      /**
       * @TODO: figure out the type system a little more.
       *            -generate unique id?
       *            -get unique id from scenegraph?
       *            -use constants system? binary system?
       *        Type system for entities would be useful for selections,
       *        hit collisions (possibly), auras, ect.
       *
       *        For example checking if a unit should get an aura that's
       *        defined as "Only Allies" would be easily O(1) as a
       *        type attribute flag for the ally team ID. The team id
       *        would be 0 = lower team , 1 = upper team, 2 = nuets , ect.
       *
       *
       */

        this.type = type;
        this.model = model;

        // The SceneGraph is built using the model.   The model can define
        // specific attributes for the scenegraph to generate.

        // Could change opactiy, color, size, geometry (hacked off limbs?).

        this.scenegraph = scenegraph.buildScene(model);

        this.commandQueue = new G.command.CommandQueue(this);

    },

    events: {
        'change:x': 'setX',
        'change:y': 'setY'
    },

    getSceneGraph: function(){
        return this.scenegraph;
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