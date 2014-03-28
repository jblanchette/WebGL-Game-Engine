G.model.Hero = Class.create(G.model.Model, {
    initialize: function($super,options) {

        $super(options);

        this.eventDispatcher = new THREE.EventDispatcher();


    },

    getAttribute: function(attributeName){
        if(this.attributes[attributeName] !== undefined){
            return this.attributes[attributeName];
        }
    },

    setAttribute: function(attributeName,attributeValue){
        if(attributeName !== ""){
            this.attributes[attributeName] = attributeValue;
        }
    },

    getEventDistpatcher: function(){
        return this.eventDispatcher;
    }
});