import "clientjs"
import {api} from "../api"
import m from "mithril"

import {Auth} from "./Auth"
const FBPromise  = require('fb-promise-wrapper')
var moment = require('moment')

import {stateOptions, zoneOptionsForState, getStateByZone} from "./StateZoneData"

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

// mutable data store with destructive functions
// TODO use flux-based architecture, e.g. Redux
export var state = {
  didAuth: null,
  lastLogin: null,
  lastParse: null,
  parsedTimes: null,
  parsedTimesTomorrow: null,
  parsedTimesList: null,
  deltaDay:0,
  tokenAndUser: null,
  coords: null,
  autolocateZone:null,
  doAutolocate: null,//localStorage.getItem('17rakaat-auto') || false,
  allowedAutolocate: null,//()=>{if (navig)},
  state: "KUALA LUMPUR",
  zone: "SGR03",

  dispatch: function(action, args) {
    state[action].apply(state, args || [])
    requestAnimationFrame(function() {
      // //localStorage["todos-mithril"] = JSON.stringify(state.todos)
    })
  },

  initialize: function() {
    // console.log(getStateByZone("JHR01"))
    // console.log(getStateByZone("JHR0"))
    // state.updateCoordsAuto()
    Auth.getTokenAndUserWithFBOrTryFingerprint()
    .then( (result) => {
      console.log(result)
      state.updateUserAndToken(result)
      state.loadLastConfig()
      .then( (result) => {
        //update values
        if (!(Object.keys(result).length === 0 && result.constructor === Object)) {
          state.doAutolocate = result["zone"]["did_autolocate"]
          //localStorage.setItem('17rakaat-auto',state.doAutolocate) 
          var s = result["zone"]["esolat_zone"]["state_name"]
          var z = result["zone"]["esolat_zone"]["code_name"]
          state.setStateAndZone(s,z)
          // state.zone = result["zone"]["esolat_zone"]["code_name"]
        }
        else {
          console.log("empty! -- default to KL, no location")
          state.doAutolocate = false
          state.setStateAndZone("KUALA LUMPUR","SGR03")
        }

        // if (state.doAutolocate) {
          // state.getTimesWithAutolocation()
          state.setAutolocateThenGetTimes(state.doAutolocate)
          .then( (result) => {
            state.updateParsedTimes(result)
            // console.log(state.parsedTimes)
            

          })
        // }
        // else {
        //   console.log("autolocate disabled, zone: "+state.zone)
        //   state.getTimes(null,state.zone)
        //   .then( (result) => {
        //     state.updateParsedTimes(result)            
        //     // console.log(state.parsedTimes)
            

        //   })
        // }
      })
      // state.getTimes().then((result)=> {console.log(result)})
    })
  },

  setStateAndZone: function(s,z) {
    if (s==null) {
      state.state = getStateByZone(z)
      state.zone = z
    }
    else if (z==null) {
      state.state = state
      state.zone = null
    }
    else {
    state.state = s
    state.zone = z
    }
  },

  loadLastConfig: function() {
    return new Promise( function (resolve,reject) { 

      api.request ({
        method: "GET",
      // url: api.url+"api-token-auth/",
      url: api.url+"request-last-parsed-times/"
    })
      .then(function (result)  {
      // resolve(result)
      console.log("last parse found!")
      console.log(result)
      
      // if (!(Object.keys(result).length === 0 && result.constructor === Object)) {
      //   state.doAutolocate = result["zone"]["did_autolocate"]
      //   //localStorage.setItem('17rakaat-auto',state.doAutolocate) 


      //   state.zone = result["zone"]["esolat_zone"]["code_name"]
      // }
      // else {
      //   console.log("empty! -- default to KL, no location")
      //   state.doAutolocate = false
      //   state.setStateAndZone("KUALA LUMPUR","SGR03")
      // }
      resolve(result)

      
    })
    .catch( (error) =>  {
      console.log(error)
      reject(error)

      
    })
  })
  },

  setAutolocateThenGetTimes: function (yes) {
    return new Promise( function (resolve,reject) {
      // document.querySelector('.mdl-js-switch').MaterialSwitch.on()


    if (yes) {
      if (navigator.geolocation) {
        state.getCoordsAuto()
        .then( (coords) => {
          state.coords = coords
          state.doAutolocate = true
          state.allowedAutolocate = true
          // if document.querySelector('.mdl-js-switch')
            document.querySelector('.mdl-js-switch').MaterialSwitch.on()

          //localStorage.setItem('17rakaat-auto',true)
          state.getTimes(state.coords)
          .then( (result) => {
            var s = result["zone"]["esolat_zone"]["state_name"]
            var z = result["zone"]["esolat_zone"]["code_name"]
            state.setStateAndZone(s,z)
            // m.redraw()
            state.autolocateZone = result["zone"]["esolat_zone"]["zone_name"]
            console.log("autolocate enabled")
            resolve(result)
            // console.log(state.parsedTimes)
          })
        })
        .catch( (error) =>{
          state.doAutolocate = false
            if (error.code == 1) {
              state.allowedAutolocate = false
          return state.setAutolocateThenGetTimes(false)

            }
          reject(error)

        })

      }
    }
    else {
      console.log("autolocate disabled")

      state.doAutolocate = false
      // if document.querySelector('.mdl-js-switch')
        document.querySelector('.mdl-js-switch').MaterialSwitch.off()

      //localStorage.setItem('17rakaat-auto',false) 
      state.getTimes(null,state.zone)
          .then( (result) => {
            var s = result["zone"]["esolat_zone"]["state_name"]
            var z = result["zone"]["esolat_zone"]["code_name"]
            state.setStateAndZone(s,z)
            // console.log(document.querySelector('.mdl-switch__input').checked)
            resolve(result)
            
            // console.log(state.parsedTimes)
            

          })

    }

    // if (yes)
})
  },

  getCoordsAuto: function () {
    return new Promise( function (resolve,reject) {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            var coords = {
              "lat":pos.coords.latitude.toString(),
              "lng":pos.coords.longitude.toString()
            }
            resolve(coords)
          },
          (err) => {
            reject(err)
            console.warn(err)

          })
    } 
    })

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

  loadTomorrowTimes: function() {
    return new Promise( function (resolve,reject) { 

    state.getTimes((state.coords) ? state.coords:null,(!state.coords) ? state.zone : null,1,null)
    .then( (result) => {
      state.updateParsedTimes(state.parsedTimes, result)
      resolve(result)
     } )

    })

  },

  getTimes : function (coords, zone, day_delta, date) {
    var data = {} 
    if (coords) data["coords"]=coords //{"lat":"0.0","lng":"0.0"}
    else if (zone) data["zone"] = zone
    if (date) data["date"] = date
    if (day_delta) data["day-delta"] = day_delta // note hypen and underscore
    // console.log(data)

    return new Promise( function (resolve,reject) {
      api.request ({
      method: "POST",
      // url: api.url+"api-token-auth/",
      url: api.url+"request-parsed-times/",
      data: data

    }).then( (result) => {resolve(result)})
      .catch( (error) => {reject(error)})

  })
},
  updateParsedTimes: function (timesJson,timesJsonTomorrow=null) {
    // state.parsedTimes = null
    // state.parsedTimesTomorrow = null
    // m.redraw()
    // state.lastParse = state.parsedTimes
    state.parsedTimes = timesJson
    state.parsedTimesTomorrow = timesJsonTomorrow
    console.log("updated parsedTimes")
    console.log(timesJson)
  },

  updateUserAndToken: function (tokenAndUser) {
    state.tokenAndUser = tokenAndUser
    state.didAuth = true
    api.token(tokenAndUser["token"]) // put token for api calls
    m.redraw() // to update username display
  }
}