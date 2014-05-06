G.factory.EntityFactory = Class.create({

    create: function(type,options){

        var settings = G.settings.Entity[type];

        if(settings === undefined){
            throw {type: 'Invalid Argument', message: 'Could not find settings for ' + type};
        }

        if(settings.model === undefined){
            throw {type: 'Invalid Argument', message: 'Settings has undefined model'};
        }

        if( settings.sceneGraph === undefined){
            throw {type: 'Invalid Argument', message: 'Settings has undefined sceneGraph'};
        }

        var model      = new settings.model(options);
        var sceneGraph = new settings.sceneGraph(options);
        var entity = new G.entity.Entity(type, model, sceneGraph, options);

        return entity;
    }

});