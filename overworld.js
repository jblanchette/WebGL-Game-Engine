
function Overworld(){
  this.state = -1;
  this.zoneID = -1;
  
  this.getWorldData();

}

Overworld.prototype.update = function(){

  

};

Overworld.prototype.getWorldData = function(){

};

Overworld.prototype.changeState = function(newState){

};

Overworld.prototype.draw = function(context){
  context.clearRect(0, 0, 640, 480);
  context.fillStyle = "black";
  context.font = "bold 14px Verdana";

  context.fillText("Overworld initating...",100,100);
};