function Player(x,y,id) {
  this.x 			=    x;
  this.y 			=    y;
  this.xv 			=    0; // x velocity
  this.yv 			=    0; // y velocity
  this.horzAccel 	= 0.05;
  this.vertAccel    =  0.4;
  this.maxhorzSpeed =    2;
  this.maxvertSpeed =   10;
  this.id = id;
};

Player.prototype.draw = function(context) {
  context.fillRect(this.x, this.y, 30, 30);
};

Player.prototype.stepMove = function(dir){
 var m = (dir == 0) ? 1 : -1;
 this.xv += (this.horzAccel * m);
};

Player.prototype.update = function(){
	this.x += this.xv;
	this.y += this.yv;
}