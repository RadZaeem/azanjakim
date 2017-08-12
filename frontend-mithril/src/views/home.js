import "clientjs"
import {api} from "../api"
import m from "mithril"
import {Auth}  from "../models/Auth"
import {FBLoginButton} from "./FBLoginButton"
import {state} from "../models/state"
var moment = require('moment');
moment.locale("ms-my")

import mithrilSelect from "mithril-select"
import {stateOptions, zoneOptionsForStates,
 getStateByZone, getZoneOptionsArray} from "../models/StateZoneData"


 
var  colour = ""


var timeStr = "00.00.00"
function updateTime () {
  setInterval(function() {
    // moment.locale("en")
    // timeStr = moment().format('LTS');
    // moment.locale("ms-my")
    timeStr = new Date().toLocaleTimeString()
    m.redraw()

  },1000)
}

var digitalClock = {
  oninit: updateTime,
  
  view: function(vnode) {
    return m("div", timeStr)
  }
}

var geolocationStatus = {

  view: function(vnode) {
    var str = ""
    if (state.allowedAutolocate==false)
      str = "Tiada geolocation. Klik ikon geolocation di address bar untuk reset."
    else if (state.doAutolocate){
      str= "" 
      if (state.autolocateZone)
        str += "Anda berada di: " + state.autolocateZone
    }
    return [
    "Lokasi Automatik: ",
      m("label.switch",
        [m("input[type='checkbox']",
           {onclick: m.withAttr("checked",
             (s)=>{state.setAutolocateThenGetTimes(s)}),
           checked: state.doAutolocate
         }
          ),m("span.slider")]

        ),
      m("p",str)
      ]


  }
}


var stateAndZoneSelect = {
  currentZone: null,
  currentState: null,
  oninit: function () {
    // currentState = state.state
    // currentZone = state.zone
  },
  view: function (vnode) {
    // console.log (state.zone)
    // console.logstate.state)
    var zoneOptions = zoneOptionsForStates[state.state]//getZoneOptionsArray(state.state)

    // var zoneOptions = zoneOptionsForStates[state.state]//getZoneOptionsArray(state.state)
    // console.log(typeof zoneOptions == typeof stateOptions)
    // console.log(zoneOptions)
    return[
      "Tukar Negeri dan Zon: ",
      m("select", { 
        value: state.state,
        onchange: m.withAttr('value', (val) => {
            state.setStateAndZone(val,zoneOptionsForStates[val][0].value)//zoneOptions[0].value)
             // !== "" ?
             //  stateOptions.find(n => n.value === val)!.val
             //  : ""
          })}
        , stateOptions.map(o => m('option', {value: o.value}, o.content))
      ),
      m("p",""),

      m("select", { 
        value: state.zone,
        onchange: m.withAttr('value', (val) => {
            if (val != "null") {
            state.setStateAndZone(state.state, val)
            state.getTimes(null,val)
            .then( (result) => {state.updateParsedTimes(result)})
            console.log(val)
          }
             // !== "" ?
             //  stateOptions.find(n => n.value === val)!.val
             //  : ""
          })}
        , zoneOptions.map(o => m('option', {value: o.value}, o.content))
      ),

   
    ]

  }
}

var parsedTimesTable = {
  oninit: function () {
    // currentState = state.state
    // currentZone = state.zone
  },
  view: function (vnode) {
    return [
   m("table.tg", 
  m("tbody",
    [
      m("tr",
        [
          m("th.tg-yw4l", 
            "Subuh"
          ),
          m("th.tg-yw4l")
        ]
      ),
      m("tr",
        [
          m("td.tg-yw4l", 
            "Syuruk"
          ),
          m("td.tg-yw4l")
        ]
      ),
      m("tr",
        [
          m("td.tg-yw4l", 
            "Zuhur"
          ),
          m("td.tg-yw4l")
        ]
      ),
      m("tr",
        [
          m("td.tg-yw4l", 
            "Asar"
          ),
          m("td.tg-yw4l")
        ]
      ),
      m("tr",
        [
          m("td.tg-yw4l", 
            "Maghrib"
          ),
          m("td.tg-yw4l")
        ]
      ),
      m("tr",
        [
          m("td.tg-yw4l", 
            "Isha"
          ),
          m("td.tg-yw4l")
        ]
      )
    ]
  )
)
    ]
  }
}


export var home = {
  oninit: function (){

    // state.
    //Auth.getTokenAndUserWithFBOrTryFingerprint().then( (result) => {console.log(result)})
  },



  view: function (vnode) {
    // return m(Counter)
    return [
    m(digitalClock),
    m("div",moment().format(" LL")),
    m(geolocationStatus),
    m(stateAndZoneSelect)
    // m(mithrilSelect, {
    //   options: stateOptions,
    //   // A CSS class to add to the root element of the select
    //   // class: 'my-select',
    //   // Respond to selection changes
    //   onchange: (val) => {
    //     colour = val != null
    //       ? stateOptions.find(c => c.value === val).content : ""
    //     console.log(colour)
    //   }
    // })
    ]
  //   m("label.switch",
  // [
  //   m("input[type='checkbox']"),
  //   m("span.slider")
  // ]
// )
    // ]
  } 
}


// var timeStr = "00:00:00"
// function addZero(i) {
//     if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
//     return i
//   }

// function updateTime () {
//   setInterval(function() {
//   var today = new Date();
//     var h = addZero(today.getHours());
//     var mi = addZero(today.getMinutes());
//     var s = addZero(today.getSeconds());
//     var h12 = (h>12) ? h-12: h
//     var ampm = (h>=12) ? "PM" : "AM"
//    timeStr= h12 + ":" + mi + ":" + s + " "+ ampm
//    m.redraw()
// },500)
// }