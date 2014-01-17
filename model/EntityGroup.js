G.model.EntityGroup = Class.create({
    initialize: function() {
        this.members = [];
        this.needsUpdate = [];
    },
    
    addMember: function(E){
        this.members.push(E);
        this.needsUpdate.push(E);
        G.cModule.addUpdate(this);
    },

    update: function() {
        for(var i = 0; i < this.needsUpdate.length; i++){
            // should be an entity who has an update function
            this.needsUpdate[i].update();
        }
    }
});