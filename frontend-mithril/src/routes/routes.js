import m from "mithril"
import {home} from "../views/home"
//import { main } from "layouts/main"

import { main, about} from "views/main"

export { generate } from "routes/generate"
var str_tentang =`
Assalamualaikum.
<br>
Web app ini dibuat oleh Raden Muhammad.
<br>
Waktu solat diambil daripada <a href="http://e-solat.gov.my">E-Solat JAKIM</a>
<br>
Sila like Facebook kami dan share web app ini. Terima kasih!
`

var str_tetapan =`
Belum dibuat lagi..
<br>
Sila Like Facebook Page kami untuk Update jika dah siap.
Terima kasih!
`


export var routes = {
    'index': {
        path: '/',
        render: () => {
            // return m(home)
            return m(main, m(home))// {activeTab :"hari-ini"}))
            // return m(main, m("div.temp", "long page"))
        }
    },
    'tetapan': {
        path: '/tetapan',
        render: () => {
            // TODO setkan m(main, {setkan active tab mana satu...})
            return m(main, m.trust(str_tetapan))
        }
    },
    'tentang': {
        path: '/tentang',
        render: () => {
            // TODO setkan m(main, {setkan active tab mana satu...})
            return m(main, m.trust(str_tentang))
        }
    }
}
