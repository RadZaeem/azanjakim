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

  getTimes : function (coords={lat:0.0,lng:0.0}, doAutolocate=false) {

    return new Promise( function (resolve,reject) {

    })

  }

  updateUserAndToken: function (tokenAndUser) {
    Auth.tokenAndUser = tokenAndUser
    Auth.didAuth = true
    api.token(tokenAndUser["token"])
  }
}