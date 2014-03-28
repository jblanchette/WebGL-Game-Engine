G.model.Model = Class.create({
    initialize: function(options) {

        this.eventDispatcher = new THREE.EventDispatcher();
        this.attributes = [];

        var defaultAttributes = _.defaults(options || {}, {
            hp: 100,
            mp: 100,
            boundingBox: {length: 20, width: 20, height: 20}
        });

        this.attributes = defaultAttributes;

        G.log("Model attribs",this.attributes);
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