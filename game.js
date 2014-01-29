var G = {};


G.debug = true;
G.fps = 50;
G.state = -1;

G.command = {};
G.component = {};
G.controller = {};
G.model = {};
G.util = {};
G.textures = {};
G.loading = false;

G.twoPI = Math.PI*2;

// Global Modifiers updated by "keydown" event flags
G.mShift = false;
G.mAlt = false;
G.mCtrl = false;

/**
 * Initialize the Game
 */
G.initialize = function() {

    // Create Projector
    G.projector = new THREE.Projector();

    // Create renderer
    G.renderer = new THREE.WebGLRenderer({ antialias: true });
    G.renderer.setSize(1600, 900);
    document.getElementById('game').appendChild(G.renderer.domElement);

    // Create event dispatcher alias
    G.eventDispatcher = new THREE.EventDispatcher();

    var dispatchEvent = G.eventDispatcher.dispatchEvent.bind(G.eventDispatcher);
    G.renderer.domElement.addEventListener('mousemove', dispatchEvent, false);
    G.renderer.domElement.addEventListener('mouseup',   dispatchEvent, false);
    G.renderer.domElement.addEventListener('mousedown', dispatchEvent, false);
    // Stops the context menu from firing on right click
    G.renderer.domElement.addEventListener("contextmenu", function(e){ e.preventDefault(); }, false);

    // The key listeners need to be attached to the document
    document.addEventListener('keypress',  dispatchEvent, false);
    document.addEventListener('keydown',   dispatchEvent, false);
    document.addEventListener('keyup',     dispatchEvent, false);

    // Start game main menu
    G.loadController('MainMenu');
};

/**
 * Load a Controller
 */
G.loadController = function(controllerName) {

    // Log Current Controller
    G.log("Loading Controller: " + controllerName);

    var old = G.cModule;

    // Init Controller
    var controller = new G.controller[controllerName + 'Controller'];

    // Init controller with promises
    G.loading = true;

    G.eventDispatcher._listeners = [];

    controller.init();

    // Set current Module
    G.cModule = controller;

    // Setup the components
    G.cModule.getComponents().each(function(component){
        component.buildScene(G.cModule.getScene(), controller.getPromises());
    });

    RSVP.all(controller.getPromises()).then(function(objects) {

        G.log('Controller finished loading');
        G.loading = false;

    }).catch(function(error) {

        console.log('Could not initiate controller: ', error);

    });
}

/**
 * Main Update Loop
 */
G.update = function() {

    // @TODO: Call some loading screen instead?
    if (G.loading) {
        return;
    }

    // Call anything that needs to be updated
    G.cModule.getUpdateable().each(function(obj){
        obj.update();
    });
};

/**
 * Draw
 */
G.draw = function() {
    G.renderer.render(G.cModule.getScene(), G.cModule.getCamera());
};


G.handleMouseMove = function(e) {
    r = G.canvas.getBoundingClientRect();
    G.mouseX = (e.clientX - r.left);
    G.mouseY = (e.clientY - r.top);
};

G.handleKeyUp = function(e) {
    if (G.state == -1)
        return;

    G.cModule.handleClick();
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

G.log = function() {
    if (G.debug) {
        console.log(arguments);
    }
}