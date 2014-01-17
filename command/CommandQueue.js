/**
 * CommandQueue
 *
 * Holder for a list of commands, the command at [0] is the current one,
 * additional commands are added to the end.
 */


G.command.CommandQueue = Class.create({
    initialize: function(pObj) {
        this.queue = [];
        this.parentObj = pObj;
    },
    addCommand: function(command){
        this.queue.push(command);
    },

    nextCommand: function(){
        this.queue.shift();

        return this.getCurrentCommand();
    },
    reset: function(){
        //possibly has more code to it so made it a function. if not then we can just
        //put this line inside 'addResetCommand'
        this.queue = [];
    },
    
    addResetCommand: function(command){
        this.reset();
        this.addCommand(command);
    },

    getCurrentCommand: function(){
        if (this.queue.length === 0) {
            G.log("empty cmd que");
            return null; // new IdleCommand? or add an idlecommand?
        }

        return this.queue[0];
    }
});
    