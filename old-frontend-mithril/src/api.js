m = require("mithril")

var api = {
url: "http://127.0.0.1:8000/",
request: function(options){
  options.config = function(xhr) {
    xhr.setRequestHeader('Authorization', 'Bearer ' + api.token())
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest') 
    // xhr.setRequestHeader('Access-Control-Allow-Headers', 'Authorization')
    // xhr.setRequestHeader('Access-Control-Allow-Methods', 'POST')
    // xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8000/') 

  }
  return m.request(options)
},

token: function(value){
  if (arguments.length)
    localStorage.setItem('token', value)

  return localStorage.getItem('token')
}
}

module.exports = api
// m.request({
//   method: "GET",
//   url: "/some/url/", 
//   config: function(xhr) {
//     xhr.setRequestHeader("Authorization", "".concat("Token ", API_TOKEN));
//   }
// });

