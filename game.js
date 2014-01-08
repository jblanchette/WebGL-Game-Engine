var G = {};


G.debug = true;
G.fps = 50;
G.state = -1;

G.command = {};
G.component = {};
G.controller = {};
G.model = {};

/**
 * Initialize the Game
 */
G.initialize = function() {

    // Create renderer
    G.renderer = new THREE.WebGLRenderer();
    G.renderer.setSize(window.innerWidth - 50, window.innerHeight - 50);
    document.getElementById('game').appendChild(G.renderer.domElement);

    // Create event dispatcher alias
    G.eventDispatcher = new THREE.EventDispatcher();

    // Start game main menu
    G.loadController('MainMenu');
};

/**
 * Load a Controller
 */
G.loadController = function(controllerName) {

    if (G.debug) {
        console.log("Loading Controller: " + controllerName);
    }

    var controller = new G.controller[controllerName + 'Controller'];

    // Init controller with event dispatcher
    controller.init(G.eventDispatcher);

    // Set current Module
    G.cModule = controller.getModule();

    // Setup the components
    if (G.cModule.components) {
        G.cModule.components.each(function(component){
            component.buildScene(G.cModule.scene);
        });
    }
}

/**
 * Main Update Loop
 */
G.update = function() {

    var updateable = G.cModule.update;

    if (!updateable) {
        return;
    }

    // Call anything that needs to be updated
    updateable.each(function(obj){
        obj.update();
    });
};

/**
 * Draw
 */
G.draw = function() {
    G.renderer.render(G.cModule.scene, G.cModule.camera);
};

G.handleMouseClick = function(e) {
    if (G.state == -1)
        return;

    G.cModule.handleClick();

};

G.handleMouseMove = function(e) {
    r = G.canvas.getBoundingClientRect();
    G.mouseX = (e.clientX - r.left);
    G.mouseY = (e.clientY - r.top);
};

G.handleKeyUp = function(e) {
    switch (e.keyCode) {
        case 37:
            //left
            G.keyL = false;
            break;
        case 38:
            //up
            G.keyU = false;
            break;
        case 39:
            //right
            G.keyR = false;
            break;
        case 40:
            G.keyD = false;
            break;
    }
};

G.handleKeyDown = function(e) {
    switch (e.keyCode) {
        case 37:
            //left
            G.keyL = true;
            break;
        case 38:
            //up
            G.keyU = true;
            break;
        case 39:
            //right
            G.keyR = true;
            break;
        case 40:
            G.keyD = true;
            break;
    }
};

G.canMove = function(dir) {


}