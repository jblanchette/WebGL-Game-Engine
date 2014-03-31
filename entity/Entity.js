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

    setX: function(x) {

    },

    setY: function(y) {

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

    addCommand: function(commandAlias, options) {
        this.commandQueue.addCommand(commandAlias, options);
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