G.model.Model = Class.create({
    initialize: function(options) {

        this.eventDispatcher = new THREE.EventDispatcher();
        this.attributes = [];

        var defaultAttributes = _.defaults(options || {}, {
            hp: 100,
            mp: 100,
            x: 0,
            y: 0,
            boundingBox: {length: 1, width: 1, height: 1}
        });

        this.attributes = defaultAttributes;

        G.log("Model attribs",this.attributes);
    },

    // Shortcuts
    set: function(){ this.setAttribute.prototype.call(arguments); },
    get: function(){ this.getAttribute.prototype.call(arguments); },

    getAttribute: function(attributeName){
        if(this.attributes[attributeName] !== undefined){
            return this.attributes[attributeName];
        }
    },

    setAttribute: function(attributeName, attributeValue){
        if(attributeName === ''){
            return;
        }

        var oldValue = this.getAttribute(attributeName);

        if (oldValue !== attributeValue) {
            this.attributes[attributeName] = attributeValue;

            this.getEventDispatcher.dispatchEvent({
                type: 'change:' + attributeName,
                value: attributeValue,
                oldValue: oldValue
            });
        }
    },

    getEventDispatcher: function(){
        return this.eventDispatcher;
    }
});