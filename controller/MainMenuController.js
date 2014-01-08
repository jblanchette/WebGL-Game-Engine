
G.controller.MainMenuController = function() {

    this.init = function(eventDispatcher) {
        this.menu = new Menu();
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        this.eventDispatcher = eventDispatcher;

        /*
         * Maybe register an event?
         *
         * this.eventDispatcher.addEventListener('click', this.menu.handleClick())
         */

        this.setupScene();
    }

    this.setupScene = function() {
        this.menu.buildScene(this.scene);
    }

    this.getModule = function() {
        return {
            update: [this.menu],
            scene: [this.scene],
            camera: [this.camera]
        };
    }
};