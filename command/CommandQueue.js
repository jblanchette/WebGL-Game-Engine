/**
 * CommandQueue
 *
 * Holder for a list of commands, the command at [0] is the current one,
 * additional commands are added to the end.
 */


G.command.CommandQueue = Class.create({
    initialize: function(entity,defCommandAlias) {
        // defCmd is the default command run when there are no commands in the list
        G.log("arg len:",arguments.length);
        if(arguments.length == 1){
            this.defCmd = "Idle";
        }else{
            this.defCmd = defCommandAlias;
        }
        this.entity = entity;
        this.queue = [];

    },
    addCommand: function(command,shiftUsed){
        G.log("Adding command", command.getAlias(),"qLen",this.queue.length);

            if(this.queue.length >= 1){

                // The queue length should be equal to one in this case
                if(this.queue[0].getAlias() == this.defCmd){
                    this.reset();
                }else{
                    if(!shiftUsed && this.queue[0].getProperty("interuptable")){
                        G.log("reset from 2");
                        this.reset();
                    }
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
       var nCmd = new G.command[this.defCmd + "Command"](this.entity);
       nCmd.setAlias(this.defCmd);
       this.reset();
       this.queue.push(nCmd);
    },

    addResetCommand: function(command){
        this.reset();
        this.addCommand(command);
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
