G.factory.EntityFactory = Class.create({

    create: function(type){
        var settings = G.settings.Entity[type];
        if(settings === undefined){
            if(G.warnings)
                G.warning("Create failed to find settings for",type);
            return null;
        }

        if(settings.model === undefined || settings.scenegraph === undefined){
            if(G.warnings)
                G.warning("Settings has undefined model/scenegraph",type);
            return null;
        }

        var model      = new settings.model();
        var scenegraph = new settings.scenegraph();

        return new G.entity.Entity(type, model, scenegraph);
    }

});