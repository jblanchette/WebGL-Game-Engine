G.entity.Entity = Class.create({
    initialize: function(type, model, scenegraph) {

        this.type = type;
        this.model = model;
        this.scenegraph = scenegraph.buildScene(this.model);
        this.commandQueue = new G.command.CommandQueue(this);

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