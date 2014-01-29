G.command.WalkCommand = Class.create(G.command.Command, {
    initialize: function(entity,options) {
        G.log("ran walk command init");
        G.log(options);
        this.entity = entity;
        this.options = options;

        this.setProperties({interuptable: true});
    },
    /*
     * Update function for walk command:
     *
     * The walk command has stages because the player needs to turn and face the destination at their turnrate,
     * then walk towards the target.
     *
     * ***NOTE ABOUT CURRENT CODE***
     * TODO:
     * Right now it's technically "three" stages because the first stage happens when no stage is set aka if(!this.stage).
     * The reason for that is because it's confusing how to call a "setup" or to run an overwritten "initalize"
     * but if that can be figured out then the first chunk of code can be moved there and we can just go to a boolean
     * of like "isTurning" or "turnFinished" rather than "stages".
     *
     * How it works:
     *
     * We store the angle in radians between the player and his destination in "this.fTheta".  That angle
     * is calculated by doing the atan2 of the displacement between the (x,z) of the player and final pos.
     *
     * Because this results in negative angles they are translated by adding two PI to force all degrees / rads
     * between (0-360) or (0-2PI).
     *
     * Now that we have the angle between them we do some simple vector math to determine how far each "step" is in the x and z direction
     * towards our target based on the entities movespeed value.  This is done by doing a scalar multiplication of the movespeed
     * by the displacement of the Destination-Origin vector.  This value is then stored and used each time as the amount taken
     * per step (xStep,zStep).
     *
     * In order to determine which way the player should turn (clockwise or anti-clockwise) it took a shit ton of trial and error
     * to make it all into a nice useable system.  Once I deciced to force all values between 0 degrees and 360 degrees, it made
     * the most sense to simply measure the length of the turn in the clockwise and the anti-clockwise direction.  Using those
     * values (C for clock and A for anti) they're then put through a utility function "fixRotation" which forces any -0 value back
     * to (360 - ABS(value)) and any +360 value to (value - 360). Could probably simplify that part with a value % 360 of some sort.
     * When the Clockwise turn length is less than Anticlockwise turn length it spins clockwise and vice versa.
     *
     * stepMove will most likely be the place to do hit collision / boundry detection in the future.
     *
     * NOTE: for now I had added the method "turn" to Entity class.  I did this because the logic will apply the same for any entity.
     * It might also be the case that "stepMove" gets put into Entity class as well.  The reason it's not is because I wasn't sure
     * if any other "command" will require stepmove.
     */
    update: function(player) {

        if (!this.stage) {
            var playerPos = player.getPosition();
            this.finalPosition = this.options;

            G.log("Starting walk to " + this.finalPosition.x + "," + this.finalPosition.z);
            G.log("Started walk from " + playerPos.x + "," + playerPos.z);

            this.fTheta = Math.PI - Math.atan2(this.finalPosition.z - playerPos.z,
            this.finalPosition.x - playerPos.x);

            // if the radians are below zero add two pi to force it between (0,2PI)
            if (this.fTheta < 0) {
                this.fTheta += G.twoPI;
            }
            // used for rotation calculation
            this.sDegree = THREE.Math.radToDeg(player.getRotation().y);
            this.fDegree = THREE.Math.radToDeg(this.fTheta);

            //G.log("Turning from: ",this.sDegree," to ",this.fDegree);

            //G.log("Current rad: ", player.getRotation().y, "Dest rad", this.fTheta);

            // this is how far each update the player will go in the x,z direction
            // calculated once here and stored for future use.

            var vFinal = this.finalPosition.clone().sub(playerPos).normalize();


            this.xStep = player.movespeed * vFinal.x;
            this.zStep = player.movespeed * vFinal.z;

            // A = anticlockwise length
            // C = clockwise length
            // fixRotation is a helper function to force values between 0-360
            var A = G.util.fixRotation(this.fDegree - this.sDegree);
            var C = G.util.fixRotation(this.sDegree - this.fDegree);

            if(C <= A){
               G.log("Clockwise");
               this.clockwise = true;
            }else{
               G.log("Anti-Clockwise");
               this.clockwise = false;
            }
            player.turn(this.fTheta, this.clockwise);


            this.stage = 1;
        } else {
            if (this.stage == 1) {
                if (player.getRotation().y != this.fTheta) {
                    //not done turning yet
                    player.turn(this.fTheta, this.clockwise);
                } else {
                    //done turning, start the move
                    this.stepMove(player);
                    this.stage = 2;
                }
            } else {
                // continue move
                this.stepMove(player);
            }
        }
    },
    stepMove: function(player) {
        var playerPos = player.getPosition();
        var dX = Math.abs(playerPos.x - this.finalPosition.x);
        var dZ = Math.abs(playerPos.z - this.finalPosition.z);
        var MS = player.getMoveSpeed();

        // Right now this just checks if the entity is
        // within its own movespeed of its target
        if (dX < MS && dZ < MS) {

            // When its finished assign the exact value since this step
            // would have put it further than the position, so its safe to move it
            // at least this far this frame

            player.setX(this.finalPosition.x);
            player.setZ(this.finalPosition.z);

            G.log("Finished at pos: " + player.getPosition().x + "," + player.getPosition().z);
            //G.log("Finished at rad: ", player.getRotation().y);
            //G.log("Finished at deg: ", THREE.Math.radToDeg(player.getRotation().y));
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