G.DebugBox = {};
G.DebugBox.initialize = function(rate) {
    G.log("init dbug box");
    // refresh rate for the setInterval
    if (arguments.length == 0) {
        this.rate = 500;
    } else {
        this.rate = rate;
    }
    this.db = document.getElementById("debugBox");
    this.entries = [];
    this.running = false;
    this.timer = null;
};
G.DebugBox.addEntry = function(msg, vars) {
    // Formats the msg by using the given vars as replacements
    this.entries.push([msg, vars]);

};

G.DebugBox.getEntries = function(){
    return this.entries;
};
G.DebugBox.getRate = function(){
    return this.rate;
};
G.DebugBox.clear = function() {
    this.entries = [];
};
G.DebugBox.update = function() {
    var result = "";
    var e;

    for (var i = 0; i < this.entries.length; i++) {
        e = this.entries[i];
        G.log("e",e[0],e[1]);
        if (e.length == 0) {
            result += "<li>" + e[0] + "</li>";
        } else {
            result += "<li>" + e[0].format(e[1]) + "</li>";
        }
    }
    this.db.innerHTML = "Entries<br/><ul>" + result + "</ul>";

};
G.DebugBox.on = function() {
    G.log("turned on dbug box",G.DebugBox.getRate());
    this.running = true;
    this.timer = setInterval(function(){ G.DebugBox.update() },G.DebugBox.getRate());


};
G.DebugBox.off = function() {
    if (this.running) {
        this.running = false;
        clearInterval(G.DebugBox.timer);
    }
};
