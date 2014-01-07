
G.controller.MainMenuController = (function(Game){

    var menu;
    var scene;

    var init = function() {
        scene = new MainMenuScene();
        menu = new MainMenu();

        scene.add(MainMenu);
    }

    var loop = function(context) {
        // something..
    }


    return {
        scene: scene
    };

})(G);