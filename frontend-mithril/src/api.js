import m from "mithril"
var Cookies = require('js-cookie')


export var api = {
  // url: "https://localhost:8000/", //change in production, put in config file
  url: "https://misza.herokuapp.com/", //change in production, put in config file

  // isAnon: true,
  // enableAutolocate: false,

request: function(options){
  options.config = function(xhr) {
    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
    xhr.setRequestHeader('X-CSRFToken', csrftoken ) 

    console.log("api csrf: "+csrftoken)
    if (!api.token()) return
    xhr.setRequestHeader('Authorization', 'JWT ' + api.token())
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest') 
    // var csrftoken = Cookies.get('csrftoken');
    
    // xhr.setRequestHeader('X-CSRFToken', csrftoken ) 
// X-CSRFToken
    // headers: {'X-CSRF-TOKEN': 'whatever'}
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
},

autolocate: function(value){
  if (arguments.length)
    localStorage.setItem('autolocate', value)

  return localStorage.getItem('autolocate')
}
}

// m.request({
//   method: "GET",
//   url: "/some/url/", 
//   config: function(xhr) {
//     xhr.setRequestHeader("Authorization", "".concat("Token ", API_TOKEN));
//   }
// });

