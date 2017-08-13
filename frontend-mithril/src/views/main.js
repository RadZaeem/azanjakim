import m from "mithril"
import {Auth} from "../models/Auth"
import {AuthStatus} from "../views/AuthStatus"
import {api} from "api"
import {state} from "../models/state"
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
        return [
        // m(AuthStatus),
            m("header#header", { class: dataStore.scrolled ? "shadow" : "", key: "header" },
                m(".container",
                    // m(AuthStatus),
                    m("a.logo", { href: "/", oncreate: m.route.link }, "17rakaat.me"),
                    // m("a.logo", {} ,m(AuthStatus)),


                    m("nav.navlinks",
                        m("ul",
                            m("li",{},m(AuthStatus)),
                            m("li", { class: m.route.get() == "/" ? "active" : "" },
                                m("a", { href: "/", oncreate: m.route.link }, "Waktu Solat")
                            ),
                            m("li", { class: m.route.get() == "/about" ? "active" : "" },
                                m("a", { href: "/about", oncreate: m.route.link }, "Tentang Kami")
                            ),
                        )
                    )

                )
            ),

            // router outlet
            m("main#main",
                {
                    onscroll: this.onscrollEvent,
                    onremove: this.onRemoveEvent
                },
                m(".container", vnode.children)
            )
        ]
    }
}
