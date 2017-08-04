import m from "mithril"
import {Auth} from "../models/Auth"
import {AuthStatus} from "../views/AuthStatus"
import {api} from "api"
// main = navbar page
// TODO: move this to oninit lifecycle method 
var dataStore = {
    scrolled: false
}



export var main = {
    oninit: function() {
        /*
        // TODO
        autolocate checkbox
        save per user session


        auth (fb or anon )
        check if HTML5 location is on or off
        if off:
          default coords to KL
        else if on:
          get coords
        requestParsedTimes today, tomorrow
        */
        // api.token("")
        // Auth.initialize()

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
            m("header#header", { class: dataStore.scrolled ? "shadow" : "", key: "header" },
                m(AuthStatus),
                m(".container",
                    m("a.logo", { href: "/", oncreate: m.route.link }, "17rakaat.me"),

                    m("nav.navlinks",
                        m("ul",
                            m("li", { class: m.route.get() == "/" ? "active" : "" },
                                m("a", { href: "/", oncreate: m.route.link }, "INDEX")
                            ),
                            m("li", { class: m.route.get() == "/about" ? "active" : "" },
                                m("a", { href: "/about", oncreate: m.route.link }, "ABOUT")
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
