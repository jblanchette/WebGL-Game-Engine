G.component.MenuComponent = Class.create(G.component.BaseComponent, {

    initialize: function(options) {
        this.options = options || [];
    },

    buildScene: function(scene) {
        var material, textGeom, textMesh;

        for (var i = 0; i < this.options.length; i++) {
            textGeom = new THREE.TextGeometry(this.options[i], {
                font: 'helvetiker',
            });

            material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
            textMesh = new THREE.Mesh(textGeom, material);

            scene.add(textMesh);
        }
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
        if (this.curSelection != -1) {
            if (this.curSelection != 0) {
                alert('does not work yet taking you to overworld');
            }

            G.changeState(1);

        }
    }

});

/*
function Menu() {

    this.options = [
        "Find Match",
        "Training",
        "Settings",
        "Help",
        "Exit"
    ];

    this.selectionCount = this.options.length - 1;
    this.curSelection = -1;
    this.hitboxes = [];

    for (i = 0; i < this.options.length; i++) {
        this.hitboxes[i] = 100 + (i * 45);
    }
};*/

