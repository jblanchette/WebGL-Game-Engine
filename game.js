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

    G.DebugBox.initialize();

    // Create Projector
    G.projector = new THREE.Projector();

    // Create renderer
    G.renderer = new THREE.WebGLRenderer({ antialias: true });
    G.renderer.setSize(1600, 900);
    document.getElementById('game').appendChild(G.renderer.domElement);

    // Create event dispatcher alias
    G.eventDispatcher = new THREE.EventDispatcher();
    G.IODispatcher    = new THREE.EventDispatcher();

    var dispatchEvent = G.eventDispatcher.dispatchEvent.bind(G.eventDispatcher);
        // Stops the context menu from firing on right click
    G.renderer.domElement.addEventListener("contextmenu", function(e){ e.preventDefault(); }, false);


    // The mouse listeners
    //G.renderer.domElement.addEventListener('mousemove', G.handleMouseMove, false);
    G.renderer.domElement.addEventListener('mouseup',   G.handleMouseUp, false);
    G.renderer.domElement.addEventListener('mousedown', G.handleMouseDown, false);
    // The key listeners need to be attached to the document
    document.addEventListener('keypress',  G.handleKeyPress, false);
    document.addEventListener('keydown',   G.handleKeyDown, false);
    document.addEventListener('keyup',     G.handleKeyUp, false);

    // Start game main menu
    G.loadController('MainMenu');
};



/**
 *  Returns current module
 */
G.getCurrentModule = function(){
    return this.cModule;
};

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
    G.getCurrentModule().getEventDispatcher().dispatchEvent(e);
};


// TODO: do we need these to be named functions with the same code?
//       keeping it this way for now but we can decide later to just
G.handleKeyUp = function(e) {
    G.log("G.handleKeyUp");
    G.getCurrentModule().getEventDispatcher().dispatchEvent(e);
};

G.handleKeyDown = function(e) {
    G.getCurrentModule().getEventDispatcher().dispatchEvent(e);
};

G.handleKeyPress = function(e){
    G.getCurrentModule().getEventDispatcher().dispatchEvent(e);
};

G.handleMouseDown = function(e){
    G.getCurrentModule().getEventDispatcher().dispatchEvent(e);
};

G.handleMouseUp = function(e){
    G.getCurrentModule().getEventDispatcher().dispatchEvent(e);
};

G.log = function() {
    if (G.debug) {
        console.log(arguments);
    }
}