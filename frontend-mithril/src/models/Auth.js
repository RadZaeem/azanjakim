import "clientjs"
import {api} from "../api"
import m from "mithril"

export var Auth = {
  user: {},
  client: new ClientJS(),
  fingerprint: "",
  didFBLogin: false,
  didAnonLogin: false,// true,
  usernameDisplay: "",

  getTestToken: function () {
    api.request(
    {
      method: "POST",
      url: api.url+"api-token-auth/",
      data: {"username":"qweqweqwe","password":"qweqweqwe"},
    }
    )
    .then(function(result) {
      api.token(result["token"])
      console.log("update test token: " +api.token())
      return result

    })
  },


  loginOrRegisterFingerprint: function() {
    this.fingerprint = this.client.getFingerprint().toString();
    console.log("using fingerprint " + this.fingerprint )


    m.request ({
      method: "POST",
      url: api.url+"api-token-auth/",
      data: 
      { 
        "username": this.fingerprint,
        "password": "a"+this.fingerprint
      }
      ,
      // background:true
    })
    .then(function (result)  {
      api.token(result["token"])
      console.log("success login with fingerprint")
      // Auth.didFBLogin = true
      Auth.didAnonLogin = true
      return

    })
    .catch( (error) =>  {
      console.log(error)
      console.log("attempt register")
      // register
      m.request({
        method: "POST",
        url: api.url+"rest-auth/registration/",
        data: 
        { 
          "username": this.fingerprint,
          // "email": "",
          "password1": "a"+this.fingerprint,
          "password2": "a"+this.fingerprint,
        },
        // background: true

      })
      .then( function(result)  {
        console.log("successfully registered, token: " + result["token"])
        api.token(result["token"])
        // Auth.didFBLogin = true
        Auth.didAnonLogin = true

      })

    })
  },
  initialize: function(vnode)  {
    // note we added FB SDK load script at index.html
    FB.init({
      appId      : '474493519606356',
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
    });

    FB.getLoginStatus(function(response) {
      console.log("callback FB login: ")
      console.log(response)
      if (response["status"]=="connected") {
        Auth.FBInit(response)
        // return

      }
      else{
        Auth.anonInit()
      }
      // m.redraw()
    // statusChangeCallback(response);
  })
  },
  FBInit: function (response){
    console.log("FBInit using token: "+response.authResponse["accessToken"])
      m.request( {
        method: "POST",
        url: api.url+"rest-auth/facebook/",
        data: {"access_token": response.authResponse["accessToken"]},
        // background:true
      })
      .then((result)=>{ // token still not expired
        console.log("FBInit token received!")
        api.token(result["token"])
        // Auth.didFBLogin = true
        Auth.didFBLogin = true
        Auth.didAnonLogin = false
        Auth.user = result["user"]
        m.redraw()
        console.log("received user info :" + JSON.stringify(Auth.user))
        Auth.usernameDisplay = Auth.user.first_name + " " + Auth.user.last_name
            
        console.log("usernameDisplay changed to: "+Auth.usernameDisplay)
        //force redraw
        // m.redraw()  
        



      })
      .catch((error)=>{
        console.log(error)
        console.log("FBInit failed -- fallback to anonInit")
        Auth.anonInit()
      })
      
    },


  anonInit: function(vnode) {
    console.log("initializing, using token: "+api.token())
    if (api.token()) { //token exist
      console.log("token exist, trying to refresh")
      m.request( {
        method: "POST",
        url: api.url+"api-token-refresh/",
        data: {"token": api.token()},
        // background:true
      })
      .then((result)=>{ // token still not expired
        console.log("token refreshed!")
        // Auth.didFBLogin = true
        Auth.didAnonLogin = true
        // m.redraw()

        })
      .catch((error)=>{
        if (error["non_field_errors"])
          console.log("expired token or invalid")

      })
    }
      else { // get new token
        console.log("no token, logging in...")
        this.loginOrRegisterFingerprint()


      }
    }




  }