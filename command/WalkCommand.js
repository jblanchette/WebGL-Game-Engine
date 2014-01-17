G.command.WalkCommand = Class.create();

G.command.WalkCommand.prototype = Object.extend(new G.command.Command(), {
    update: function(player){
        var curX = player.getX();

        if (curX < this.options.destx) {
            player.setX(10);
        }
    }
});