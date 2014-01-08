G.model.Entity = Class.create({
    initialize: function() {
        this.position = {
            x: 0,
            y: 0
        };

        this.commandQueue = new CommandQueue();
    },

    update: function() {
        var currentCommand = this.commandQueue.getCurrentCommand();

        if (currentCommand) {
            currentCommand.update();
        }
    }
});