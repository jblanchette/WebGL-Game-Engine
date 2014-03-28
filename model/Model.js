G.model.Model = Class.create({
    initialize: function() {

        this.eventDispatcher = new THREE.EventDispatcher();
        this.attributes = [];

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