G.command.WalkCommand = Class.create(G.command.Command, {
    update: function(player){

        var curX = player.getX();
        var curY = player.getY();

        if (curX < this.options.x) {
            G.log("set to:", curX++);
            player.setX(curX + 10);
        }else{
            this.finish();
        }
    },

    finish: function(){
        G.log("finished command");
        this.getEntity().cmd.reset();
    }
});