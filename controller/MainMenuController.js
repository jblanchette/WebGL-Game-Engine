
G.controller.MainMenuController = function(){

    this.init = function() {
        this.menu = new Menu();
    }

    this.getModule = function() {
        return {
            loop: [this.menu.update.bind(this.menu)],
            destroy: true
        };
    }
};