G.factory.EntityFactory = Class.create({

    create: function(type,options){

        var settings = G.settings.Entity[type];



        if(settings === undefined){
            throw {type: 'Invalid Argument', message: 'Could not find settings for ' + type};
        }

        if(settings.model === undefined || settings.sceneGraph === undefined){
            throw {type: 'Invalid Argument', message: 'Settings has undefined model / scenegraph'};
        }

        var model      = new settings.model(options);
        var sceneGraph = new settings.sceneGraph();
        var entity = new G.entity.Entity(type, model, sceneGraph);

        return entity;
    }

});