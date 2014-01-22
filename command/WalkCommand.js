G.command.WalkCommand = Class.create(G.command.Command, {
    update: function(player) {

        if (!this.stage) {
            G.log("no stage set yet");
            G.log(player.getPosition());
            var playerPos = player.getPosition();
            this.finalPosition = this.options;
            /*
            this.fDot = this.options.dot(playerPos);
            this.lengthO = playerPos.length();
            this.lengthF = this.options.length();
            this.fTheta = Math.acos(this.fDot / (this.lengthO * this.lengthF));
            */
            var BP = playerPos.clone().sub(this.finalPosition);
            this.fTheta = Math.atan2(BP.z,BP.x);

            this.xStep = player.movespeed * (this.finalPosition.x - playerPos.x);
            this.zStep = player.movespeed * (this.finalPosition.z - playerPos.z);

            player.turn(this.fTheta);

            this.stage = 1;
        } else {
            G.log("stage", this.stage);
            if (this.stage == 3) {
                this.finish();
                return;
            }

            if (this.stage == 1) {
                if (player.getRotation().y != this.fTheta) {
                    player.turn(this.fTheta);
                } else {

                    this.stepMove(player);
                    this.stage = 2;
                }
            } else {
                this.stepMove(player);
            }
        }
    },
    stepMove: function(player) {
        var playerPos = player.getPosition();
        var dX = Math.abs(playerPos.x - this.finalPosition.x);
        var dZ = Math.abs(playerPos.z - this.finalPosition.z);

        G.log("vals ", dX, dZ);
        if (dX < 1 &&
            dZ < 1) {

            player.setX(this.finalPosition.x);
            player.setZ(this.finalPosition.z);

            this.finish();
            return;

        } else {
            player.addX(this.xStep);
            player.addZ(this.zStep);
        }
    },
    finish: function() {
        this.getEntity().cmd.reset();
    }
});