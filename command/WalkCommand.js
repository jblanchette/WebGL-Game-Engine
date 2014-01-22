G.command.WalkCommand = Class.create(G.command.Command, {
    update: function(player) {

        if (!this.stage) {
            var playerPos = player.getPosition();
            var playerRot = player.getRotation().y;
            this.finalPosition = this.options;

            var BP = playerPos.clone().sub(this.finalPosition).normalize();
            this.fTheta = Math.PI - Math.atan2(this.finalPosition.z - playerPos.z,
            this.finalPosition.x - playerPos.x);

            if (this.fTheta < 0) {
                G.log("Converting negative angle to positive", this.fTheta, (this.fTheta + G.twoPI));
                this.fTheta += G.twoPI;
            }

            this.sDegree = THREE.Math.radToDeg(player.getRotation().y);
            this.fDegree = THREE.Math.radToDeg(this.fTheta);

            G.log("Turning from: ",
            this.sDegree,
            " to ",
            this.fDegree);

            G.log("Current rad: ", player.getRotation().y, "Dest rad", this.fTheta);

            this.xStep = player.movespeed * (this.finalPosition.x - playerPos.x);
            this.zStep = player.movespeed * (this.finalPosition.z - playerPos.z);

            if ((playerPos.x - this.finalPosition.x) * player.getRotation().y >
            (playerPos.y - this.finalPosition.y) * player.getRotation().x) {
                G.log("Clockwise turn");
                this.clockwise = true;
            } else {
                G.log("Anti-Clockwise turn");
                this.clockwise = false;
            }



            player.turn(this.fTheta, this.clockwise);


            this.stage = 1;
        } else {
            if (this.stage == 1) {
                if (player.getRotation().y != this.fTheta) {
                    player.turn(this.fTheta, this.clockwise);
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

        if (dX < 1 &&
        dZ < 1) {

            player.setX(this.finalPosition.x);
            player.setZ(this.finalPosition.z);

            G.log("Finished at rad: ", player.getRotation().y);
            G.log("Finished at deg: ", THREE.Math.radToDeg(player.getRotation().y));
            G.log("****************************************************");

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