/**
 * CommandQueue
 *
 * Holder for a list of commands, the command at [0] is the current one,
 * additional commands are added to the end.
 */


G.command.CommandQueue = Class.create({
    initialize: function() {
        this.queue = [];
    },
    addCommand: function(command){
        G.log("Adding command", command.getAlias());
        if(this.queue.length > 0 && this.queue[0].getProperty("interuptable")) {
            this.reset();
            G.log("reset commands");
        }

        this.queue.push(command);
    },

    pushCommand: function(command){
        // Same thing as add command except used for when you hold shift and want to push another command onto the stack
        // Used because of the way interuptable works, this avoids the check.
        G.log("pushing command", command);
        this.queue.push(command);

    },

    nextCommand: function(){
        this.queue.shift();

        return this.getCurrentCommand();
    },

    reset: function(){
        // possibly has more code to it so made it a function. if not then we can just
        // put this line inside 'addResetCommand'
        this.queue = [];
    },

    finish: function(){
        // called when the current command has fully completed
        this.nextCommand();
    },

    addResetCommand: function(command){
        this.reset();
        this.addCommand(command);
    },

    getCurrentCommand: function(){
        if (this.queue.length === 0) {
            return null; // new IdleCommand? or add an idlecommand?
        }

        return this.queue[0];
    }
});
