
(function(Game){

    var menu;
    var scene = new MainMenuScene();

    var init = function() {
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