G.factory.EntityFactory = Class.create({

    create: function(type){
        var settings = G.settings[entityType];
        if(settings === undefined){
            if(G.warnings)
                G.warning("Create failed to find settings for",entityType);
            return null;
        }

        if(settings.model === undefined || settings.scenegraph === undefined){
            if(G.warnings)
                G.warning("Settings has undefined model/scenegraph",entityType);
            return null;
        }

        var model      = new settings.model();
        var scenegraph = new settings.scenegraph();

        scenegraph.buildScene(model);

        return new G.entity.Entity(type, model, scenegraph);
    }

});