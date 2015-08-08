cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.network-information/www/network.js",
        "id": "org.apache.cordova.network-information.network",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.network-information/www/Connection.js",
        "id": "org.apache.cordova.network-information.Connection",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins/net.yoik.cordova.plugins.screenorientation/www/screenorientation.js",
        "id": "net.yoik.cordova.plugins.screenorientation.screenorientation",
        "clobbers": [
            "cordova.plugins.screenorientation"
        ]
    },
    {
        "file": "plugins/net.yoik.cordova.plugins.screenorientation/www/screenorientation.android.js",
        "id": "net.yoik.cordova.plugins.screenorientation.screenorientation.android",
        "merges": [
            "cordova.plugins.screenorientation"
        ]
    },
    {
        "file": "plugins/org.android.tools.suspend/www/suspend.js",
        "id": "org.android.tools.suspend.suspend",
        "clobbers": [
            "window.plugins.Suspend"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.network-information": "0.2.15",
    "net.yoik.cordova.plugins.screenorientation": "1.3.4",
    "org.android.tools.suspend": "0.1.2"
}
// BOTTOM OF METADATA
});