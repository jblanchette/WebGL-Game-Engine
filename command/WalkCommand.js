G.command.WalkCommand = Class.create(G.command.Command, {
    update: function(player) {

        var curX = player.getX();
        var curz = player.getZ();

        var curMS = player.getMoveSpeed(); // current movespeed

        var angle = player.getRotation().z;
        player.setX(this.options.x);
        player.setZ(this.options.z);
        this.finish();

    },
    finish: function() {
        this.getEntity().cmd.reset();
    }
});