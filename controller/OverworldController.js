G.controller.OverworldController = function(){

    this.init = function() {
        this.module = new Overworld();
        this.scene = new THREE.Scene();
    }

    this.getModule = function() {
        return this.module;
    }
};