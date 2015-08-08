cordova.define("org.android.tools.suspend.suspend", function(require, exports, module) { 
var plugin = {
    suspendApp: function(successCallback, failureCallback) {
        return cordova.exec(successCallback, failureCallback, 'Suspend', 'suspendApp', []);
    }
};

module.exports = plugin;
});
