var G = {};

G.fps = 50;

G.command = {};
G.controller = {};
G.model = {};

G.canvas = null;

G.hero = null;

G.keyL = false;
G.keyR = false;
G.keyD = false;
G.keyU = false;

G.state = -1;

G.overworld = null;
G.homeplot = null;
G.inside = null;

G.mouseX = 0;
G.mouseY = 0;

G.hackAttempt = function(desc,fatal){
  if(fatal){
    alert('redirect them to hacker page');
  }else{
    alert("error: " + desc + " \\n from function: " + arguments.callee.caller);
  }
}

G.initialize = function() {
    G.loadController('MainMenu');
};

G.loadController = function(controllerName) {
    var controller = new G.controller[controllerName+'Controller'];
    controller.init();

    return G.cModule = controller.getModule();
}

G.changeState = function(newState){
  var ns = parseInt(newState);

  if(ns < 0 || ns > 3){
    G.hackAttempt("setState",false);
  }

  console.log("Changing state: " + ns);

  switch(ns){
    case 0:
      G.cModule = G.menu;
    break;
    case 1:
      G.cModule = G.initalizeOverworld();
    break;
    case 2:

    break;
    case 3:

    break;
  }

  this.state = ns;
};

G.initalizeOverworld = function(){
  var o = new Overworld();
  return o;
};

G.setupIO = function(){
  // Get the elements
  G.canvas = document.getElementById("jgame");
  G.context = document.getElementById("jgame").getContext("2d");

  // assign the event listeners
  G.canvas.addEventListener('keydown',   G.handleKeyDown,false);
  G.canvas.addEventListener('keyup',     G.handleKeyUp,  false);
  G.canvas.addEventListener('mousemove', G.handleMouseMove, false);
  G.canvas.addEventListener('click',     G.handleMouseClick,false);
};

G.handleMouseClick = function(e){
  if(G.state == -1)
    return;

  G.cModule.handleClick();

};

G.handleMouseMove = function(e){
  r = G.canvas.getBoundingClientRect();
  G.mouseX = (e.clientX - r.left);
  G.mouseY = (e.clientY - r.top);
};

G.handleKeyUp = function(e){
  switch(e.keyCode){
    case 37:
      //left
      G.keyL = false;
    break;
    case 38:
      //up
      G.keyU = false;
    break;
    case 39:
      //right
      G.keyR = false;
    break;
    case 40:
      G.keyD = false;
    break;
  }
};

G.handleKeyDown = function(e){
  switch(e.keyCode){
    case 37:
      //left
      G.keyL = true;
    break;
    case 38:
      //up
      G.keyU = true;
    break;
    case 39:
      //right
      G.keyR = true;
    break;
    case 40:
      G.keyD = true;
    break;
  }
};

G.canMove = function(dir){


}

G.draw = function() {

  if(G.state == -1)
    return;

  G.cModule.draw(this.context);

};

G.update = function() {
  if (G.cModule.loop) {
      for (var i=0, len=G.cModule.loop.length; i<len; i++) {
          var func = G.cModule.loop[i];
          func(G.context); // Just for now to get the menu working agian
      }
  }

};


