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
        console.log("No FB Login, Trying using fingerprint")
        console.log(response)
        var client = new ClientJS()
        var fingerprint = client.getFingerprint().toString(16);
        // console.log(typeof client.getFingerprint().toString(16))
        Auth.getTokenAndUserWithFingerprint(fingerprint)
        .then(function(tokenAndUser) {
          // console.log(tokenAndUser)
          resolve(tokenAndUser)
        })
        .catch((error) => {console.log(error)})
      })
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


  getTokenAndUserWithFingerprint: function(fingerprint){
    return new Promise(function(resolve,reject)   {
    console.log("using fingerprint " + fingerprint )


    api.request ({
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
      resolve(result)
      console.log("success login with fingerprint")
    })
    .catch( (error) =>  {
      console.log(error)
      console.log("attempt register")
      api.request({
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
    console.log("FBInit using Facebook API token: " + FBToken)
      api.request( {
        method: "POST",
        url: api.url+"rest-auth/facebook/",
        // data: {"access_token": response.authResponse["accessToken"]},
        data: {"access_token": FBToken},        
        // background:true 
      })
      .then((result)=>{ // token still not expired
        resolve(result);

      })
      .catch((error)=>{
        console.log(error)
        reject(error)
      })
    })  
    },


  getRefreshedToken: function(token) {  
    return new Promise(function(resolve,reject)   {
      console.log("token exist, trying to refresh")
      
      api.request( {
        method: "POST",
        url: api.url+"api-token-refresh/",
        data: {"token": token},
        // background:true
      })
      .then((result)=>{ // token still not expired
        console.log("token refreshed!")
        resolve(token)

        })
      .catch((error)=>{
        if (error["non_field_errors"]) {
          reject({"error":"expired token or invalid"})
        }

      })


      })
    }



  } 