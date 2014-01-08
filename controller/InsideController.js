G.controller.InsideController = function(){

    this.init = function() {
        this.module = new Inside();
    }

    this.getModule = function() {
        return this.module;
    }
};