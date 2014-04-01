G.model.Model = Class.create({
    initialize : function(options) {

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

    // Shortcuts
    set : function() {
        this.setAttribute.prototype.call(arguments);
    },

    get : function() {
        this.getAttribute.prototype.call(arguments);
    },

    getAttribute : function(attributeName) {
        if (this.attributes[attributeName] !== undefined) {
            return this.attributes[attributeName];
        }
    },

    setAttribute : function(attributeName, attributeValue) {
        if (attributeName === '') {
            return;
        }

        var oldValue = this.getAttribute(attributeName);

        if (oldValue !== attributeValue) {
            this.attributes[attributeName] = attributeValue;

            this.getEventDispatcher.dispatchEvent({
                type : 'change:' + attributeName,
                value : attributeValue,
                oldValue : oldValue
            });
        }
    },

    /**
     * @TODO: fix this
     */
    turn : function(finalTurnRadian, isClockwise) {
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

    getEventDispatcher : function() {
        return this.eventDispatcher;
    }

});
