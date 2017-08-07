import "clientjs"
import {api} from "../api"
import m from "mithril"
const FBPromise  = require('fb-promise-wrapper')

// import {FBPromise} from "fb-promise-wrapper"
export var Auth = {

  getTokenAndUserWithFBOrTryFingerprint: function() {
    return new Promise( function (resolve,reject) {
      Auth.getTokenAndUserWithFBLogin()
      .then( (tokenAndUser) => {resolve(tokenAndUser)})
      .catch( (response) => {
        console.log(response)
        var client = new ClientJS()
        var fingerprint = client.getFingerprint().toString(16);
        // console.log(typeof client.getFingerprint().toString(16))
        Auth.getTokenAndUserWithFingerprint(fingerprint)
        .then(function(tokenAndUser) {
          // console.log(tokenAndUser)
          resolve(tokenAndUser)
        })
      })

        // var client = new ClientJS()
        // var fingerprint = client.getFingerprint().toString(16);
        // // console.log(typeof client.getFingerprint().toString(16))
        // Auth.getTokenAndUserWithFingerprint(fingerprint)
        // .then(function(tokenAndUser) {
        //   // console.log(tokenAndUser)
        //   resolve(tokenAndUser)
        // })

      })
  }, 

  getTokenAndUserWithFBLogin: function(){
    return new Promise( function (resolve,reject) {
    FBPromise.getLoginStatus().then((response) => {
      if (response["status"]=="connected") 
          Auth.getTokenAndUserWithFBToken(response.authResponse["accessToken"])//.then( (result) => {})
          .then( (result) => {resolve(result)})
      else reject(response)
      // resolve(response)
    })
  })

  },

  // getTestToken: function () {
  //   api.request(
  //   {
  //     method: "POST",
  //     url: api.url+"api-token-auth/",
  //     data: {"username":"qweqweqwe","password":"qweqweqwe"},
  //   }
  //   )
  //   .then(function(result) {
  //     // api.token(result["token"])
  //     // console.log("update test token: " +api.token())
  //     return result["token"]

  //   })
  // },

  getTokenAndUserWithFingerprint: function(fingerprint){
    return new Promise(function(resolve,reject)   {
  //this.fingerprint = this.client.getFingerprint().toString();
    console.log("using fingerprint " + fingerprint )


    m.request ({
      method: "POST",
      // url: api.url+"api-token-auth/",
      url: api.url+"rest-auth/login/",
      data: 
      { 
        "username": fingerprint,
        "password": "a"+fingerprint
      }
      ,
      // background:true
    })
    .then(function (result)  {
      // api.token(result["token"])
      resolve(result)
      console.log("success login with fingerprint")
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
          "username": fingerprint,
          // "email": "",
          "password1": "a"+fingerprint,
          "password2": "a"+fingerprint,
        },
        // background: true

      })
      .then( function(result)  {
        console.log("successfully registered, token: " + result["token"])
        resolve(result)
      })
      .catch( (error) => { reject({"error":"Failed to register fingerprint"})})

    })
  })
  },
  
  getTokenAndUserWithFBToken: function (FBToken){
return new Promise(function(resolve,reject)   {
    // console.log("FBInit using Facebook API token: "+response.authResponse["accessToken"])
      m.request( {
        method: "POST",
        url: api.url+"rest-auth/facebook/",
        // data: {"access_token": response.authResponse["accessToken"]},
        data: {"access_token": FBToken},
        
        background:true 
      })
      .then((result)=>{ // token still not expired
        // console.log("FBInit JWT token received!")
        resolve(result);

        // api.token(result["token"])
        // Auth.user = result["user"]
        // Auth.usernameDisplay = Auth.user.first_name + " " + Auth.user.last_name
      })
      .catch((error)=>{
        console.log(error)
        reject(error)
        // return Auth.getRefreshedTokenOrNew()
      })
    })  
    },


  getRefreshedToken: function(token) {  
    return new Promise(function(resolve,reject)   {
      console.log("token exist, trying to refresh")
      
      m.request( {
        method: "POST",
        url: api.url+"api-token-refresh/",
        data: {"token": token},
        // background:true
      })
      .then((result)=>{ // token still not expired
        console.log("token refreshed!")
        resolve(token)
        // m.redraw()

        })
      .catch((error)=>{
        if (error["non_field_errors"]) {
          // console.log("expired token or invalid")
          reject({"error":"expired token or invalid"})
        }

      })


      })
    }
    
      // m.redraw()
    
    // m.redraw()




  } 