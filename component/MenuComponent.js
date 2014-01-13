G.component.MenuComponent = Class.create(G.component.Component, {

    initialize: function(options) {
        this.options = options || [];
        this.hitboxes = [];
        this.particles = [];
    },

    buildScene: function(scene) {
        var material, textGeom, textMesh, hitboxMaterial, hitboxMesh;

        for (var i = 0; i < this.options.length; i++) {
            textGeom = new THREE.TextGeometry(this.options[i], {
                font: 'helvetiker',
                size: 80,
                height: 5
            });

            material = new THREE.MeshPhongMaterial({color: 0x000000});
            textMesh = new THREE.Mesh(textGeom, material);

            textMesh.position.x = -200;
            textMesh.position.y = 100 + (100 * i) * -1;
            textMesh.position.z = 0;

            hitboxMaterial = new THREE.MeshNormalMaterial({transparent: true, opacity: 0});
            hitboxMesh = new THREE.Mesh(new THREE.CubeGeometry(420, 100, 200), hitboxMaterial);
            hitboxMesh.position.x = textMesh.position.x + 210;
            hitboxMesh.position.y = textMesh.position.y + 50;
            hitboxMesh.position.z = textMesh.position.z;

            hitboxMesh.pID = i;
            hitboxMesh.parentMesh = textMesh;
            this.hitboxes.push(hitboxMesh);

            scene.add(hitboxMesh);
            scene.add(textMesh);

        }

        var pMaterial, pMesh, pGeom;

        for (var c = 0; c < 25; c++) {
            pMaterial = new THREE.MeshPhongMaterial({transparent: true, opacity: .8, color: 0x110000});
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
        if (G.mouseX >= 100 && G.mouseX < 450) {

            mIndex = parseInt((G.mouseY - 90) / 45);
            mIndex = Math.max(mIndex, 0);
            mIndex = Math.min(mIndex, this.selectionCount);

            this.curSelection = mIndex;
        }

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

    handleMenu: function(pID){
      switch(pID){
          case 0:
              G.loadController("Overworld");
          break;
      }  
    },
    handleClick: function(event) {
        var coords = G.util.getEventCoords(event);
        var intersects = G.util.getCoordIntersect(coords.x, coords.y, this.hitboxes);
        var pID;

        if (intersects.length > 0) {
            G.log('Clicked menu item:', intersects[0]);
            pID = intersects[0].object.pID;
            this.handleMenu(pID);
            intersects[0].object.parentMesh.material.color.setHex(0x000000);
        }
    }
});