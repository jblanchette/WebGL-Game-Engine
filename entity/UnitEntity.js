G.entity.UnitEntity = Class.create(G.entity.Entity, {
    initialize: function($super) {
        $super();

        this.SceneObject = new G.scene['THREESceneObject']();
        this.Model = new G.model['HeroModel'];
    },


});