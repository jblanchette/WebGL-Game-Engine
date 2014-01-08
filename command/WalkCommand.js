
G.command.WalkCommand = function(){

    var destx, desty;

    function initialize(options) {
        destx = options.destx;
        desty = options.desty;
    }

    function update(player) {
        if (player.x < this.destx) {
            player.x++;
        }
    }
};