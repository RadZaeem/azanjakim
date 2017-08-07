import "clientjs"
import {api} from "../api"
import m from "mithril"
import {FBPromise} from "fb-promise-wrapper"
export var Auth = {

  getTokenAndUserWithFBOrAnonFallback: function() {
    return new Promise( function (resolve,reject) {
      var tokenAndUser = null;//{ "token": null, "user": null}

    // var tokenAndUser = { token: null, user: null}
    // var tokenAndUser = null;//this.getTokenAndUserWithFBLoginCallback()
    // if (tokenAndUser==null) {
    //   tokenAndUser = { token: null, user: null}
      // if (api.token())
      //   Auth.getRefreshedToken(api.token())
      // .then(function(token) {
      //   tokenAndUser["token"] = token
      //   tokenAndUser["user"] = {"username":}
      //   console.log("token is "+token)
      //   resolve(token) 
      // })
      // .catch(function(token) {
                // console.time()
        // var fingerprint = client.getFingerprint()//.toString();
        // console.timeEnd()
        // fingerprint = fingerprint.toString();

        var client = new ClientJS()
        console.time()
        var fingerprint = client.getFingerprint().toString();
        console.timeEnd()
        fingerprint = fingerprint.toString();
        Auth.getTokenAndUserByFingerprint(fingerprint)
        .then(function(tokenAndUser) {
          // console.log(tokenAndUser)
          resolve(tokenAndUser)
        })

      })
        // var client = new ClientJS()
        // var fingerprint = client.getFingerprint().toString();
        // tokenAndUser.token = this.getTokenByFingerprint(fingerprint)

    
  // } )
  }, 

  getTokenAndUserWithFBLoginCallback: function(){
    FB.getLoginStatus(function(response) {
      console.log("callback FB login: ")
      console.log(response)
      if (response["status"]=="connected") {
        return getTokenAndUserWithFBToken(response.authResponse["accessToken"])
      }
      else{
        return null
      }
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

  getTokenAndUserByFingerprint: function(fingerprint){
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

    // console.log("FBInit using Facebook API token: "+response.authResponse["accessToken"])
      m.request( {
        method: "POST",
        url: api.url+"rest-auth/facebook/",
        // data: {"access_token": response.authResponse["accessToken"]},
        data: {"access_token": FBToken},
        
        background:true 
      })
      .then((result)=>{ // token still not expired
        console.log("FBInit JWT token received!")
        return result;

        // api.token(result["token"])
        // Auth.user = result["user"]
        // Auth.usernameDisplay = Auth.user.first_name + " " + Auth.user.last_name
      })
      .catch((error)=>{
        console.log(error)
        reject(error)
        // return Auth.getRefreshedTokenOrNew()
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