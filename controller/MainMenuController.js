
G.controller.MainMenuController = (function(Game){

    var menu;
    var scene;

    var init = function() {
        scene = new MainMenuScene();
        menu = new MainMenu();

        scene.add(MainMenu);
    }

    var getModule = function() {
        return {
            scene: scene,
            loop: [menu.loop],
            destroy: true
        };
    }

})(G);