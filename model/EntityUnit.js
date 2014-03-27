G.model.EntityUnit = Class.create(G.model.Entity, {
    initialize: function($super){
        $super();

        this.setType("Unit");

        this.objHeight = 20;
        this.objWidth = 20;
        this.objLength = 20;

        this.movespeed = 5;
        this.turnrate = 0.1;
        this.maxHP = 100;
        this.maxMP = 100;
        this.currentHP = 100;
        this.currentMP = 100;
        this.addCommand('Idle');

        this.cursorMode = 0;
        this.cursorAlias = ['Default','Attack Move','Manual Move','Spell Cast'];

        // Initalize the THREE.js Materials, Geometry, and Mesh



    },

    // selType is a boolean
    setSelected: function(selType){
        this.isSelected = selType;
        this.SelectionMesh.visible = selType;
    },

    getMoveSpeed: function(){
        return this.movespeed;
    }
});