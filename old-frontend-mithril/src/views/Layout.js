var m = require("mithril")
require("clientjs")
// Create a new ClientJS object
var client = new ClientJS();

// Get the client's fingerprint id
var fingerprint = client.getFingerprint();

// TEST
var Auth = require("../models/Auth")
console.log("Auth says that "+Auth.client.getFingerprint());
var api = require("../api")
api.request(
{
            method: "POST",
            url: "http://127.0.0.1:8000/api-token-auth/",
            data: {"username":"qweqweqwe","password":"qweqweqwe"},
        }
)
.then(function(result) {
    api.token(result["token"])
    console.log(api.token())

})

//console.log(Auth.isLoggedIn())
// end TEST
module.exports = {
    view: function(vnode) {
        return m("main.layout", [
            m("nav.menu", [
                m("a[href='/list']", {oncreate: m.route.link}, "Users")
            ]),
            m("section", vnode.children),
            m("h1", "your fingerprint: " + fingerprint),
            m("fb:login-button")// scope="public_profile,email" onlogin="checkLoginState();">
        ])
    }
}