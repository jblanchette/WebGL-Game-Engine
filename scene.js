function Scene(){
    this.objects = [];
}

Scene.prototype.add = function(o){
    o.sceneID = this.objects.length;
    this.objects.push(o);
};

Scene.prototype.remove = function(sceneID){
    this.objects.splice(sceneID,1);
}