G.component.SpaceBackgroundComponent = Class.create(G.component.Component, {

    initialize: function(options) {
        alert('wut..');
        console.log('options', options);
        this.texture = options.texture;
    },

    buildScene: function() {
        alert('its working bro.. idk..');
        var texture = options.texture;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

        var dome = new THREE.SphereGeometry(1500, 100, 100);
        var domeMaterial = new THREE.MeshPhongMaterial({
            color: 0x000000,
            side: THREE.BackSide,
            map: texture
        });

        var domeMesh = new THREE.Mesh(dome, domeMaterial);
        this.getScene().add(domeMesh);

        // Setup lights
        this.getScene().add(new THREE.AmbientLight(0xeef0ff));
    },
});