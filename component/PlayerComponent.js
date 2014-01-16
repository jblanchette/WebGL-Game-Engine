G.component.PlayerComponent = Class.create(G.component.Component, {

    initialize: function(options) {
        this.options = options || [];
        this.hero = new G.model['Player'];
        this.units = [];
    },

    buildScene: function(scene) {
        /*var pMaterial, pMesh, pGeom;

            pMaterial = new THREE.MeshBasicMaterial();
            pGeom = new THREE.CubeGeometry(200,200,200);
            pGeom.dynamic = true;

            pMesh = new THREE.Mesh(pGeom, pMaterial);
            pMesh.position.x = 0;
            pMesh.position.y = 0;
            pMesh.position.z = 0;*/


        // Add event listener
        var _this = this;
        G.eventDispatcher.addEventListener('click', function(e) {
            _this.handleClick(e);
        });
    },

    update: function() {


    },

    handleClick: function(event) {

    }
});