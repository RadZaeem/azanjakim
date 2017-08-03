// src/models/User.js
var m = require("mithril")
require("clientjs")
// Create a new ClientJS object

var api = require("../api")

var Auth = {
    user: {},
    
    client: new ClientJS(),

    // ask API if already logged in
    isLoggedIn: function() {
        m.request( {
            method: "GET",
            url: "http://127.0.0.1:8000/user/",
        })
        .then(function(result) {
            console.log(result)
            // django rest auth give "details" key if not logged in
            if ("detail" in result) {
                return false
            } //  {pk,username,email,first_name, last_name}
            else {
                return result
            }
        })
    },

    testToken: function() {
      
    }

    loginFingerprint: function() {

    },

    loginFacebook: function() {

    },
    // django-rest-auth register username,password with fingerprint
    registerFingerprint: function() {
    }
    // loadList: function() {
    //     return m.request({
    //         method: "GET",
    //         url: "https://rem-rest-api.herokuapp.com/api/users",
    //         withCredentials: true,
    //     })
    //     .then(function(result) {
    //         User.list = result.data
    //     })
    // },

    // current: {},
    // load: function(id) {
    //     return m.request({
    //         method: "GET",
    //         url: "https://rem-rest-api.herokuapp.com/api/users/" + id,
    //         withCredentials: true,
    //     })
    //     .then(function(result) {
    //         User.current = result
    //     })
    // },

    // save: function() {
    //     return m.request({
    //         method: "PUT",
    //         url: "https://rem-rest-api.herokuapp.com/api/users/" + User.current.id,
    //         data: User.current,
    //         withCredentials: true,
    //     })
    // }
}

module.exports = Auth