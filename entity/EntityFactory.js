G.factory.EntityFactory = Class.create({

    create: function(type,options){

        var settings = G.settings.Entity[type];



        if(settings === undefined){
            throw {type: 'Invalid Argument', message: 'Could not find settings for ' + type};
        }

        if(settings.model === undefined || settings.scenegraph === undefined){
            throw {type: 'Invalid Argument', message: 'Settings has undefined model / scenegraph'};
        }

        var model      = new settings.model(options);
        var scenegraph = new settings.scenegraph();
        var entity = new G.entity.Entity(type, model, scenegraph);

        return entity;
    }

});