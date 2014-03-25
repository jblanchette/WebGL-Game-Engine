G.model.HUD = Class.create({
    initialize: function() {

        this.TextEntries =
            {hp: this.makeTextArea(135,225),
             mp: this.makeTextArea(265,225)};


        this.scrollSpeed = 10;

        this.Mesh = new THREE.Object3D();

        this.BGMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
        this.BGGeom = new THREE.PlaneGeometry(2000, 100);

        this.BGMesh = new THREE.Mesh(this.BGGeom, this.BGMaterial);

        this.BGMesh.position.x = 0;
        this.BGMesh.position.y = 0;
        this.BGMesh.position.z = 1;


        this.PortraitMesh = new THREE.MeshBasicMaterial({color: 0xFF0000});
        this.PortraitGeom = new THREE.PlaneGeometry(90,90);

        this.PortraitMesh = new THREE.Mesh(this.PortraitGeom, this.PortraitMaterial);

        this.PortraitMesh.position.x = -675;
        this.PortraitMesh.position.y = 3;
        this.PortraitMesh.position.z = 2;

        this.Mesh.add(this.BGMesh);
        this.Mesh.add(this.PortraitMesh);

        for(textName in this.TextEntries){
            this.Mesh.add(this.TextEntries[textName]);
        }

    },

    setText: function(textName, textValue){

        if(this.TextEntries[textName] !== undefined){
            var oldText = this.TextEntries[textName];
            var oldPos = oldText.position;
            this.TextEntries[textName] =
                this.makeTextArea(oldPos.x,oldPos.z,textValue);

            this.Mesh.remove(oldText);
            this.Mesh.add(this.TextEntries[textName]);
        }else{
            G.warning("Cannot find text entry: ", textName, textValue);
        }
    },

    makeTextArea: function(x,y,textValue){

        var _textValue = "-";
        if(arguments.length == 3){
            _textValue = textValue;
        }

        var TextGeom = new THREE.TextGeometry(_textValue, {
                font: 'helvetiker',
                size: 12,
                height: 2
            });

        var TextMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
        var TextMesh = new THREE.Mesh(TextGeom, TextMaterial);
        TextMesh.position.x = x;
        TextMesh.position.y = y;
        TextMesh.position.z = 1;


        return TextMesh;
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