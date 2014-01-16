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
        this.queue.push(command);
    },

    nextCommand: function(){
        this.queue.shift();

        return this.getCurrentCommand();
    },

    getCurrentCommand: function(){
        if (this.queue.length === 0) {
            return null; // new IdleCommand? or add an idlecommand?
        }

        return this.queue[0];
    }
});
    