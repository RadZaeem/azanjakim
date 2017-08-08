import "clientjs"
import {api} from "../api"
import m from "mithril"
import {Auth}  from "../models/Auth"
import {FBLoginButton} from "./FBLoginButton"
import {state} from "../models/state"

var timeStr = "00:00:00"
function addZero(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i
  }

function updateTime () {
  setInterval(function() {
  var today = new Date();
    var h = addZero(today.getHours());
    var mi = addZero(today.getMinutes());
    var s = addZero(today.getSeconds());
    var h12 = (h>12) ? h-12: h
    var ampm = (h>=12) ? "PM" : "AM"
   timeStr= h12 + ":" + mi + ":" + s + " "+ ampm
   m.redraw()
},500)
}

var digitalClock = {
  oninit: updateTime,
  
  view: function(vnode) {
    return m("div", timeStr)
}
}

export var home = {
  oninit: function (){
    // state.
    //Auth.getTokenAndUserWithFBOrTryFingerprint().then( (result) => {console.log(result)})
    },

  view: function (vnode) {
    // return m(Counter)
    return m(digitalClock)

  } 
}