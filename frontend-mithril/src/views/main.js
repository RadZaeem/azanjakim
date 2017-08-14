import m from "mithril"
import {Auth} from "../models/Auth"
import {AuthStatus} from "../views/AuthStatus"
import {api} from "api"
import {state} from "../models/state"
import {home} from "./home"
// main = navbar page
// TODO: move this to oninit lifecycle method 
var dataStore = {
    scrolled: false
}



export var main = {
    oninit: function() {
        state.initialize() // to Auth
        // console.log("main (navbar) init")
    },
    onscrollEvent(e) {
        if (e.srcElement.scrollTop > 0) {
            this.scrolled = true
            dataStore.scrolled = true
        } else {
            this.scrolled = false
            dataStore.scrolled = false
        }
    },

    onRemoveEvent() {
        dataStore.scrolled = false
    },
    view: function(vnode)  {
        // m.redraw()
        var activeTab = m.route.get()//vnode.attrs.activeTab
        // console.log(activeTab)
        var hari_ini="";var tetapan=""; var tentang_kami = ""
        var a = ".mdc-tab--active"
        switch (activeTab) {
            case "/": hari_ini = a; break;
            case "/tetapan": tetapan = ".is-active"; break;
            case "/about": tentang_kami = a; break;
            default: hari_ini = a; break;

        }

        return [
m("nav.mdc-tab-bar[id='basic-tab-bar']",
    [
        m("a.mdc-tab"+hari_ini+"[href='/']", {oncreate: m.route.link},
            "Waktu Solat"
        ),
        m("a.mdc-tab"+tetapan+"[href='/']", {oncreate: m.route.link},
            "Tetapan"
        ),
        m("a.mdc-tab"+tentang_kami+"[href='/about']", {oncreate: m.route.link},
            "Tentang Kami"
        ),
        m("span.mdc-tab-bar__indicator"),
    ]
),
m("div", vnode.children)
        // m("main#main",
        //         {
        //             onscroll: this.onscrollEvent,
        //             onremove: this.onRemoveEvent
        //         },
        //         m(".container", vnode.children)
        // )

        ]
             

    }
}
