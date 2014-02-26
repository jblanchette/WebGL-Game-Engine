G.model.HUD = Class.create({
    initialize: function() {

        this.scrollSpeed = 10;

        this.Material = new THREE.MeshBasicMaterial({color: 0x00FF00});
        this.Geom = new THREE.PlaneGeometry(100, 900);

        this.Geom.dynamic = true;

        this.Mesh = new THREE.Mesh(this.Geom, this.Material);

        this.Mesh.position.x = 157;
        this.Mesh.position.y = 0;
        this.Mesh.position.z = 0;
        this.Mesh.rotation.x = THREE.Math.degToRad(270);

    },
    getMesh: function() {
        return this.Mesh;
    },

    getScrollSpeed: function() {
        return this.scrollSpeed;
    },

    update: function() {

    }
});