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
};

Menu.prototype.buildScene = function(scene) {
    var material, textGeom, textMesh;

    for (var i = 0; i < this.options.length; i++) {
        material = new THREE.BasicMaterial({color: 0xFFFFFF});
        textGeom = new THREE.TextGeometry(this.options[i], {font: 'verdana'});
        textMesh = new THREE.Mesh(textGeom, material);

        scene.add(textMesh);
    }
};


Menu.prototype.draw = function(context) {

    context.clearRect(0, 0, 640, 480);
    context.fillStyle = "black";
    context.font = "bold 24px Verdana";

    for (i = 0; i < this.options.length; i++) {
        context.fillText(this.options[i], 200, 100 + (i * 45));
    }

    if (this.curSelection != -1) {
        context.fillText(">", 175, 100 + (this.curSelection * 45));
    }
};

Menu.prototype.update = function() {
    // handle background animations

    if (G.mouseX >= 100 && G.mouseX < 450) {

        mIndex = parseInt((G.mouseY - 90) / 45);
        mIndex = Math.max(mIndex, 0);
        mIndex = Math.min(mIndex, this.selectionCount);

        this.curSelection = mIndex;
    }
};

Menu.prototype.handleClick = function() {

    if (this.curSelection != -1) {
        if (this.curSelection != 0) {
            alert('does not work yet taking you to overworld');
        }

        G.changeState(1);

    }


};