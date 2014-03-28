G.component.HUDComponent = Class.create(G.component.Component, {
    initialize: function($super, options) {
        $super(options);
        this.HUD = new G.model['HUD'];
    },

    events: {
        'keydown': 'handleKeyDown',
        'ENTITY.Add': 'updateSelection',
        'ENTITY.Remove': 'updateSelection',
        'ENTITY.MoveEnd': 'updateSelection'
    },

    buildScene: function() {
        this.HUD.getMesh().position.set(0, -370, 0);
        this.getScene().add(this.HUD.getMesh());
    },

    update: function() {
        this.HUD.update();
    },

    handleModifiers: function(event) {
        // Handle Modifiers is used specifially (at the moment) for modifier keys
        // The "event" that is send has a few flags.
        // Flags: shiftKey, altKey, ctrlKey
        // Other keys: A, M
        G.mAlt = event.altKey;
        G.mCtrl = event.ctrlKey;
        G.mShift = event.shiftKey;
    },

    updateSelection: function(event) {
        var unit = event.data;

        this.HUD.setText("hp", "HP: " + unit.currentHP + "/" + unit.maxHP);
        this.HUD.setText("mp", "Pos: " + unit.getPositionString());
    },

    handleKeyDown: function(event) {
        if (event.keyCode === 38) {
            //up
            this.HUD.getMesh().position.x -= 1;
        } else if (event.keyCode === 40) {
            //down
            this.HUD.getMesh().position.x += 1;
        }
        G.log(this.HUD.getMesh().position.x);
    },

    handleClick: function(event) {
        // (1 = left, 2 = middle,3 = right)
        // We want left clicks for the HUD
        if (event.which && event.which === 1) {
            var coords = G.util.getEventCoords(event);
            G.log("clicked HUD", coords);
            //var intersects = G.util.getCoordIntersect(coords.x, coords.y, [this.groundMesh]);

            if (intersects.length > 0) {

            }
        }
    }
});