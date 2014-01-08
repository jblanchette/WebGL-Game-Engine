G.controller.OverworldController = function(){

    this.init = function() {
        this.module = new Overworld();
    }

    this.getModule = function() {
        return this.module;
    }
};