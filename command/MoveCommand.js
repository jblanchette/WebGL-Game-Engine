G.command.MoveCommand = Class.create(G.command.Command, {
    initialize: function($super,entity, options) {

        $super(entity,options);

        var props = {interuptable: true,
                     targetType: "any",
                     targetSelector: "pointer"};

        this.setProperties(props);
        this.finalPosition = this.options;

        G.log("Init move cmd:", this.finalPosition.x,this.finalPosition.z);
    },

    start: function($super){

        $super();

        var entityPos = this.entity.getPosition();
        var entityRot = this.entity.getRotation().y;
        var entityMS  = this.entity.getMoveSpeed();
        this.fTheta = Math.PI - Math.atan2(this.finalPosition.z - entityPos.z,
        this.finalPosition.x - entityPos.x);

        // if the radians are below zero add two pi to force it between (0,2PI)
        if (this.fTheta < 0) {
            this.fTheta += G.twoPI;
        }
        // used for rotation calculation
        this.sDegree = THREE.Math.radToDeg(entityRot);
        this.fDegree = THREE.Math.radToDeg(this.fTheta);

        // this is how far each update the entity will go in the x,z direction
        // calculated once here and stored for future use.

        var vFinal = this.finalPosition.clone().sub(entityPos).normalize();
        this.xStep = entityMS * vFinal.x;
        this.zStep = entityMS * vFinal.z;
        this.xStepABS = Math.abs(this.xStep); // only do it once and store it
        this.zStepABS = Math.abs(this.zStep); // used for finish displacement check

        // A = anticlockwise length
        // C = clockwise length
        // fixRotation is a helper function to force values between 0-360
        var A = G.util.fixRotation(this.fDegree - this.sDegree);
        var C = G.util.fixRotation(this.sDegree - this.fDegree);

        this.clockwise = (C <= A);

        G.log("Start move cmd, Dest:", this.finalPosition.x, this.finalPosition.z);
    },

    update: function(entity) {
        if (entity.getRotation().y != this.fTheta) {
            //not done turning yet
            entity.turn(this.fTheta, this.clockwise);
        } else {
            //done turning, start the move
            this.stepMove(entity);

        }
    },

    stepMove: function(entity) {
        var entityPos = entity.getPosition();
        var dX = Math.abs(entityPos.x - this.finalPosition.x);
        var dZ = Math.abs(entityPos.z - this.finalPosition.z);

        // xStepABS and zStepABS are just the absolute value of the step amounts
        // since this is a displacement check
        if (dX <= this.xStepABS && dZ <= this.zStepABS) {

            // When its finished assign the exact value since this step
            // would have put it further than the position, so its safe to move it
            // at least this far this frame



            entity.setX(this.finalPosition.x);
            entity.setZ(this.finalPosition.z);

            this.finish();
            return;

        } else {
            entity.addX(this.xStep);
            entity.addZ(this.zStep);
        }
    },

    finish: function() {
        this.getEntity().cmd.nextCommand();
    }
});