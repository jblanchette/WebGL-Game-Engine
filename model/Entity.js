G.model.Entity = Class.create({
    initialize: function() {

        this.movespeed = 1.85;
        this.turnrate = 0.5;

        this.destX = null;
        this.destZ = null;

        this.Material = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors, overdraw: 0.5});
        this.Geom = new THREE.CubeGeometry(20, 20, 20);

        var hex = 0xff0000;
        this.Geom.faces[ 2 ].color.setHex(hex);
        this.Geom.faces[ 3 ].color.setHex(hex);

        var hex2 = 0x00ff00;
        this.Geom.faces[ 0 ].color.setHex(hex2);
        this.Geom.faces[ 1 ].color.setHex(hex2);

        this.Geom.dynamic = true;

        this.Mesh = new THREE.Mesh(this.Geom, this.Material);
        this.Mesh.position.x = 0;
        this.Mesh.position.y = 10;
        this.Mesh.position.z = 0;

        this.cmd = new G.command.CommandQueue();
    },
    addCommand: function(cmd, options) {
        var command = new G.command[cmd + 'Command'](this, options);
        command.setAlias(cmd);

        this.cmd.addCommand(command);
    },
    getMesh: function() {
        return this.Mesh;
    },
    getRotation: function() {
        return this.Mesh.rotation;
    },
    setRotationX: function(n) {
        this.Mesh.rotation.x = n;
    },
    setRotationY: function(n) {
        this.Mesh.rotation.y = n;
    },
    setRotationZ: function(n) {
        this.Mesh.rotation.z = n;
    },
    setPosition: function(x, y, z) {
        this.Mesh.position.x = x;
        this.Mesh.position.y = y;
        this.Mesh.position.z = z;
    },
    setX: function(n) {
        this.Mesh.position.x = n;
    },
    setY: function(n) {
        this.Mesh.position.y = n;
    },
    setZ: function(n) {
        this.Mesh.position.z = n;
    },
    getPosition: function() {
        return this.Mesh.position;
    },
    getX: function() {
        return this.Mesh.position.x;
    },
    getY: function() {
        return this.Mesh.position.y;
    },
    getZ: function() {
        return this.Mesh.position.z;
    },
    addX: function(n) {
        this.Mesh.position.x += n;
    },
    addY: function(n) {
        this.Mesh.position.y += n;
    },
    addZ: function(n) {
        this.Mesh.position.z += n;
    },
    getMoveSpeed: function() {
        return this.movespeed;
    },
    turn: function(finalRadians,isClockwise) {
        var curAngle = this.getRotation().y;
        var d = Math.abs(curAngle - finalRadians);

        if (this.turnrate > d) {
            this.Mesh.rotation.y = finalRadians;
        } else {

            if (isClockwise) {

                this.Mesh.rotation.y -= this.turnrate;
                //G.log("Turned clock to: ", this.Mesh.rotation.y, " Final rad: ", finalRadians);

                if(this.Mesh.rotation.y < 0){

                    this.Mesh.rotation.y = (G.twoPI - Math.abs(this.Mesh.rotation.y));

                }

            } else {

                this.Mesh.rotation.y += this.turnrate;

                if(this.Mesh.rotation.y > G.twoPI){

                    this.Mesh.rotation.y -= G.twoPI;


                }
            }


        }

        if(this.Mesh.rotation.y > 2*Math.PI || this.Mesh.rotation.y < -2*Math.PI){
            G.log("something went wrong with turn");
            this.Mesh.rotation.y = finalRadians;
        }
    },
    update: function() {
        var currentCommand = this.cmd.getCurrentCommand(this);

        if (currentCommand) {
            currentCommand.update(this);
        } else {
            this.addCommand('Idle');
        }
    }
});