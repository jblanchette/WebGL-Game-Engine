var G = {};
var Router;
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

        // Stops the context menu from firing on right click
    G.renderer.domElement.addEventListener("contextmenu", function(e){ e.preventDefault(); }, false);

    var dispatcherProxy = function(e) {

        var currentModule = G.getCurrentModule();

        if (currentModule !== null) {
            G.getCurrentModule().getEventDispatcher().dispatchEvent(e);
        }
    };

    // The mouse listeners
    G.renderer.domElement.addEventListener('mouseup',   dispatcherProxy, false);
    G.renderer.domElement.addEventListener('mousedown', dispatcherProxy, false);

    // The key listeners need to be attached to the document
    document.addEventListener('keypress',  dispatcherProxy, false);
    document.addEventListener('keydown',   dispatcherProxy, false);
    document.addEventListener('keyup',     dispatcherProxy, false);

    Router = new G.controller['Router'];

    // Start game main menu
    Router.load('MainMenu',true);
};

/**
 *  Returns current module
 */
G.getCurrentModule = function(){
    return Router.getCurrent();
};

/**
 * Main Update Loop
 */
G.update = function() {

    // @TODO: Call some loading screen instead?
    if (Router.loading) {
        return;
    }
    // Call anything that needs to be updated
    this.getCurrentModule().getUpdateable().each(function(obj){
        obj.update();
    });
};

/**
 * Draw
 */
G.draw = function() {
    var curModule = this.getCurrentModule();
    if(curModule !== null){
        G.renderer.render(curModule.getScene(), curModule.getCamera());
    }
};

G.log = function() {
    if (G.debug) {
        console.log(arguments);
    }
}