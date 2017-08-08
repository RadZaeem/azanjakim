import "clientjs"
import {api} from "../api"
import m from "mithril"
import {Auth}  from "../models/Auth"
import {FBLoginButton} from "./FBLoginButton"
import {state} from "../models/state"

export var home = {
  oninit: function (){
    //Auth.getTokenAndUserWithFBOrTryFingerprint().then( (result) => {console.log(result)})
    },

  view: function (vnode) {

  } 
}