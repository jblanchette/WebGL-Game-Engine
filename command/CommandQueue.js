/**
 * CommandQueue
 *
 * Holder for a list of commands, the command at [0] is the current one,
 * additional commands are added to the end.
 */


G.command.CommandQueue = Class.create({
    initialize: function(entity, defaultCommand) {

        if (arguments.length === 1) {
            this.defaultCommand = "Idle";
        } else {
            this.defaultCommand = defaultCommand;
        }

        this.entity = entity;
        this.queue = [];
    },

    addCommand: function(commandAlias, options){

        var command = new G.command[commandAlias + 'Command'](this.entity, options || {});
        command.setAlias(commandAlias);

        if (this.queue.length >= 1) {

            var currentCommand = this.getCurrentCommand();

            // The queue length should be equal to one in this case
            if (currentCommand.getAlias() === this.defaultCommand){
                this.reset();
            } else if (!G.mShift && currentCommand.getProperty('interuptable')) {
                this.reset();
            }
        }

        this.queue.push(command);
    },

    nextCommand: function(){
        this.queue.shift();

        return this.getCurrentCommand();
    },

    reset: function(){
        this.queue = [];
    },

    resetToDefault: function(){
       this.reset();
       this.addCommand(this.defaultCommand);
    },

    getCurrentCommand: function(){
        if (this.queue.length === 0) {
             this.resetToDefault();
        }

        var newCmd = this.queue[0];
        if(!newCmd.started){
            newCmd.start();
        }

        return this.queue[0];
    }
});
