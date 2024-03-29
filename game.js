var G = {};
var Router;
G.debug = true;
// Flag which decides if warnings log to console or not.
G.showWarnings = true;
// New flag to put into testing mode when TRUE
// Loads "TestController" with a "TestComponent" instead of usual MainMenu
G.testing = true;
G.warnings = [];
G.fps = 50;
G.state = -1;
G.initialController = "Loading";

G.command = {};
G.component = {};
G.controller = {};
G.loader = {};
G.resources = {};
G.scene = {};
G.entity = {};
G.settings = {};
G.factory = {};
G.scenegraph = {threejs: {}};
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

    // Create ResourceBank, LoaderCache
    G.loaderCache = new G.loader.LoaderCache();
    G.resourceBank = new G.resources.ResourceBank();

    // Create event dispatcher alias
    G.eventDispatcher  = new THREE.EventDispatcher();
    G.globalDispatcher = new THREE.EventDispatcher();
    // Stops the context menu from firing on right click
    G.renderer.domElement.addEventListener("contextmenu", function(e){ e.preventDefault(); }, false);

    G.loadingCamera = new THREE.PerspectiveCamera( 45, 1600 / 900, 1, 3000 );
    G.loadingCamera.position.set( 0, 0, 100 );
    G.loadingScene = new THREE.Scene();
    var dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
	dirLight.position.set( 0, 0, 1 ).normalize();
	G.loadingScene.add( dirLight );

    var geometry = new THREE.TextGeometry("LOADING...", {
        font : 'helvetiker',
        size : 14,
        height : 15
    });

    var material = new THREE.MeshPhongMaterial({color : 0xFFFFFF});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-40,-5,0);

    G.loadingScene.add(mesh);


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
        G.showWarnings = true; // force warnings on
        Router.load("Testing",true);
    }else{
        // Start game main menu
        Router.load(G.initialController,true);
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
        if(Router.loading){
            G.renderer.render(G.loadingScene, G.loadingCamera);
        }else{
            G.renderer.render(curModule.getScene(), curModule.getCamera());
        }
    }
};

G.error = function(){
    // TODO: make this better
    console.log("ERROR:",arguments);
}

G.warning = function(){
      G.warnings.push([arguments]);
      if(G.showWarnings)
        console.log("WARNING:",arguments,G.warnings);
};

G.log = function() {
    if (G.debug) {
        console.log(arguments);
    }
};