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
    url: api.url+"api-token-auth/",
    data: {"username":"qweqweqwe","password":"qweqweqwe"},
}
)
.then(function(result) {
    api.token(result["token"])
    console.log("update token: " +api.token())
    return result

})
.then(function(result) {
    //result.token = "gg"
    api.request( {
        method: "POST",
        url: api.url+"api-token-refresh/",
        data: result
    }).
    then(function(result) {
        console.log("succeeded verify")
        console.log(result)
    }).
    catch(function(error){
        if (error["non_field_errors"])
            console.log("expired token or invalid")

    })


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