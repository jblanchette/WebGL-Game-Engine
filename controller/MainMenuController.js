
G.controller.MainMenuController = (function(Game){

    var menu;
    var scene;

    var init = function() {
        scene = new MainMenuScene();
        menu = new MainMenu();

        scene.add(MainMenu);
    }

    var render = function(context) {
        // If you need to make custom adjustments do it here
        // this will be passed in anytime the scene is rendered
    }


    return {
        scene: scene,
        render: render,
        destroy: true
    };

})(G);