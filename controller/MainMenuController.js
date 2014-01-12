/**
 *
 * Main Menu Controller
 *
 */
G.controller.MainMenuController = Class.create(G.controller.Controller, {

    init: function(promises) {

        var scene = this.getScene();

        this.angle = 0;
        this.menu = new G.component.MenuComponent([
            'Play',
            'Continue',
            'Settings',
            'Quit',
            'Noobs Only'
        ]);

        // Load Texture
        promises.push(new RSVP.Promise(function(resolve, reject) {

            THREE.ImageUtils.loadTexture('./textures/space.jpg', undefined, function(texture){
                resolve(texture);
            }, function() {
                reject('Could not load space.jpg');
            });

        }).then(function(texture) {

            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

            var dome = new THREE.SphereGeometry(1500, 100, 100);
            var domeMaterial = new THREE.MeshPhongMaterial({
                color: 0x000000,
                side: THREE.BackSide,
                map: texture
            });

            var domeMesh = new THREE.Mesh(dome, domeMaterial);
            scene.add(domeMesh);

        }));

        // Add Menu component with update
        this.addComponent(this.menu, true);

        // Setup lights
        this.scene.add(new THREE.AmbientLight(0xeef0ff));

        // Setup camera
        this.camera = new THREE.PerspectiveCamera( 90, 1600 / 900, 1, 3000 );
	this.camera.position.set( 0, 0, 700 );
        this.addUpdate(this);
    },

    update: function() {
        this.camera.position.x = (Math.sin(this.angle)*150);
        this.camera.position.y = (Math.cos(this.angle)*150);
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.angle+=.01;
    }
});
