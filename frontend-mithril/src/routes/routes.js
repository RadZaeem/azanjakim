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
            return m(main, m(home, {activeTab :"hari-ini"}))
            // return m(main, m("div.temp", "long page"))
        }
    },
    'about': {
        path: '/about',
        render: () => {
            // TODO setkan m(main, {setkan active tab mana satu...})
            return 
                    m("main.mdl-layout__content.main.mdl-layout__content.mdl-tabs__panel[id='tab3-panel']",
m("div", "Dibuat oleh Muaz. Waktu solat daripada e-solat.gov.my"))
        }
    }
}
