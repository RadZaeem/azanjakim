import m from "mithril"
import {home} from "../views/home"
//import { main } from "layouts/main"

import { main, about} from "views/main"

export { generate } from "routes/generate"

export var routes = {
    'index': {
        path: '/',
        render: () => {
            // return m(home)
            return m(main, m(home))
            // return m(main, m("div.temp", "long page"))
        }
    },
    'about': {
        path: '/about',
        render: () => {
            return m(main, m("div", "bar"))
        }
    }
}
