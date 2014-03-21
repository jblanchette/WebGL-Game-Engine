// Utilities

// Replaces {#} in a given string.
// So "Hello {0}".format("Johnson") => "Hello Johnson"
// From stackoverflow
String.prototype.format = function() {
    var result = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        result = result.replace(regexp, arguments[i]);
    }
    return result;
};

G.util.getCoordIntersect = function(x, y, objects) {
    var camera = Router.getCurrent().getCamera();
    var vector = new THREE.Vector3((x / 1600) * 2 - 1, -(y / 900) * 2 + 1, 0.5);
    G.projector.unprojectVector(vector, camera);

    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    var intersects = raycaster.intersectObjects(objects);

    return intersects;
}
// This exists because JavaScript's modulo doesn't
// behave the way we want it to for negative numbers.
// Taken from http://javascript.about.com/od/problemsolving/a/modulobug.htm
G.util.fixRotation = function(degrees) {
    G.log("fixRot",degrees);
    return ((degrees % 360) + 360) % 360;
}

G.util.getEventCoords = function(event) {
    var rect = G.renderer.domElement.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}