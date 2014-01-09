G.component.MenuComponent = Class.create(G.component.Component, {

    initialize: function(options) {
        this.options = options || [];
        this.menuItems = [];
    },

    buildScene: function(scene) {
        var material, textGeom, textMesh;

        for (var i = 0; i < this.options.length; i++) {
            textGeom = new THREE.TextGeometry(this.options[i], {
                font: 'helvetiker',
                size: 80,
            });

            material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
            textMesh = new THREE.Mesh(textGeom, material);

            textMesh.position.x = -200;
            textMesh.position.y = 50 + (100 * i) * -1;
            textMesh.position.z = 0;

            scene.add(textMesh);

            // Record for ray tracing
            this.menuItems.push(textMesh);
        }

        // Add event listener
        var _this = this;
        G.eventDispatcher.addEventListener('click', function(e){
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
    },

    handleClick: function(event) {
        var intersects = G.util.getCoordIntersect(event.clientX, event.clientY, this.menuItems);

        if (intersects.length > 0) {
            G.log('Clicked menu item:', intersects[0]);

            intersects[0].object.material.color.setHex(0xff0000);
        }
    }
});