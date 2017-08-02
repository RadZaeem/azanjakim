import m from "mithril"
import {navbar} from "./navbar"
// TODO: move this to oninit lif"ecycle method

// var navbar = {
//     view: function(vnode) {
//         return m("header#header", { class: true ? "shadow" : "", key: "header" },
//                 m(".container",
//                     m("a.logo", { href: "/", oncreate: m.route.link }, "LOG"),
//                     m("nav.navlinks",
//                         m("ul",
//                             m("li", { class: m.route.get() == "/" ? "active" : "" },
//                                 m("a", { href: "/", oncreate: m.route.link }, "INDEX")
//                             ),
//                             m("li", { class: m.route.get() == "/about" ? "active" : "" },
//                                 m("a", { href: "/about", oncreate: m.route.link }, "ABOUT")
//                             ),
//                         )
//                     )
//                 )
//             )
// }}

export var main = {


    view: function (vnode) {
        return [
            m(navbar),

// m("header#header", { class: true ? "shadow" : "", key: "header" },
//                 m(".container",
//                     m("a.logo", { href: "/", oncreate: m.route.link }, "LOG"),
//                     m("nav.navlinks",
//                         m("ul",
//                             m("li", { class: m.route.get() == "/" ? "active" : "" },
//                                 m("a", { href: "/", oncreate: m.route.link }, "INDEX")
//                             ),
//                             m("li", { class: m.route.get() == "/about" ? "active" : "" },
//                                 m("a", { href: "/about", oncreate: m.route.link }, "ABOUT")
//                             ),
//                         )
//                     )
//                 )
//             ),
            // router outlet
            m("main#main",

                m(".container", vnode.children)
            )
        ]
    }
}
