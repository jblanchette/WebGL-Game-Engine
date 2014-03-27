var G = {};
var Router;
G.debug = true;
// New flag to put into testing mode when TRUE
// Loads "TestController" with a "TestComponent" instead of usual MainMenu
G.testing = true;
G.warnings = [];
G.fps = 50;
G.state = -1;

G.command = {};
G.component = {};
G.controller = {};
G.scene = {};
G.entity = {};
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
    G.renderer.domElement.addEventListener('mousemove', dispatcherProxy, false);

    // The key listeners need to be attached to the document
    document.addEventListener('keypress',  dispatcherProxy, false);
    document.addEventListener('keydown',   dispatcherProxy, false);
    document.addEventListener('keyup',     dispatcherProxy, false);

    Router = new G.controller['Router'];

    if(G.testing){
        G.log("TEST MODE STARTING ===========================================");
        G.debug = true;    // force debug mode on
        G.warnings = true; // force warnings on
        Router.load("Testing");
    }else{
        // Start game main menu
        Router.load('MainMenu',true);
    }
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

G.warning = function(){
    if(G.debug){
        G.warnings.push([arguments]);
        console.log("WARNING:",arguments);
    }
}

G.log = function() {
    if (G.debug) {
        console.log(arguments);
    }
}