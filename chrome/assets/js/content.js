//   - This file is part of ChessHelper Extension
//  <https://github.com/gerwld/ChessHelper-extension/blob/main/README.md>,
//   - Copyright (C) 2023-present ChessHelper Extension
//   -
//   - ChessHelper Extension is a software: you can redistribute it, but you are not allowed to modify it under the terms of the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License.
//   -
//   - ChessHelper Extension is distributed in the hope that it will be useful,
//   - but WITHOUT ANY WARRANTY; without even the implied warranty of
//   - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   - Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License for more details.
//   -
//   - You should have received a copy of the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License
//   - along with ChessHelper Extension.  If not, see <https://creativecommons.org/licenses/by-nc-nd/4.0/>.

(()=>{"use strict";{const _=chrome||browser;let e,o,n,a;const y=["roboto","poppins","caprasimo","playfair","merriweather","noto_sans","nunito","montserrat","pixelify","gabarito","roboto_condensed","inter"],w=["night_owl","purple_dark","kittens","ws_type","srl","amoled","chains","frutiger_aero","glitter","greener_green","pink","yellow"],x=["anime","dani_maccari","itchy","itchy2","marble","mom_still_loves_them","kiwen_suwi","pjaworski","cburnett","cburnett_jp","pjaworski_ice","pjaworski_metal","pjaworski_forest","pjaworski_bluelake","pjaworski_bluelake2","pjaworski_purple","pjaworski_pink","new_metropol","ancient_set","32bit","letters","pjaworskim_mramor","pjaworskim_metal","pjaworskim_blue","pjaworski_muesli","anarcandy","celtic","dbenbenn","fantasy","gioco","leipzig","staunty","cardinal","chess7","dubrovny","fresca","icpieces","libra","spatial","tatiana"],v=["anime","arcade","gray_eyes","peppermint","blackwhite","green2","polarizer","darkblue","purple","disa_board","middaysun","teal","disa_night","overheated_stain","webpunk","glass","paperice","wood","26brown","deepblue","losangeles","softlightblue","26dmblue","dmblue2","midblue","softpurple","autumn","field","nightindesert","someunix","bluenblack","iceberg","revo","twilight","dbhc","jelly","softbrown","emerald","industrial"];function s(){(document.getElementById("board")||document.getElementById("board-single"))?.querySelector("canvas")&&location.reload()}function i(t){-1!==w.indexOf(t)&&c(`/assets/graphs/themes/${t}.css`,!0,t),w.filter(e=>e!==t).forEach(e=>document.getElementById(e)?.remove())}function l(t){-1!==y.indexOf(t)&&c(`/assets/graphs/fonts/${t}.css`,!0,t),y.filter(e=>e!==t).forEach(e=>document.getElementById(e)?.remove())}function c(e,n,a){fetch(_.runtime.getURL(e)).then(e=>e.text()).then(e=>{var t=document.getElementById(a),o=document.createElement("style");o.textContent=e,o.setAttribute("id",a),n&&!t?document.head.appendChild(o):!n&&t instanceof Node&&document.head.removeChild(t)}).catch(e=>{})}function d(e,t,o){var n=document.getElementById(o),a=document.createElement("style");a.textContent=e,a.setAttribute("id",o),t&&!n?document.head.appendChild(a):!t&&n instanceof Node&&document.head.removeChild(n)}function u(e){clearInterval(o);var t=window.location.href&&window.location.href.includes("/home")||"https://chess.com"===window.location.href||"https://chess.com/"===window.location.href;e&&t?o=setInterval(function(){var e=document.querySelector(".tv-player-component"),t=document.querySelector(".layout-column-two").querySelectorAll(".v5-section");e&&(e.remove(),t)&&t.length&&t.forEach(e=>{e.querySelector('[href*="/member"].v5-header-name')&&e.remove(),e.querySelector('[href*="/tv"].v5-header-name')&&e.remove()})},200):clearInterval(o)}function m(e){clearInterval(n);var t=window.location.href&&window.location.href.includes("/play/")||window.location.href&&window.location.href.includes("/game/");e&&t?n=setInterval(function(){var e=document.querySelector(".toggle-custom-game-button");document.querySelector('[data-cy="time-selector-category-30"')||"More Time Controls"!=e?.innerText||e.click()},20):e||("Fewer Time Controls"==(t=document.querySelector(".toggle-custom-game-button"))?.innerText&&t.click(),clearInterval(n))}function p(o){var e=document.createElementNS("http://www.w3.org/2000/svg","svg"),t=o?"coordinates_inj coordinates_inj__flipped":"coordinates_inj coordinates_inj__normal";e.setAttribute("version","1.1"),e.setAttribute("class",t),e.setAttribute("viewBox","0 0 100 100");for(let t=0;t<8;t++){var n,a=document.createElementNS("http://www.w3.org/2000/svg","g");t%2!=0&&((n=document.createElement("text")).setAttribute("font-size","0"),n.setAttribute("transform","matrix(1 0 0 1 0 0)"),a.appendChild(n));for(let e=7;0<=e;e--){var r=document.createElementNS("http://www.w3.org/2000/svg","text");r.setAttribute("transform","matrix(1 0 0 1 "+(8.1+12.4*t)+" "+(11.5+12.4*e)+")"),r.setAttribute("font-size","3.4px"),r.textContent=o?String.fromCharCode(104-t)+(e+1):String.fromCharCode(97+t)+(8-e),a.appendChild(r)}e.appendChild(a)}return e}function g(e){clearInterval(a);var t=window.location.href&&window.location.href.includes("/play/")||window.location.href&&window.location.href.includes("/game/");e&&t?a=setInterval(async function(){var e,t,o=document.getElementById("board")||document.getElementById("board-single");o&&o.querySelector(".coordinates")&&(o.querySelector(".coordinates").style.opacity="0"),o?.querySelector(".coordinates_inj")||(e=p(),t=p(!0),o.appendChild(e),o.appendChild(t))},20):e||(clearInterval(a),(t=document.getElementById("board")||document.getElementById("board-single"))?.querySelector(".coordinates")&&(t.querySelector(".coordinates").style.display="block",t.querySelector(".coordinates").style.opacity="1",t.querySelectorAll(".coordinates_inj").forEach(e=>e.remove())))}function h(e){if(e){let t=!1;e=document.createElement("div");function o(){document.exitFullscreen&&document.fullscreenElement?document?.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen()}e.innerHTML='<button class="fullscreen_pgl">Enter Full Screen</button><style>.fullscreen_pgl {position: fixed;bottom: 10px;right: 10px;z-index: 10; border: none; padding: 4px 5px; background-color: rgb(128, 128, 128, 0.5); border-radius: 4px; color: white;}</style>',e.addEventListener("click",function(){var e=document.querySelector(".fullscreen_pgl");t?(e.innerHTML="Enter Full Screen",o()):(e.innerHTML="Exit Full Screen",(e=document.documentElement).requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.msRequestFullscreen&&e.msRequestFullscreen()),t=!t},!1),document.querySelector(".fullscreen_pgl")||document.querySelector("body").appendChild(e),document.addEventListener("fullscreenchange",function(){var e=document.querySelector(".fullscreen_pgl");!document.fullscreenElement&&t&&(e.innerHTML="Enter Full Screen",o(document.documentElement),t=!1)},!1)}else document.querySelectorAll(".fullscreen_pgl")?.forEach(e=>e.remove())}function f(o,n){function a(){location.reload(),window.location.href=window.location.href}clearInterval(e),o||n?e=setInterval(function(){document.querySelectorAll(".alerts-alert").forEach(e=>{var t;e.innerText.includes("refresh the page")&&(o||n)&&!e.querySelector(".reload_pgdl")&&(console.log("[ChessHelper]: Founded reload popup. Adding button."),(t=document.createElement("div")).innerHTML='<button class="reload_pgdl">Click to Reload</button><style>.reload_pgdl {order: 1} .alerts-info {display: flex; align-items: center} .alerts-close {order: 2}</style>',t.addEventListener("click",a,!1),e.appendChild(t))})},200):(document.querySelector(".reload_pgdl")?.remove(),clearInterval(e))}console.log("boards: "+v.length+", pieces: "+x.length+", themes: "+w.length),_.storage.local.get("formState",e=>{e=e.formState.disabled?{show_aside:!0}:e.formState;i(e.theme),l(e.font)}),_.storage.local.onChanged.addListener((e,t)=>{e.formState&&e.formState.newValue&&e.formState.oldValue&&JSON.stringify({...e.formState.newValue})!==JSON.stringify({...e.formState.oldValue})&&b({...e.formState.oldValue})});let r=!1;function b(o){_.storage.local.get("formState",async e=>{var t=e.formState.disabled?{show_aside:!0}:e.formState;i(t.theme),l(t.font),async function(t,e,o){var n=JSON.parse(localStorage.getItem("boardOptionsCache"));!o&&n&&"arcade"!==n?.animationType&&"natural"!==n?.animationType&&await new Promise(e=>setTimeout(e,200)),t!==e&&o&&(s(),d("#board-single, #board {opacity: 0!important; transition: opacity 0ms linear 0ms!important}",!0,"board_l3_appear"),setTimeout(()=>{document.getElementById("board_l3_appear")?.remove()},100)),-1!==x.indexOf(t)&&c(`/assets/graphs/pieces/${t}.css`,!0,t),x.filter(e=>e!==t).forEach(e=>document.getElementById(e)?.remove())}(t.pieces,o.pieces,r),async function(t,e,o){var n=JSON.parse(localStorage.getItem("boardOptionsCache"));!o&&n&&"arcade"!==n?.animationType&&"natural"!==n?.animationType&&await new Promise(e=>setTimeout(e,200)),t!==e&&o&&(s(),d("#board-single, #board {opacity: 0!important; transition: opacity 0ms linear 0ms!important}",!0,"board_l3_appear"),setTimeout(()=>{document.getElementById("board_l3_appear")?.remove()},100)),-1!==v.indexOf(t)&&c(`/assets/graphs/boards/${t}.css`,!0,t),v.filter(e=>e!==t).forEach(e=>document.getElementById(e)?.remove())}(t.board,o.board,r),r||(r=!0,setTimeout(()=>{document.getElementById("board_l3_appear")?.remove()},200)),1==o?.disabled&&0==e?.formState?.disabled&&"boolean"==typeof o?.disabled&&"boolean"==typeof e?.formState?.disabled&&s(),document?.body?.style?.transition&&(document.body.style.transition="all 0s!important"),document?.documentElement?.style?.opacity&&(document.documentElement.style.opacity=1),c("/assets/graphs/coor_each.css",t.coor_each,"coor_each"),c("/assets/graphs/block_images.css",t.block_images,"block_images"),c("/assets/graphs/disable_aboutme.css",t.disable_aboutme,"disable_aboutme"),c("/assets/graphs/board_100vh.css",t.board_100vh,"board_100vh"),c("/assets/graphs/aside_hide.css",!t.show_aside,"aside_hide"),c("/assets/graphs/aside_smaller.css",t.show_aside__smaller,"aside_smaller"),c("/assets/graphs/aside_grayscale.css",t.show_aside__grayscale,"aside_grayscale"),c("/assets/graphs/hide_evaluation.css",t.hide_evaluation,"hide_evaluation"),c("/assets/graphs/add_hyperbullet.css",t.add_hyperbullet,"add_hyperbullet"),c("/assets/graphs/coor_bigger.css",t.coor_bigger,"coor_bigger"),c("/assets/graphs/bigger_controls.css",t.bigger_controls,"bigger_controls"),c("/assets/graphs/disable_cursor.css",t.disable_cursor,"disable_cursor"),c("/assets/graphs/disable_chat.css",t.disable_chat,"disable_chat"),c("/assets/graphs/disable_chat_unless.css",t.disable_chat_unless,"disable_chat_unless"),c("/assets/graphs/reload_disconnect.css",t.reload_disconnect,"reload_disconnect"),c("/assets/graphs/single_resign.css",t.single_resign,"single_resign"),c("/assets/graphs/coor_each__less.css",t.coor_each__less,"coor_each__less"),c("/assets/graphs/focus_mode.css",t.focus_mode,"focus_mode"),g(t.coor_each),u(t.disable_stream),m(t.add_hyperbullet),h(t.add_fullscreen),t.board_100vh&&(document.querySelector(".nav-component").classList.add("collapsed"),document.body.classList.add("nav-collapsed")),f(t.reload_disconnect_1,t.reload_disconnect_2),c("/assets/graphs/square_shaped.css",t.square_shaped,"square_shaped")})}var t;(t=0)&&!isNaN(t)&&(document.body.style.opacity=0,setTimeout(()=>document.body.style.opacity=1,t)),document.addEventListener("DOMContentLoaded",b,!1),document.addEventListener("DOMContentLoaded",function(){d(".coordinates_inj {opacity: 0;} .coordinates_inj__flipped {display: none} #board-single, #board {transition: opacity 200ms ease 50ms}",!0,"BASE_STYLES"),d("#board-single, #board {opacity: 0!important; transition: opacity 0ms linear 0ms!important}",!0,"board_l3_appear")},!1)}})(),(()=>{"use strict";{const a=chrome||browser,r={chrome:"https://chromewebstore.google.com/detail/kdkckejnngdmlcephpnfaggaeofloode/reviews/write",edge:"https://chromewebstore.google.com/detail/kdkckejnngdmlcephpnfaggaeofloode/reviews/write",firefox:"https://addons.mozilla.org/en-US/firefox/addon/chesshelper/reviews/","edge-2":"https://microsoftedge.microsoft.com/addons/detail/piiencmafefnakeddeeecjkehmbgcjdg",opera:"https://chromewebstore.google.com/detail/kdkckejnngdmlcephpnfaggaeofloode/reviews/write"};document.addEventListener("DOMContentLoaded",()=>{const n=(e=navigator.userAgent).includes("Edg")?"edge":e.includes("OPR")?"opera":!e.includes("Chrome")&&e.includes("Firefox")?"firefox":"chrome";var e;n&&r[n]&&a.storage.local.get("closeCount",function(t){if(t.closeCount||a.storage.local.set({closeCount:0}),!t.closeCount||t.closeCount<5){const o=document.createElement("div");var e=a.runtime.getURL("assets/img/logo.svg");o.innerHTML=`
            <div id="ext_show"><div><div class="groupl">${e?`<img src = "${e}" alt = "logo" /> `:""}
            <h1>It would really help.</h1></div><p>If you enjoy using this extension,
            would you mind rate it on the webstore,
            then?</p><a href="${r[n]}" target="_blank" id="rateLink" data-action="RATE">Rate it</a><div class="cls"><span id="closeNotification" data-action="CLOSE" style="cursor: pointer;">No,
            Thanks</span></div></div></div><style id="43ggfdbt5rf">#ext_show img,
            #ext_show p {
              user-select: none;
              pointer-events: none;
            }
      
            #ext_show h1 {
              display: block;
              text-align: left;
              color: #ffffff !important;
              font-weight: 600;
              font-weight: 500;
              font-size: 21px;
              line-height: 21px;
              margin: 0;
            }
      
            #ext_show .groupl {
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 10px 0 10px -5px;
            }
      
            #ext_show h1.first {
              margin-bottom: 5px;
            }
      
            #ext_show p {
              max-width: 290px;
              font-size: 14px;
              font-size: 12.8px;
              font-weight: 400;
              margin: 8px 0 16px;
              color: #868b90 !important;
              line-height: 140%;
              text-align: center;
            }
      
            #ext_show a {
              text-decoration: none !important;
              display: block;
              border: 1px solid rgb(68, 86, 91, 0.5);
              border-radius: 22px;
              padding: 7px 10px;
              margin: 10px auto;
              max-width: 270px;
              background-color: rgba(255, 255, 255, 0.16) !important;
              color: white !important;
              text-align: center;
              font-size: 14px;
              font-size: 14.5px;
            }
      
            #ext_show a:hover {
              text-decoration: none;
              background-color: rgba(255, 255, 255, 0.1) !important;
            }
      
            #ext_show a:focus {
              text-decoration: none;
            }
      
            #ext_show>div {
              transform: scale(1);
              box-shadow: rgba(0, 0, 0, 0.8) 0px 8px 24px;
              z-index: 100000 !important;
              font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
              width: 296px;
              position: fixed;
              top: 10px;
              right: 10px;
              background-color: #161515 !important;
              background-color: rgb(22, 21, 21, 0.96) !important;
              padding: 5px 12px 8px;
              box-sizing: border-box;
              border: 1px solid rgb(68, 86, 91, 0.5);
              z-index: 100;
              border-radius: 12px
            }
      
            #ext_show img {
              margin-right: 10px;
              height: 33px;
              width: auto;
              max-width: 40px;
              box-shadow: 0 2px 2px 2px rgb(33, 33, 30, 0.15);
            }
      
            #ext_show .cls {
              display: flex;
              justify-content: center;
            }
      
            #closeNotification {
              display: inline-block;
              margin: 0 auto;
              padding-left: 4px;
              text-align: center;
              font-size: 11px;
              font-size: 10.5px;
              color: #72767a !important;
            }
      
            #closeNotification:hover {
              text-decoration: underline;
            }
      
            </style>
              `;setTimeout(()=>{document.body.appendChild(o);var e=document.getElementById("closeNotification"),e=(e&&e.addEventListener("click",function(){a.storage.local.set({closeCount:t.closeCount+1}),o.style.display="none"}),document.getElementById("rateLink"));e&&e.addEventListener("click",function(){a.storage.local.set({closeCount:6}),o.style.display="none"})},1e3)}})},!1)}})();