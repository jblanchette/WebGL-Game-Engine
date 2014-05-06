G.entity.Entity = Class.create({
    initialize: function(type, model, sceneGraph, options) {

        this.type = type;
        this.model = model;
        this.sceneGraph = sceneGraph;
        this.commandQueue = new G.command.CommandQueue(this);
        this.options = options || {};

        this.id = _.has(this.options,"id") ? this.options.id : "";
        G.log("New Entity with ID", this.id);
    },

    setID: function(id){
        this.id = id;
    },

    getID: function(){
        return this.id;
    },

    getSceneGraph: function(){
        return this.sceneGraph;
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