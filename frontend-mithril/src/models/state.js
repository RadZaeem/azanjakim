import "clientjs"
import {api} from "../api"
import m from "mithril"

import {Auth} from "./Auth"
const FBPromise  = require('fb-promise-wrapper')

export var state = {
  didAuth: null,
  lastLogin: null,
  todayTimes: null,
  tomorrowTimes: null,
  tokenAndUser: null,
  coords: null,
  doAutolocate: null,
  zone: null,

  dispatch: function(action, args) {
    state[action].apply(state, args || [])
    requestAnimationFrame(function() {
      // localStorage["todos-mithril"] = JSON.stringify(state.todos)
    })
  },

  initialize: function() {
    Auth.getTokenAndUserWithFBOrTryFingerprint()
    .then( (result) => {
      console.log(result)
      state.updateUserAndToken(result)
    })
  },

  getTimesWithAutolocation: function () {
    // get coords first
    return new Promise( function (resolve,reject) {
      
    })
  },

  getTimesWithZone: function () {
    // get coords given component
    return new Promise( function (resolve,reject) { 
    })
  },

  getTimes : function (coords, zone="SGR02", doAutolocate=false) {
    var coordsOrZone = {} //{"lat":0.0,"lng":0.0}
    if (coords) {
      coordsOrZone["coords"]=coords
    } 
    else if (zone) { // default to KL
      coordsOrZone["zone"] = zone
    }

    return new Promise( function (resolve,reject) {
      api.request ({
      method: "POST",
      // url: api.url+"api-token-auth/",
      url: api.url+"request-parsed-times/",
      data: coordsOrZone

    })

  })
},

  updateUserAndToken: function (tokenAndUser) {
    state.tokenAndUser = tokenAndUser
    state.didAuth = true
    api.token(tokenAndUser["token"])
    m.redraw() // to update username display
  }
}