G.settings.Entity = {
    Ground: {
        sceneGraph: G.scenegraph.threejs.Ground,
        model:      G.model.Ground,
        modelAttributes: {}
    },
    
    IceHero: {
        sceneGraph: G.scenegraph.threejs.IceHero,
        model:      G.model.Hero,
        modelAttributes: {
            hp: 200,
            mp: 100
        }
    },

    FireHero: {
        sceneGraph: G.scenegraph.threejs.FireHero,
        model:      G.model.Hero,
        modelAttributes: {
            hp: 200,
            mp: 100
        }
    },

    EarthHero: {
        sceneGraph: G.scenegraph.threejs.EarthHero,
        model:      G.model.Hero,
        modelAttributes: {
            hp: 200,
            mp: 100
        }
    }
}