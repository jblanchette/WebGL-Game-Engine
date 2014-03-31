G.model.Hero = Class.create(G.model.Model, {
    initialize: function($super,options) {
        var defaultAttributes = _.defaults(options || {}, {
            boundingBox: {length: 20, width: 20, height: 20}
        });

        $super(defaultAttributes);

    }
});