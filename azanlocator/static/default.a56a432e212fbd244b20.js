webpackJsonp([1],{10:function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.home=e.ParsedTimesView=void 0;var o=n(137);a(o);n(5);n(2);var u=a(n(1)),l=(n(3),n(12),n(13)),i=n(8),r=(a(n(147)),n(14)),c=n(0);c.locale("ms-my");var s="00.00.00",d={oninit:function(){setInterval(function(){s=(new Date).toLocaleTimeString(),u.default.redraw()},1e3)},view:function(t){return(0,u.default)("div",s)}},f={view:function(t){var e="";i.state.doAutolocate;return 0==i.state.allowedAutolocate?e="Tiada geolocation. Klik ikon geolocation di address bar untuk reset.":i.state.doAutolocate&&(e="",i.state.autolocateZone&&(e+="Anda berada di: "+i.state.autolocateZone)),[[(0,u.default)(".mdc-switch",[(0,u.default)("input.mdc-switch__native-control[id='basic-switch'][type='checkbox']",{onclick:u.default.withAttr("checked",function(t){i.state.setAutolocateThenGetTimes(t).then(function(t){i.state.updateParsedTimes(t,null)})}),checked:i.state.doAutolocate}),(0,u.default)(".mdc-switch__background",(0,u.default)(".mdc-switch__knob"))]),(0,u.default)("label.mdc-switch-label[for='basic-switch']","Lokasi Auto | "+e)]]}},g={currentZone:null,currentState:null,oninit:function(){},view:function(t){var e=r.zoneOptionsForStates[i.state.state];return["Tukar Negeri dan Zon: ",(0,u.default)(".input-field.col.s12",(0,u.default)("select.mdc-select",{value:i.state.state,onchange:u.default.withAttr("value",function(t){"null"!=t&&i.state.setStateAndZone(t,r.zoneOptionsForStates[t][0].value)})},r.stateOptions.map(function(t){return(0,u.default)("option",{value:t.value},t.content)}))),(0,u.default)("select.mdc-select",{value:i.state.zone,onchange:u.default.withAttr("value",function(t){"null"!=t&&(i.state.setStateAndZone(i.state.state,t),i.state.getTimes(null,t).then(function(t){i.state.updateParsedTimes(t),u.default.redraw()}),console.log(t))})},e?e.map(function(t){return(0,u.default)("option",{value:t.value},t.content)}):null)]}},h={oninit:function(){},view:function(t){var e=t.attrs.today,n=t.attrs.tomorrow;if(!e)return null;var a=c(e.date_time_parsed).format("dddd, D/M"),o=null;n&&(o=c(n.date_time_parsed).format("dddd, D/M"));var l=["subuh","syuruk","zuhur","asar","maghrib","isha"],r=[e];return n&&r.push(n),r.forEach(function(t){l.forEach(function(e){var n=t[e].slice(0,2),a=t[e].slice(3,5);t[e]=c({h:n,m:a}).format("hh:mm")})}),[(0,u.default)("table.tg",(0,u.default)("tbody",[(0,u.default)("tr",[(0,u.default)("th.tg-yw4l","Waktu\\Tarikh"),(0,u.default)("th.tg-yw4l",a),n?(0,u.default)("th.tg-yw4l",o):(0,u.default)("button.mdc-button.mdc-button--raised.mdc-button--primary.mdc-ripple-surface[data-mdc-auto-init='MDCRipple'][type='submit']",{onclick:function(){i.state.loadTomorrowTimes().then(function(t){})}},"esok")])]),(0,u.default)("tbody",[(0,u.default)("tr",[(0,u.default)("td.tg-yw4l","Subuh"),(0,u.default)("td.tg-yw4l",e.subuh),n?(0,u.default)("td.tg-yw4l",e.subuh):null]),(0,u.default)("tr",[(0,u.default)("td.tg-yw4l","Syuruk"),(0,u.default)("td.tg-yw4l",e.syuruk),n?(0,u.default)("td.tg-yw4l",e.syuruk):null]),(0,u.default)("tr",[(0,u.default)("td.tg-yw4l","Zuhur"),(0,u.default)("td.tg-yw4l",e.zuhur),n?(0,u.default)("td.tg-yw4l",e.zuhur):null]),(0,u.default)("tr",[(0,u.default)("td.tg-yw4l","Asar"),(0,u.default)("td.tg-yw4l",e.asar),n?(0,u.default)("td.tg-yw4l",e.asar):null]),(0,u.default)("tr",[(0,u.default)("td.tg-yw4l","Maghrib"),(0,u.default)("td.tg-yw4l",e.maghrib),n?(0,u.default)("td.tg-yw4l",e.maghrib):null]),(0,u.default)("tr",[(0,u.default)("td.tg-yw4l","Isyak"),(0,u.default)("td.tg-yw4l",e.isha),n?(0,u.default)("td.tg-yw4l",e.isha):null])]))]}},m=e.ParsedTimesView={view:function(t){return[i.state.parsedTimes?[(0,u.default)(h,{today:i.state.parsedTimes,tomorrow:i.state.parsedTimesTomorrow}),(i.state.parsedTimesTomorrow,null)]:null]}};e.home={oninit:function(){},view:function(t){return[(0,u.default)("table.tg",(0,u.default)("tbody",[(0,u.default)("tr",[(0,u.default)("th",(0,u.default)("div",[(0,u.default)(d),c().format("l")])),(0,u.default)("th",(0,u.default)("")),(0,u.default)("td",(0,u.default)(l.AuthStatus))])])),(0,u.default)(m),(0,u.default)(f),(0,u.default)("p",""),(0,u.default)(g)]}}},12:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.FBLoginButton=void 0;var a=function(t){return t&&t.__esModule?t:{default:t}}(n(1));n(3),e.FBLoginButton={view:function(t){return a.default.trust('\n<div class="fb-login-button" data-max-rows="1" data-size="medium" data-button-type="login_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="true"></div>\n          ')}}},13:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.AuthStatus=void 0,n(5);n(2);var a=function(t){return t&&t.__esModule?t:{default:t}}(n(1)),o=(n(3),n(12));n(8),n(6),e.AuthStatus={oninit:function(){},view:function(t){return[(0,a.default)(o.FBLoginButton)]}}},130:function(t,e,n){"use strict";n(131);var a=function(t){return t&&t.__esModule?t:{default:t}}(n(1)),o=n(9);n(6).getFB().then(function(t){t.init({appId:"474493519606356",cookie:!0,xfbml:!0,version:"v2.8"})});for(var u=Object.values(o.routes),l={},i=0;i<u.length;i++)l[u[i].path]={render:u[i].render};a.default.route.prefix(""),a.default.route(document.getElementById("app"),"/",l)},131:function(t,e){},136:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.generate=function(t,e){var n=a.routes[t].path;for(var o in e)n=n.replace(":"+o,e[o]);return n};var a=n(9)},14:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getStateByZone=function(t){for(var e in a)for(var n=0;n<a[e].length;n++)if(a[e][n].value==t)return e;throw"state not found!"},e.getZoneOptionsArray=function(t){a[t];for(var e=[],n=0;n<a[t].length;n++){var o=a[t][n];return e.push(o),e}};e.stateOptions=[{value:"null",content:"Pilih Negeri"},{value:"JOHOR",content:"Johor"},{value:"KEDAH",content:"Kedah"},{value:"KELANTAN",content:"Kelantan"},{value:"KUALA LUMPUR",content:"Kuala Lumpur"},{value:"LABUAN",content:"Labuan"},{value:"MELAKA",content:"Melaka"},{value:"NEGERI_SEMBILAN",content:"Negeri Sembilan"},{value:"PAHANG",content:"Pahang"},{value:"PERAK",content:"Perak"},{value:"PERLIS",content:"Perlis"},{value:"PULAU_PINANG",content:"Pulau Pinang"},{value:"PUTRAJAYA",content:"Putrajaya"},{value:"SABAH",content:"Sabah"},{value:"SARAWAK",content:"Sarawak"},{value:"SELANGOR",content:"Selangor"},{value:"TERENGGANU",content:"Terengganu"}];var a=e.zoneOptionsForStates={JOHOR:[{value:"null",content:"Pilih Zon"},{value:"JHR01",content:"JHR01: Pulau Aur , Pemanggil "},{value:"JHR02",content:"JHR02: Kota Tinggi, Mersing, Johor Bahru"},{value:"JHR03",content:"JHR03: Kluang , Pontian"},{value:"JHR04",content:"JHR04: Batu Pahat, Muar, Segamat, Gemas"}],KEDAH:[{value:"null",content:"Pilih Zon"},{value:"KDH01",content:"KDH01: Kota Setar, Kubang Pasu, Pokok Sena"},{value:"KDH02",content:"KDH02: Pendang, Kuala Muda, Yan"},{value:"KDH03",content:"KDH03: Padang Terap, Sik"},{value:"KDH04",content:"KDH04: Baling"},{value:"KDH05",content:"KDH05: Kulim, Bandar Bahru"},{value:"KDH06",content:"KDH06: Langkawi"},{value:"KDH07",content:"KDH07: Gunung Jerai"}],KELANTAN:[{value:"null",content:"Pilih Zon"},{value:"KTN01",content:"KTN01: K.Bharu, Bachok, Pasir Puteh, Tumpat, Pasir Mas, Tnh. Merah, Machang, Kuala Krai, Mukim Chiku"},{value:"KTN03",content:"KTN03: Jeli, Gua Musang (Mukim Galas, Bertam)"}],"KUALA LUMPUR":[{value:"null",content:"Pilih Zon"},{value:"SGR03",content:"SGR03: Kuala Lumpur"}],LABUAN:[{value:"null",content:"Pilih Zon"},{value:"WLY02",content:"WLY02: Labuan"}],MELAKA:[{value:"null",content:"Pilih Zon"},{value:"MLK01",content:"MLK01: Bandar Melaka, Alor Gajah, Jasin, Masjid Tanah, Merlimau, Nyalas"}],NEGERI_SEMBILAN:[{value:"null",content:"Pilih Zon"},{value:"NGS01",content:"NGS01: Jempol, Tampin"},{value:"NGS02",content:"NGS02: Port Dickson, Seremban, Kuala Pilah, Jelebu, Rembau"}],PAHANG:[{value:"null",content:"Pilih Zon"},{value:"PHG01",content:"PHG01: Pulau Tioman"},{value:"PHG02",content:"PHG02: Kuantan, Pekan, Rompin, Muadzam Shah"},{value:"PHG03",content:"PHG03: Maran, Chenor, Temerloh, Bera, Jerantut"},{value:"PHG04",content:"PHG04: Bentong, Raub, Kuala Lipis"},{value:"PHG05",content:"PHG05: Genting Sempah, Janda Baik, Bukit Tinggi"},{value:"PHG06",content:"PHG06: Bukit Fraser, Genting Higlands, Cameron Higlands"}],PERAK:[{value:"null",content:"Pilih Zon"},{value:"PRK01",content:"PRK01: Tapah, Slim River , Tanjung Malim"},{value:"PRK02",content:"PRK02: Ipoh, Batu Gajah, Kampar, Sg. Siput, Kuala Kangsar"},{value:"PRK03",content:"PRK03: Pengkalan Hulu, Grik, Lenggong"},{value:"PRK04",content:"PRK04: Temengor , Belum"},{value:"PRK05",content:"PRK05: Teluk Intan, Bagan Datoh, Kg.Gajah, Sri Iskandar, Beruas, Parit, Lumut, Setiawan , Pulau Pangkor"},{value:"PRK06",content:"PRK06: Selama, Taiping, Bagan Serai, Parit Buntar"},{value:"PRK07",content:"PRK07: Bukit Larut"}],PERLIS:[{value:"null",content:"Pilih Zon"},{value:"PLS01",content:"PLS01: Kangar, Padang Besar, Arau"}],PULAU_PINANG:[{value:"null",content:"Pilih Zon"},{value:"PNG01",content:"PNG01: Seluruh Negeri Pulau Pinang"}],PUTRAJAYA:[{value:"null",content:"Pilih Zon"},{value:"SGR04",content:"SGR04: Putrajaya"}],SABAH:[{value:"null",content:"Pilih Zon"},{value:"SBH01",content:"SBH01: Sandakan, Bdr. Bkt. Garam, Semawang, Temanggong, Tambisan"},{value:"SBH02",content:"SBH02: Pinangah, Terusan, Beluran, Kuamut, Telupit"},{value:"SBH03",content:"SBH03: Lahad Datu, Kunak, Silabukan, Tungku, Sahabat, Semporna"},{value:"SBH04",content:"SBH04: Tawau, Balong, Merotai, Kalabakan"},{value:"SBH05",content:"SBH05: Kudat, Kota Marudu, Pitas, Pulau Banggi"},{value:"SBH06",content:"SBH06: Gunung Kinabalu"},{value:"SBH07",content:"SBH07: Papar, Ranau, Kota Belud, Tuaran, Penampang, Kota Kinabalu"},{value:"SBH08",content:"SBH08: Pensiangan, Keningau, Tambunan, Nabawan"},{value:"SBH09",content:"SBH09: Sipitang, Membakut, Beaufort, Kuala Penyu, Weston, Tenom, Long Pa Sia"}],SARAWAK:[{value:"null",content:"Pilih Zon"},{value:"SWK01",content:"SWK01: Limbang, Sundar, Trusan, Lawas"},{value:"SWK02",content:"SWK02: Niah, Bekenu, Miri, Sibuti, Marudi"},{value:"SWK03",content:"SWK03: Tatau, Suai, Belaga, Pandan, Sebauh, Bintulu"},{value:"SWK04",content:"SWK04: Igan, Oya, Balingian, Mukah, Dalat, Sibu, Kanowit, Kapit, Song"},{value:"SWK05",content:"SWK05: Tanjung Manis, Belawai, Matu, Daro, Sarikei, Julau, Bintangor, Rajang"},{value:"SWK06",content:"SWK06: Kabong, Lingga, Sri Aman, Engkelili, Lubok Antu, Betong, Spaoh, Pusa, Saratok, Roban, Debak"},{value:"SWK07",content:"SWK07: Samarahan, Simunjan, Serian, Sebuyau, Meludam"},{value:"SWK08",content:"SWK08: Kuching, Bau, Lundu, Sematan"},{value:"SWK09",content:"SWK09: Zon Khas"}],SELANGOR:[{value:"null",content:"Pilih Zon"},{value:"SGR01",content:"SGR01: Gombak, H.Selangor, Rawang, H.Langat, Sepang, Petaling, S.Alam"},{value:"SGR02",content:"SGR02: Sabak Bernam, Kuala Selangor, Klang, Kuala Langat"}],TERENGGANU:[{value:"null",content:"Pilih Zon"},{value:"TRG01",content:"TRG01: Kuala Terengganu, Marang"},{value:"TRG02",content:"TRG02: Besut, Setiu"},{value:"TRG03",content:"TRG03: Hulu Terengganu"}]}},148:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.main=void 0;var a=function(t){return t&&t.__esModule?t:{default:t}}(n(1)),o=(n(3),n(13),n(2),n(8)),u=(n(10),{scrolled:!1});e.main={oninit:function(){o.state.initialize()},onscrollEvent:function(t){t.srcElement.scrollTop>0?(this.scrolled=!0,u.scrolled=!0):(this.scrolled=!1,u.scrolled=!1)},onRemoveEvent:function(){u.scrolled=!1},view:function(t){var e="",n="",o="",u=".mdc-tab--active";switch(a.default.route.get()){case"/":e=u;break;case"/tetapan":n=u;break;case"/tentang":o=u;break;default:e=u}return[(0,a.default)("header.mdc-toolbar.",(0,a.default)(".mdc-toolbar__row",(0,a.default)("section.mdc-toolbar__section.mdc-toolbar__section--align-start",[(0,a.default)("span.mdc-toolbar__title[href='/']",["17rakaat "]),(0,a.default)("span.mdc-toolbar__title",a.default.trust('<div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button_count" data-size="large" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">Kongsi</a></div>'))]))),(0,a.default)("nav.mdc-tab-bar[id='basic-tab-bar']",[(0,a.default)("a.mdc-tab"+e+"[href='/']",{oncreate:a.default.route.link},"Waktu Solat"),(0,a.default)("a.mdc-tab"+n+"[href='/tetapan']",{oncreate:a.default.route.link},"Tetapan"),(0,a.default)("a.mdc-tab"+o+"[href='/tentang']",{oncreate:a.default.route.link},"Tentang Kami"),(0,a.default)("span.mdc-tab-bar__indicator")]),(0,a.default)(".mdc-typography.",t.children)]}}},2:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.api=void 0;var a=function(t){return t&&t.__esModule?t:{default:t}}(n(1)),o=n(142),u=e.api={url:"https://misza.herokuapp.com/",request:function(t){return t.config=function(t){if(u.token()){t.setRequestHeader("Authorization","JWT "+u.token()),t.setRequestHeader("X-Requested-With","XMLHttpRequest");var e=o.get("csrftoken");console.log("api csrf: "+e)}},a.default.request(t)},token:function(t){return arguments.length&&localStorage.setItem("token",t),localStorage.getItem("token")},autolocate:function(t){return arguments.length&&localStorage.setItem("autolocate",t),localStorage.getItem("autolocate")}}},3:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Auth=void 0,n(5);var a=n(2),o=(function(t){t&&t.__esModule}(n(1)),n(6)),u=e.Auth={getTokenAndUserWithFBOrTryFingerprint:function(){return new Promise(function(t,e){u.getTokenAndUserWithFBLogin().then(function(e){t(e)}).catch(function(e){console.log("No FB Login, Trying using fingerprint"),console.log(e);var n=(new ClientJS).getFingerprint().toString(16);u.getTokenAndUserWithFingerprint(n).then(function(e){t(e)}).catch(function(t){console.log(t)})})})},getTokenAndUserWithFBLogin:function(){return new Promise(function(t,e){o.getLoginStatus().then(function(n){"connected"==n.status?u.getTokenAndUserWithFBToken(n.authResponse.accessToken).then(function(e){t(e)}):e(n)})})},getTokenAndUserWithFingerprint:function(t){return new Promise(function(e,n){console.log("using fingerprint "+t),a.api.request({method:"POST",url:a.api.url+"rest-auth/login/",data:{username:t,password:"a"+t}}).then(function(t){e(t),console.log("success login with fingerprint")}).catch(function(o){console.log(o),console.log("attempt register"),a.api.request({method:"POST",url:a.api.url+"rest-auth/registration/",data:{username:t,password1:"a"+t,password2:"a"+t}}).then(function(t){console.log("successfully registered, token: "+t.token),e(t)}).catch(function(t){n({error:"Failed to register fingerprint"})})})})},getTokenAndUserWithFBToken:function(t){return new Promise(function(e,n){console.log("FBInit using Facebook API token: "+t),a.api.request({method:"POST",url:a.api.url+"rest-auth/facebook/",data:{access_token:t}}).then(function(t){e(t)}).catch(function(t){console.log(t),n(t)})})},getRefreshedToken:function(t){return new Promise(function(e,n){console.log("token exist, trying to refresh"),a.api.request({method:"POST",url:a.api.url+"api-token-refresh/",data:{token:t}}).then(function(n){console.log("token refreshed!"),e(t)}).catch(function(t){t.non_field_errors&&n({error:"expired token or invalid"})})})}}},8:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.state=void 0,n(5);var a=n(2),o=function(t){return t&&t.__esModule?t:{default:t}}(n(1)),u=n(3),l=n(14),i=(n(6),n(0),e.state={didAuth:null,lastLogin:null,lastParse:null,parsedTimes:null,parsedTimesTomorrow:null,parsedTimesList:null,deltaDay:0,tokenAndUser:null,coords:null,autolocateZone:null,doAutolocate:null,allowedAutolocate:null,state:"KUALA LUMPUR",zone:"SGR03",dispatch:function(t,e){i[t].apply(i,e||[]),requestAnimationFrame(function(){})},initialize:function(){u.Auth.getTokenAndUserWithFBOrTryFingerprint().then(function(t){console.log(t),i.updateUserAndToken(t),i.loadLastConfig().then(function(t){if(0!==Object.keys(t).length||t.constructor!==Object){i.doAutolocate=t.zone.did_autolocate;var e=t.zone.esolat_zone.state_name,n=t.zone.esolat_zone.code_name;i.setStateAndZone(e,n)}else console.log("empty! -- default to KL, no location"),i.doAutolocate=!1,i.setStateAndZone("KUALA LUMPUR","SGR03");i.setAutolocateThenGetTimes(i.doAutolocate).then(function(t){i.updateParsedTimes(t)})})})},setStateAndZone:function(t,e){null==t?(i.state=(0,l.getStateByZone)(e),i.zone=e):null==e?(i.state=i,i.zone=null):(i.state=t,i.zone=e)},loadLastConfig:function(){return new Promise(function(t,e){a.api.request({method:"GET",url:a.api.url+"request-last-parsed-times/"}).then(function(e){console.log("last parse found!"),console.log(e),t(e)}).catch(function(t){console.log(t),e(t)})})},setAutolocateThenGetTimes:function(t){return new Promise(function(e,n){t?navigator.geolocation&&i.getCoordsAuto().then(function(t){i.coords=t,i.doAutolocate=!0,i.allowedAutolocate=!0,document.querySelector(".mdl-js-switch")&&document.querySelector(".mdl-js-switch").MaterialSwitch.on(),i.getTimes(i.coords).then(function(t){var n=t.zone.esolat_zone.state_name,a=t.zone.esolat_zone.code_name;i.setStateAndZone(n,a),i.autolocateZone=t.zone.esolat_zone.zone_name,console.log("autolocate enabled"),e(t)})}).catch(function(t){if(i.doAutolocate=!1,1==t.code)return i.allowedAutolocate=!1,i.setAutolocateThenGetTimes(!1);n(t)}):(console.log("autolocate disabled"),i.doAutolocate=!1,document.querySelector(".mdl-js-switch")&&document.querySelector(".mdl-js-switch").MaterialSwitch.off(),i.getTimes(null,i.zone).then(function(t){var n=t.zone.esolat_zone.state_name,a=t.zone.esolat_zone.code_name;i.setStateAndZone(n,a),e(t)}))})},getCoordsAuto:function(){return new Promise(function(t,e){navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(e){var n={lat:e.coords.latitude.toString(),lng:e.coords.longitude.toString()};t(n)},function(t){e(t),console.warn(t)})})},updateCoordsManual:function(t,e){i.coords={lat:t.toString(),lng:t.toString()}},getTimesWithAutolocation:function(){return new Promise(function(t,e){})},getTimesWithZone:function(){return new Promise(function(t,e){})},loadTomorrowTimes:function(){return new Promise(function(t,e){i.getTimes(i.coords?i.coords:null,i.coords?null:i.zone,1,null).then(function(e){i.updateParsedTimes(i.parsedTimes,e),t(e)})})},getTimes:function(t,e,n,o){var u={};return t?u.coords=t:e&&(u.zone=e),o&&(u.date=o),n&&(u["day-delta"]=n),new Promise(function(t,e){a.api.request({method:"POST",url:a.api.url+"request-parsed-times/",data:u}).then(function(e){t(e)}).catch(function(t){e(t)})})},updateParsedTimes:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;i.parsedTimes=t,i.parsedTimesTomorrow=e,console.log("updated parsedTimes"),console.log(t,e)},updateUserAndToken:function(t){i.tokenAndUser=t,i.didAuth=!0,a.api.token(t.token),o.default.redraw()}})},9:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.routes=e.generate=void 0;var a=n(136);Object.defineProperty(e,"generate",{enumerable:!0,get:function(){return a.generate}});var o=function(t){return t&&t.__esModule?t:{default:t}}(n(1)),u=n(10),l=n(148);e.routes={index:{path:"/",render:function(){return(0,o.default)(l.main,(0,o.default)(u.home))}},tetapan:{path:"/tetapan",render:function(){return(0,o.default)(l.main,o.default.trust("\nBelum dibuat lagi..\n<br>\nSila Like Facebook Page kami untuk Update jika dah siap.\nTerima kasih!\n"))}},tentang:{path:"/tentang",render:function(){return(0,o.default)(l.main,o.default.trust('\nAssalamualaikum.\n<br>\nWeb app ini dibuat oleh Raden Muhammad.\n<br>\nWaktu solat diambil daripada <a href="http://e-solat.gov.my">E-Solat JAKIM</a>\n<br>\nSila like Facebook kami dan share web app ini. Terima kasih!\n'))}}}}},[130]);