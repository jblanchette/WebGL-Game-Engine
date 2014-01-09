// Utilities

G.util.getCoordIntersect = function(x, y, objects) {
    var camera = G.cModule.getCamera();
    var vector = new THREE.Vector3((x/1600)*2-1, -(y/900)*2+1, 0.5);
    G.projector.unprojectVector(vector, camera);

    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    var intersects = raycaster.intersectObjects(objects);

    return intersects;
}