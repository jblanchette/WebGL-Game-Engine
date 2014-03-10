G.model.EntityThing = Class.create(G.model.Entity, {
    initialize: function($super) {
        $super();

        this.setType("Thing");

        this.health = 100;
        this.mana = 100;
        this.addCommand('Idle');

        this.cursorMode = 0;
        this.cursorAlias = ['Default', 'Action'];
        // Default:     For normal cursor, unselected actions / has no actions
        // Action:      For when the Thing has a function / spell / action.
        //              Example: A trap that has an activate spell

        // Initalize the THREE.js Materials, Geometry, and Mesh.

        // Since we have a Line object we need to put it in a parent Object3D
        this.Mesh = new THREE.Object3D();


    }
});