var m = require("mithril")
require("clientjs")
// Create a new ClientJS object
var client = new ClientJS();

// Get the client's fingerprint id
var fingerprint = client.getFingerprint();

// var api = {
//  request = function(options) {
//   options.config = function(xhr) {
//     xhr.setRequestHeader('Authorization', 'Bearer ' + api.token())
//     xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')  
//   }
//   m.request(options)
// },

// token = function(value) {
//   if (arguments.length)
//     localStorage.setItem('token', value)

//   return localStorage.getItem('token')
// }
var api = require("../api")
api.request(
{
            method: "POST",
            url: "http://127.0.0.1:8000/api-token-auth/",
            data: {"username":"qweqweqwe","password":"qweqweqwe"},
            withCredentials: false
            // config: function(xhr) {

            // }

        }
)
.then(function(result) {
    api.token(result["token"])
    console.log(api.token())

})

module.exports = {
    view: function(vnode) {
        return m("main.layout", [
            m("nav.menu", [
                m("a[href='/list']", {oncreate: m.route.link}, "Users")
            ]),
            m("section", vnode.children),
            m("h1", "your fingerprint: " + fingerprint)
        ])
    }
}