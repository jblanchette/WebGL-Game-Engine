
G.controller.MainMenuController = function(){

    this.init = function() {
        this.module = new Menu();
        this.scene = new THREE.Scene();
        
        this.setupScene();
    }
    this.setupScene = function(){
       var material, textGeom, textMesh;
       for(var i = 0; i<this.menu.options.length; i++){
         material = new THREE.BasicMaterial({color: 0xFFFFFF});
         textGeom = new THREE.TextGeometry(this.menu.options[i],
                                           {font:'verdana'});
         textMesh = new THREE.Mesh(textGeom, material);
         
         this.scene.add( textMesh );
       }
    }
    this.getModule = function() {
        return this.module;
    }
};