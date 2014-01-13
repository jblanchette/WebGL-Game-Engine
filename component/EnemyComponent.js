G.component.EnemyComponent = Class.create(G.component.Component, {

    initialize: function(options) {
        this.options = options || [];
        this.enemies = [];
        this.particles = [];
    },

    buildScene: function(scene) {
        var pMaterial, pMesh, pGeom;

        for (var c = 0; c < 25; c++) {
            pMaterial = new THREE.MeshBasicMaterial();
            pGeom = new THREE.SphereGeometry(20+Math.random()*30, 50, 50);
            pGeom.dynamic = true;

            pMesh = new THREE.Mesh(pGeom, pMaterial);
            pMesh.position.x = Math.random() * 500 * ((Math.random() < 0.5) ? -1 : 1);
            pMesh.position.y = Math.random() * 300 * ((Math.random() < 0.5) ? -1 : 1);
            pMesh.position.z = - Math.random() * 600 - 50;

            pMesh.xVel = 3 + (Math.random() * 8) * ((Math.random() < 0.5) ? -1 : 1);
            pMesh.yVel = 3 + (Math.random() * 6) * ((Math.random() < 0.5) ? -1 : 1);

            this.particles.push(pMesh);
            scene.add(pMesh);
        }

        // Add event listener
        var _this = this;
        G.eventDispatcher.addEventListener('click', function(e) {
            _this.handleClick(e);
        });
    },

    update: function() {

        var p;
        var c;

        for (var i = 0; i < this.particles.length; i++) {

            p = this.particles[i];

            if ((p.position.x) >= 1500 || p.position.x <= -1500) {
                p.xVel *= -1;
            }

            if ((p.position.y) >= 700 || p.position.y <= -700) {
                p.yVel *= -1;
            }


            p.position.x += p.xVel;
            p.position.y += p.yVel;


        }
    },

    handleClick: function(event) {
        var coords = G.util.getEventCoords(event);
        var intersects = G.util.getCoordIntersect(coords.x, coords.y, this.particles);

        if (intersects.length > 0) {
            G.log('Clicked particle item:', intersects[0]);
            intersects[0].object.material.color.setHex(0xff0000);
        }
    }
});