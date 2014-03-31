G.settings.Entity = {
    IceHero: {
        scenegraph: G.scenegraph.threejs.IceHero,
        model:      G.model.Hero,
        modelAttributes: {
            hp: 200,
            mp: 100
        }
    },

    FireHero: {
        scenegraph: G.scenegraph.threejs.FireHero,
        model:      G.model.Hero
    },

    EarthHero: {
        scenegraph: G.scenegraph.threejs.EarthHero,
        model:      G.model.Hero
    }
}