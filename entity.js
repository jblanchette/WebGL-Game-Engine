function Entity(x,y,id) {
  this.x = x;
  this.y = y;
  this.id = id;
  this.updateFunc = null;
  this.drawFunc = null;

};

Entity.prototype.draw = function(context) {
  if(this.drawFunc == null){
    context.fillRect(this.x, this.y, 30, 30);
  }else{
    this.drawFunc.call(this,context);
  }
};

Entity.prototype.update = function() {
  if(this.updateFunc != null){
    this.updateFunc.call(this,context);
  }
};