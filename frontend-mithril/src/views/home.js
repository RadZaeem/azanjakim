import HijriDate,{toHijri} from 'hijri-date/lib/safe'
import "clientjs"
import {api} from "../api"
import m from "mithril"
import {Auth}  from "../models/Auth"
import {FBLoginButton} from "./FBLoginButton"
import {AuthStatus} from "./AuthStatus"
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
    var c = state.doAutolocate ? true : false
    if (state.allowedAutolocate==false)
      str = "Tiada geolocation. Klik ikon geolocation di address bar untuk reset."
    else if (state.doAutolocate){
      str= "" 
      if (state.autolocateZone)
        str += "Anda berada di: " + state.autolocateZone
    }
    return [
    // "Lokasi Automatik: ",
      // m("label.mdl-switch.mdl-js-switch[for='switch-1']",
      
      // m("label.mdl-switch",//.mdl-js-switch[for='switch-1']",
  // [ // call .on() and .off() hack to make MDL work
    // (c) ?
    [
  m(".mdc-switch",
    [
      m("input.mdc-switch__native-control[id='basic-switch'][type='checkbox']",
        {onclick: m.withAttr("checked",
             (s)=>{state.setAutolocateThenGetTimes(s).then( (result) => {
              state.updateParsedTimes(result,null); // clear tomorrow times also.


             })}),
 
       checked: state.doAutolocate
         }),
      m(".mdc-switch__background", 
        m(".mdc-switch__knob")
      )
    ]
  ), 
  m("label.mdc-switch-label[for='basic-switch']", 
    "Lokasi Auto | " + str
  )
],

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
        m(".input-field.col.s12",
      m("select.mdc-select", { 
        value: state.state,
        onchange: m.withAttr('value', (val) => {
          if (val=="null") return
          state.setStateAndZone(val,zoneOptionsForStates[val][0].value)//zoneOptions[0].value)
             // !== "" ?
             //  stateOptions.find(n => n.value === val)!.val
             //  : ""
          })}
        , stateOptions.map(o => m('option', {value: o.value}, o.content))
      )),
      m("p",""),

      m("select.mdc-select", { 
        value: state.zone,
        onchange: m.withAttr('value', (val) => {
            if (val != "null") {
            state.setStateAndZone(state.state, val)
            state.getTimes(null,val)
            .then( (result) => {state.updateParsedTimes(result);m.redraw()})
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

var ParsedTimesTable = {
  oninit: function () {
    // currentState = state.state
    // currentZone = state.zone
  },
  view: function (vnode) {
    var today = vnode.attrs.today
    var tomorrow = vnode.attrs.tomorrow
    if (!today) return null

    var dateToday = moment(today["date_time_parsed"]).format("dddd, D/M")

    var dateTomorrow = null
    if (tomorrow)
      dateTomorrow = moment(tomorrow["date_time_parsed"]).format("dddd, D/M")

    var keys = ["subuh", "syuruk", "zuhur", "asar", "maghrib", "isha"]
    var times = [today]
    if (tomorrow) times.push(tomorrow)

    // for (var k in keys) {
    //   var h = today[k].
    //   today[k] = moment(today[k]) 
    // }
    // moment.locale("en")
    times.forEach( (time) => {
      keys.forEach( (key) => {
        var h = time[key].slice(0,2)
        var m = time[key].slice(3,5)

        time[key] = moment({h:h, m:m}).format("hh:mm")
        // if (time[key].charAt(0) == "0") 
          // time[key] = time[key].slice(1,time[key].length)
        
      })
    } )
    // moment.locale("ms-my")
return [
   m("table.tg", 
   // m("table.mdl-data-table.mdl-js-data-table.mdl-data-table--selectable mdl-shadow--2dp", 
  m("tbody",
    [m("tr",
        [
        
          m("th.tg-yw4l", 
            "Waktu\\Tarikh"
          ),
          m("th.tg-yw4l", dateToday),
          (tomorrow) ? 
          m("th.tg-yw4l", dateTomorrow)
          : m("button.mdc-button.mdc-button--raised.mdc-button--primary.mdc-ripple-surface[data-mdc-auto-init='MDCRipple'][type='submit']", 
{
          onclick: () => {
          state.loadTomorrowTimes().then( (result) => {} )}},"esok")
        ]
      )]),
  m("tbody",
    [
    
      m("tr", 
        [
          m("td.tg-yw4l", 
            "Subuh"
          ),
          m("td.tg-yw4l",today["subuh"]),
          (tomorrow) ? 
          m("td.tg-yw4l",today["subuh"])
          : null
        ]
      ),
      m("tr",
        [
          m("td.tg-yw4l", 
            "Syuruk"
          ),
          m("td.tg-yw4l",today["syuruk"]),
          (tomorrow) ? 
          m("td.tg-yw4l",today["syuruk"])
          : null
        ]
      ),
      m("tr",
        [
          m("td.tg-yw4l", 
            "Zuhur"
          ),
          m("td.tg-yw4l", today["zuhur"]),
          (tomorrow) ? 
          m("td.tg-yw4l",today["zuhur"])
          : null
        ]
      ),
      m("tr",
        [
          m("td.tg-yw4l", 
            "Asar"
          ),
          m("td.tg-yw4l", today["asar"]),
          (tomorrow) ? 
          m("td.tg-yw4l",today["asar"])
          : null
        ]
      ),
      m("tr",
        [
          m("td.tg-yw4l", 
            "Maghrib"
          ),
          m("td.tg-yw4l", today["maghrib"]),
          (tomorrow) ? 
          m("td.tg-yw4l",today["maghrib"])
          : null
        ]
      ),
      m("tr",
        [
          m("td.tg-yw4l", 
            "Isyak"
          ),
          m("td.tg-yw4l", today["isha"]),
          (tomorrow) ? 
          m("td.tg-yw4l",today["isha"])
          : null
        ]
      )
    ]
  )
)
    ]
    
    
  }
}

export var ParsedTimesView = {
  view: function (vnode) {
    // console.log(state.parsedTimes)
    return [
      state.parsedTimes ?  [
        m(ParsedTimesTable, {today: state.parsedTimes, tomorrow: state.parsedTimesTomorrow}),
        !state.parsedTimesTomorrow ?
        null
//         m("button.mdc-button.mdc-button--raised.mdc-button--primary.mdc-ripple-surface[data-mdc-auto-init='MDCRipple'][type='submit']", 
// {
//           onclick: () => {
//           state.loadTomorrowTimes().then( (result) => {} )
//         }},"Klik Untuk Esok")
         : null
      ] : null
       
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
    
    
    // m("p",""),
    m("table.tg", 
  m("tbody",
    [m("tr",
        [
        
          m("th",//.tg-yw4l", 
    m("div",[m(digitalClock),moment().format("l"),]),
            ),
           m("th",//.tg-yw4l", 
            m("")
            ),
          m("td",//.tg-yw4l", 
            m(AuthStatus)
            )
          ]
        ),
    ]
    )
  ),
    // m("h3",[m(digitalClock),moment().format(" LL")]),
    // m("h3",moment().format(" LL")),
    m("p"),
    m(ParsedTimesView),
    m("p",""),
    m(geolocationStatus),
    m("p",""),
    m(stateAndZoneSelect),
    
    ]
    return [
    m(digitalClock),
    m("h1",[moment().format(" LL"),toHijri(new Date()).toLocaleTimeString()]),
    m("p",""),
    m(geolocationStatus),
    m("p",""),
    m(stateAndZoneSelect),
    m("p",""),
    m(ParsedTimesView)
    ]

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
