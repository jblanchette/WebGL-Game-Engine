G.model.Model = Class.create({
    initialize: function(options) {

        this.eventDispatcher = new THREE.EventDispatcher();
        this.attributes = [];

        var defaultAttributes = _.defaults(options || {}, {
            hp : 100,
            mp : 100,
            x : 0,
            y : 0,
            z : 0,
            xRotation: 0,
            yRotation: 0,
            zRotation: 0,
            xScale: 0,
            yScale: 0,
            zScale: 0,
            boundingBox : {length : 1, width : 1, height : 1}
        });

        this.attributes = defaultAttributes;

        G.log("Model attribs", this.attributes);
    },

    /**
     * syncAll will fire the 'change' event for all attributes on the model.
     */
    syncAll: function(){
        var self = this;
        _.each(this.attributes, function(value, attribute){
            self.triggerChange(attribute, value, null);
        });
    },

    // Shortcuts
    set: function() {
        this.setAttribute.prototype.apply(this, arguments);
    },

    get: function() {
        this.getAttribute.prototype.apply(this, arguments);
    },

    /**
     * getAttribute will return the attribute of specified name.
     *
     */
    getAttribute: function(attributeName) {
        if (this.attributes[attributeName] !== undefined) {
            return this.attributes[attributeName];
        }
    },

    setAttribute: function(attributeName, attributeValue) {
        if (attributeName === '') {
            return;
        }

        var oldValue = this.getAttribute(attributeName);

        if (oldValue !== attributeValue) {
            this.attributes[attributeName] = attributeValue;

            // Trigger change event
            this.triggerChange(attributeName, attributeValue, oldValue);
        }
    },

    triggerChange: function(attribute, value, oldValue) {
        this.getEventDispatcher.dispatchEvent({
            type : 'change:' + attribute,
            value : value,
            oldValue : oldValue
        });
    },

    /**
     * @TODO: fix this
     */
    turn: function(finalTurnRadian, isClockwise) {
        return;
        var currentRotationZ = this.SceneObject.getRotationZ();
        var currentTurnRate = this.model.getTurnRate();
        var distanceRemaining = Math.abs(currentRotationZ - finalTurnRadian);

        if (currentTurnRate > distanceRemaining) {
            this.SceneObject.setRotationZ(finalTurnRadian);
        } else {
            if (isClockwise) {
                this.SceneObject.applyRotationZ(-currentTurnRate);
                if (currentRotationZ < 0) {
                    this.SceneObject.setRotationZ(G.twoPI - Math.abs(this.Mesh.rotation.z));
                }
            } else {
                this.SceneObject.applyRotationZ(this.turnrate);
                if (currentRotationZ > G.twoPI) {
                    this.SceneObject.applyRotationZ(-G.twoPI);
                }
            }
        }
    },

    getEventDispatcher: function() {
        return this.eventDispatcher;
    }
});
