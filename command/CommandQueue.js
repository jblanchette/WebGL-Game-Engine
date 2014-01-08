/**
 * CommandQueue
 *
 * Holder for a list of commands, the command at [0] is the current one,
 * additional commands are added to the end.
 */


G.command.CommandQueue = function(){
    this.queue = [];
};

G.command.CommandQueue.prototype.addCommand = function(command){
    this.queue.push(command);
}

G.command.CommandQueue.prototype.nextCommand = function(){
    this.queue.shift();

    return this.currentCommand();
}

G.command.CommandQueue.prototype.getCurrentCommand = function(){
    if (this.queue.length === 0) {
        return null;
    }

    return this.queue[0];
}