G.model.Entity = Class.create({
    initialize: function() {
        this.position = {
            x: 0,
            y: 0
        };

        this.Material = new THREE.MeshBasicMaterial();
        this.Geom = new THREE.CubeGeometry(200, 200, 200);
        this.Geom.dynamic = true;

        this.Mesh = new THREE.Mesh(this.Geom, this.Material);
        this.Mesh.position.x = 0;
        this.Mesh.position.y = 100;
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
        this.rotation.x = n;
    },
    setRotationY: function(n) {
        this.rotation.y = n;
    },
    setRotationZ: function(n) {
        this.rotation.z = n;
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
    update: function() {
        var currentCommand = this.cmd.getCurrentCommand(this);

        if (currentCommand) {
            currentCommand.update(this);
        } else {
            this.addCommand('Idle');
        }
    }
});