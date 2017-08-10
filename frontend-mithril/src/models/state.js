import "clientjs"
import {api} from "../api"
import m from "mithril"

import {Auth} from "./Auth"
const FBPromise  = require('fb-promise-wrapper')
var moment = require('moment')

// mutable data store with destructive functions
// TODO use flux-based architecture, e.g. Redux
export var state = {
  didAuth: null,
  lastLogin: null,
  todayTimes: null,
  tomorrowTimes: null,
  tokenAndUser: null,
  coords: null,
  doAutolocate: null,
  allowedAutolocate: null,//()=>{if (navig)},
  zone: null,

  dispatch: function(action, args) {
    state[action].apply(state, args || [])
    requestAnimationFrame(function() {
      // localStorage["todos-mithril"] = JSON.stringify(state.todos)
    })
  },

  initialize: function() {
    // state.updateCoordsAuto()
    Auth.getTokenAndUserWithFBOrTryFingerprint()
    .then( (result) => {
      console.log(result)
      state.updateUserAndToken(result)
      state.getLastConfig()
    })
  },

  getLastConfig: function() {
    api.request ({
      method: "GET",
      // url: api.url+"api-token-auth/",
      url: api.url+"request-last-parsed-times/"
    })
    .then(function (result)  {
      // resolve(result)
      console.log(result)
      if (!(Object.keys(result).length === 0 && result.constructor === Object)) {
        state.doAutolocate = result["zone"]["did_autolocate"]
        state.zone = result["zone"]["esolat_zone"]["code_name"]
      }
      else {
        console.log("empty!")
        state.doAutolocate = false
        state.zone = "SGR02"
      }

      
    })
    .catch( (error) =>  {
      console.log(error)

      
    })
  },

  setAutolocate: function (yes) {
    if (yes) {
      if (navigator.geolocation) {
        state.updateCoordsAuto()
      }
    }
    else
      state.doAutolocate = false

  },

  updateCoordsAuto: function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            state.coords = {
              "lat":pos.coords.latitude.toString(),
              "lng":pos.coords.longitude.toString()
            }
            state.doAutolocate = true
            state.allowedAutolocate = true
            console.log(state.coords)
          },
          (err) => {
            state.doAutolocate = false
            if (err.code == 1)
              state.allowedAutolocate = false
            console.warn(err)

          })
    } 
  },

  updateCoordsManual: function(lat,lng) {
    state.coords = {
              "lat":lat.toString(),
              "lng":lat.toString()
            }

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

  getTimes : function (coords, zone="SGR02", date=null, day_delta = null) {
    var data = {} 
    if (coords) data["coords"]=coords //{"lat":"0.0","lng":"0.0"}
    else if (zone) data["zone"] = zone
    if (date) data["date"] = date
    if (day_delta) data["day-delta"] = day_delta // note hypen and underscore

    return new Promise( function (resolve,reject) {
      api.request ({
      method: "POST",
      // url: api.url+"api-token-auth/",
      url: api.url+"request-parsed-times/",
      data: data

    })

  })
},

  updateUserAndToken: function (tokenAndUser) {
    state.tokenAndUser = tokenAndUser
    state.didAuth = true
    api.token(tokenAndUser["token"]) // put token for api calls
    m.redraw() // to update username display
  }
}