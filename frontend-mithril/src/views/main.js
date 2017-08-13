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
        var activeTab = vnode.attrs.activeTab
        var hari_ini="";var minggu_ini=""; var tentang_kami = ""
        switch (activeTab) {
            case "hari-ini": hari_ini = ".is-active"; break;
            case "minggu-ini": minggu_ini = ".is-active"; break;
            case "tentang-kami": tentang_kami = ".is-active"; break;
            default: hari_ini = ".is-active"; break;

        }
        return [
m(".mdl-layout.mdl-js-layout.mdl-layout--fixed-header",
    [
        m("header.mdl-layout__header", 
            m(".mdl-layout__header-row", 
                m("span.mdl-layout-title", 
                [    "17rakaat.me | "
                
                ,m("mdl-layout-spacer"),m(AuthStatus)])
            )
        ),
        m("main.mdl-layout__content", 
            m(".mdl-tabs.mdl-js-tabs",
                [
                    m(".mdl-tabs__tab-bar",
                        [
                            m("a.mdl-tabs__tab"+hari_ini+"[href='#hari-ini']", 
                                {oncreate: m.route.link},
                                "Hari Ini"
                            
                            ),
                            m("a.mdl-tabs__tab"+minggu_ini+"[href='#minggu-ini']", 
                                {oncreate: m.route.link},
                                "Minggu ini"
                            
                            ),
                            m("a.mdl-tabs__tab"+tentang_kami+"[href='#tentang-kami']", 
                                {oncreate: m.route.link},
                                "Tentang Kami"
                            
                            )
                        ]
                    ),
                    m(".mdl-tabs__panel"+hari_ini+"[id='hari-ini']", 
                        m(home)
                        
                    ),
                    m(".mdl-tabs__panel"+minggu_ini+"[id='minggu-ini']",
                        // m(home))
                        "akan datang")
                    
                            
                    ,
                    m(".mdl-tabs__panel"+tentang_kami+"[id='tentang-kami']", 
                        m("p", 
                            "Tab 3 Content"
                        )
                    )
                ]
            )
        )
    ]
)
        ]

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
