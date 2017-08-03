import m from "mithril"
import {Auth} from "../models/Auth"
import {api} from "api"
// main = navbar page
// TODO: move this to oninit lifecycle method
var dataStore = {
    scrolled: false
}



export var main = {
    oninit: function() {

        // api.token("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDIzMjY4NDUsIm9yaWdfaWF0IjoxNTAxNzI2ODQ1LCJlbWFpbCI6IiIsInVzZXJuYW1lIjoicmFkZW43MyIsInVzZXJfaWQiOjV9.Cf2OTMbihzyhDHuuZXFxKCef7DKr8IqVwikP3OJhEwM")
        // Auth.getTestToken()
        Auth.initialize()
        //Auth.getTestToken()
        //Auth.loginOrRegisterFingerprint()
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
                m(".container",
                    m("a.logo", { href: "/", oncreate: m.route.link }, "LOG"),
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
