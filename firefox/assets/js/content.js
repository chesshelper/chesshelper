//   - This file is part of LichessHelper Extension
//  <https://github.com/gerwld/LichessHelper-extension/blob/main/README.md>,
//   - Copyright (C) 2023-present LichessHelper Extension
//   -
//   - LichessHelper Extension is a software: you can redistribute it, but you are not allowed to modify it under the terms of the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License.
//   -
//   - LichessHelper Extension is distributed in the hope that it will be useful,
//   - but WITHOUT ANY WARRANTY; without even the implied warranty of
//   - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   - Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License for more details.
//   -
//   - You should have received a copy of the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License
//   - along with LichessHelper Extension.  If not, see <https://creativecommons.org/licenses/by-nc-nd/4.0/>.
(()=>{"use strict";{const v=chrome||browser;let o,r,t,e,n,s;const S=["roboto","poppins","caprasimo","playfair","merriweather","noto_sans","nunito","montserrat","pixelify","gabarito","roboto_condensed","inter"],k=["night_owl","purple_dark","kittens","ws_type","srl","modern","amoled"],E=["anime","dani_maccari","itchy","itchy2","marble","mom_still_loves_them","kiwen_suwi","pjaworski","cburnett","cburnett_jp","pjaworski_ice","pjaworski_metal","pjaworski_forest","pjaworski_bluelake","pjaworski_bluelake2","pjaworski_purple","pjaworski_pink","new_metropol","ancient_set","32bit_lucas312","letters","pjaworskim_mramor","pjaworskim_metal","pjaworskim_blue","pjaworski_muesli"],C=["anime","arcade","gray_eyes","peppermint","blackwhite","green2","polarizer","darkblue","purple","disa_board","middaysun","teal","disa_night","overheated_stain","webpunk","glass","paperice","wood","26brown","deepblue","losangeles","softlightblue","26dmblue","dmblue2","midblue","softpurple","autumn","field","nightindesert","someunix","bluenblack","iceberg","revo","twilight","dbhc","jelly","softbrown","emerald","industrial"];function l(){(document.getElementById("board")||document.getElementById("board-single"))?.querySelector("canvas")&&location.reload()}function c(t){-1!==k.indexOf(t)&&m(`/assets/graphs/themes/${t}.css`,!0,t),k.filter(e=>e!==t).forEach(e=>document.getElementById(e)?.remove())}function d(t){-1!==S.indexOf(t)&&m(`/assets/graphs/fonts/${t}.css`,!0,t),S.filter(e=>e!==t).forEach(e=>document.getElementById(e)?.remove())}function m(e,r,n){fetch(v.runtime.getURL(e)).then(e=>e.text()).then(e=>{var t=document.getElementById(n),o=document.createElement("style");o.textContent=e,o.setAttribute("id",n),r&&!t?document.head.appendChild(o):!r&&t instanceof Node&&document.head.removeChild(t)}).catch(e=>{})}function u(e,t,o){var r=document.getElementById(o),n=document.createElement("style");n.textContent=e,n.setAttribute("id",o),t&&!r?document.head.appendChild(n):!t&&r instanceof Node&&document.head.removeChild(r)}v.storage.local.get("formState",e=>{e=e.formState.disabled?{show_aside:!0}:e.formState;c(e.theme),d(e.font)});let a;function p(t){clearInterval(e),t&&!a&&(e=setInterval(function(){var e=document.querySelector("cg-container");t&&e&&!a&&(a=!0,console.log('[LichessHelper]: Removed Board EL "wheel"'),e.addEventListener("wheel",function(e){e.stopPropagation()},!0))},20))}function g(o){function e(){var e=document.querySelector("section.mchat"),t=window.pageYOffset||document.documentElement.scrollTop;o&&5<t&&e&&window.scrollTo(0,0)}clearInterval(n),clearInterval(s),o?(n=setInterval(function(){document.querySelector("section.mchat")&&o&&!document.getElementById("prevent_scroll")&&(console.log('[LichessHelper]: Found Match Mode. Set 100vh Fix."'),m("/assets/graphs/prevent_scroll.css",!0,"prevent_scroll"))},20),s=setInterval(e,1e3),e()):m("/assets/graphs/prevent_scroll.css",!1,"prevent_scroll")}function h(e){clearInterval(o);var t=window.location.href&&window.location.href.includes("/home")||"https://lichess.org"===window.location.href||"https://lichess.org/"===window.location.href;e&&t?o=setInterval(function(){var e=document.querySelector(".tv-player-component"),t=document.querySelector(".layout-column-two").querySelectorAll(".v5-section");e&&(e.remove(),t)&&t.length&&t.forEach(e=>{e.querySelector('[href*="/member"].v5-header-name')&&e.remove(),e.querySelector('[href*="/tv"].v5-header-name')&&e.remove()})},200):clearInterval(o)}function b(e){clearInterval(r);var t=window.location.href&&window.location.href.includes("/play/")||window.location.href&&window.location.href.includes("/game/");e&&t?r=setInterval(function(){var e=document.querySelector(".toggle-custom-game-button");document.querySelector('[data-cy="time-selector-category-30"')||"More Time Controls"!=e?.innerText||e.click()},20):e||("Fewer Time Controls"==(t=document.querySelector(".toggle-custom-game-button"))?.innerText&&t.click(),clearInterval(r))}function f(o){var e=document.createElementNS("http://www.w3.org/2000/svg","svg"),t=o?"coordinates_inj coordinates_inj__flipped":"coordinates_inj coordinates_inj__normal";e.setAttribute("version","1.1"),e.setAttribute("class",t),e.setAttribute("viewBox","0 0 100 100");for(let t=0;t<8;t++){var r,n=document.createElementNS("http://www.w3.org/2000/svg","g");t%2!=0&&((r=document.createElement("text")).setAttribute("font-size","0"),r.setAttribute("transform","matrix(1 0 0 1 0 0)"),n.appendChild(r));for(let e=7;0<=e;e--){var s=document.createElementNS("http://www.w3.org/2000/svg","text");s.setAttribute("transform","matrix(1 0 0 1 "+(8.1+12.4*t)+" "+(11.5+12.4*e)+")"),s.setAttribute("font-size","3.4px"),s.textContent=o?String.fromCharCode(104-t)+(e+1):String.fromCharCode(97+t)+(8-e),n.appendChild(s)}e.appendChild(n)}return e}function _(e){clearInterval(t),u("coords {display: none!important}",e,"board_vis-l3"),e&&!document?.querySelectorAll("cg-board")[0]?.querySelector(".coordinates_inj")?t=setInterval(async function(){var e,t,o=document.querySelectorAll("cg-board");o?.length&&o[0]&&!o[0].querySelector(".coordinates_inj")&&(e=f(),t=f(!0),o[0].appendChild(e),o[0].appendChild(t))},20):e||clearInterval(t)}function y(e){if(e){let t=!1;e=document.createElement("div");function o(){document.exitFullscreen&&document.fullscreenElement?document?.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen()}e.innerHTML='<button class="fullscreen_pgl">Enter Full Screen</button><style>.fullscreen_pgl {position: fixed;  bottom: 0;  right: 10px;  z-index: 10;  border-radius: 0;    border-top-left-radius: 0px;    border-top-right-radius: 0px;  border: 1px solid #404040;  padding: 3px 6px;  background: linear-gradient(to bottom, hsl(37, 7%, 25%), hsl(37, 5%, 22%) 100%);  color: #ccc;  border-top-left-radius: 2px;  border-top-right-radius: 2px;  font-size: 0.96rem; opacity: 0.7; min-height: 26px; display: block;} .fullscreen_pgl:hover {opacity: 1}</style>',e.addEventListener("click",function(){var e=document.querySelector(".fullscreen_pgl");t?(e.innerHTML="Enter Full Screen",o()):(e.innerHTML="Exit Full Screen",(e=document.documentElement).requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.msRequestFullscreen&&e.msRequestFullscreen()),t=!t},!1),document.querySelector(".fullscreen_pgl")||document.querySelector("body").appendChild(e),document.addEventListener("fullscreenchange",function(){var e=document.querySelector(".fullscreen_pgl");!document.fullscreenElement&&t&&(e.innerHTML="Enter Full Screen",o(document.documentElement),t=!1)},!1)}else document.querySelectorAll(".fullscreen_pgl")?.forEach(e=>e.remove())}v.storage.local.onChanged.addListener((e,t)=>{e.formState&&e.formState.newValue&&e.formState.oldValue&&JSON.stringify({...e.formState.newValue})!==JSON.stringify({...e.formState.oldValue})&&(w({...e.formState.oldValue}),!1===e.formState.newValue.disable_board_scroll&&!0===e.formState.oldValue.disable_board_scroll||!0===e.formState.newValue.disabled&&!1===e.formState.oldValue.disabled||e.formState.newValue.board_100vh!==e.formState.oldValue.board_100vh)&&(console.log("[LichessHelper]: Reloading to apply settings."),location.reload())});let i=!1;function w(o){v.storage.local.get("formState",async e=>{var t=e.formState.disabled?{show_aside:!0}:e.formState;c(t.theme),d(t.font),async function(t,e,o){var r=JSON.parse(localStorage.getItem("boardOptionsCache"));!o&&r&&"arcade"!==r?.animationType&&"natural"!==r?.animationType&&await new Promise(e=>setTimeout(e,200)),t!==e&&o&&(l(),u("#board-single, #board {opacity: 0!important; transition: opacity 0ms linear 0ms!important}",!0,"board_l3_appear"),setTimeout(()=>{document.getElementById("board_l3_appear")?.remove()},100)),-1!==E.indexOf(t)&&m(`/assets/graphs/pieces/${t}.css`,!0,t),E.filter(e=>e!==t).forEach(e=>document.getElementById(e)?.remove())}(t.pieces,o.pieces,i),async function(t,e,o){var r=JSON.parse(localStorage.getItem("boardOptionsCache"));!o&&r&&"arcade"!==r?.animationType&&"natural"!==r?.animationType&&await new Promise(e=>setTimeout(e,200)),t!==e&&o&&(l(),u("#board-single, #board {opacity: 0!important; transition: opacity 0ms linear 0ms!important}",!0,"board_l3_appear"),setTimeout(()=>{document.getElementById("board_l3_appear")?.remove()},100)),-1!==C.indexOf(t)&&m(`/assets/graphs/boards/${t}.css`,!0,t),C.filter(e=>e!==t).forEach(e=>document.getElementById(e)?.remove())}(t.board,o.board,i),i||(i=!0,setTimeout(()=>{document.getElementById("board_l3_appear")?.remove()},200)),1==o?.disabled&&0==e?.formState?.disabled&&"boolean"==typeof o?.disabled&&"boolean"==typeof e?.formState?.disabled&&l(),document.body.style.transition="all 0s!important",document.documentElement.style.opacity=1,m("/assets/graphs/coor_each.css",t.coor_each,"coor_each"),m("/assets/graphs/block_images.css",t.block_images,"block_images"),m("/assets/graphs/disable_aboutme.css",t.disable_aboutme,"disable_aboutme"),m("/assets/graphs/board_100vh.css",t.board_100vh,"board_100vh"),m("/assets/graphs/aside_hide.css",!t.show_aside,"aside_hide"),m("/assets/graphs/aside_smaller.css",t.show_aside__smaller,"aside_smaller"),m("/assets/graphs/aside_grayscale.css",t.show_aside__grayscale,"aside_grayscale"),m("/assets/graphs/add_hyperbullet.css",t.add_hyperbullet,"add_hyperbullet"),m("/assets/graphs/coor_bigger.css",t.coor_bigger,"coor_bigger"),m("/assets/graphs/bigger_controls.css",t.bigger_controls,"bigger_controls"),m("/assets/graphs/disable_cursor.css",t.disable_cursor,"disable_cursor"),m("/assets/graphs/disable_chat.css",t.disable_chat,"disable_chat"),m("/assets/graphs/disable_chat_unless.css",t.disable_chat_unless,"disable_chat_unless"),m("/assets/graphs/single_resign.css",t.single_resign,"single_resign"),m("/assets/graphs/coor_each__less.css",t.coor_each__less,"coor_each__less"),m("/assets/graphs/focus_mode.css",t.focus_mode,"focus_mode"),m("/assets/graphs/modern_mode.css",t.modern_mode,"modern_mode"),m("/assets/graphs/hide_chat.css",t.hide_chat,"hide_chat"),m("/assets/graphs/board_persp.css",t.board_persp,"board_persp"),_(t.coor_each),h(t.disable_stream),b(t.add_hyperbullet),y(t.add_fullscreen),p(t.disable_board_scroll),g(t.prevent_scroll)})}var x;(x=0)&&!isNaN(x)&&(document.body.style.opacity=0,setTimeout(()=>document.body.style.opacity=1,x)),document.addEventListener("DOMContentLoaded",w,!1),document.addEventListener("DOMContentLoaded",function(){u(".coordinates_inj {opacity: 0;} .coordinates_inj__flipped {display: none} #board-single, #board {transition: opacity 200ms ease 50ms}",!0,"BASE_STYLES"),u("#board-single, #board {opacity: 0!important; transition: opacity 0ms linear 0ms!important}",!0,"board_l3_appear"),setTimeout(()=>{u("cg-board {animation: none!important;}",!0,"anim_none_fix")},300)},!1)}})(),(()=>{"use strict";{const n=chrome||browser,s={chrome:"https://chromewebstore.google.com/detail/lichess-custom-themes-boa/jmbbkjpjhchfelfflgainekgdmoddgcg/reviews",firefox:"https://addons.mozilla.org/en-US/firefox/addon/lichesshelper/reviews/",edge:"https://chromewebstore.google.com/detail/lichess-custom-themes-boa/jmbbkjpjhchfelfflgainekgdmoddgcg/reviews",opera:"https://chromewebstore.google.com/detail/lichess-custom-themes-boa/jmbbkjpjhchfelfflgainekgdmoddgcg/reviews"};document.addEventListener("DOMContentLoaded",()=>{const r=(e=navigator.userAgent).includes("Edg")?"edge":e.includes("OPR")?"opera":!e.includes("Chrome")&&e.includes("Firefox")?"firefox":"chrome";var e;r&&s[r]&&n.storage.local.get("closeCount",function(t){if(t.closeCount||n.storage.local.set({closeCount:0}),!t.closeCount||t.closeCount<5){const o=document.createElement("div");o.setAttribute("id","ext_show");var e=n.runtime.getURL("assets/img/logo.svg");o.innerHTML=`
            <div><div class="groupl">${e?`<img src = "${e}" alt = "logo" /> `:""}
            <h1>It would really help.</h1></div><p>If you enjoy using this extension,
            would you mind rate it on the webstore,
            then?</p><a href="${s[r]}" target="_blank" id="rateLink" data-action="RATE">Rate it</a><div class="cls"><span id="closeNotification" data-action="CLOSE" style="cursor: pointer;">No,
            Thanks</span></div></div><style id="43ggfdbt5rf">#ext_show img,
            #ext_show p {
              user-select: none;
              pointer-events: none;
            }

            #ext_show h1 {
              display: block;
              text-align: left;
              color: #ffffff !important;
              font-weight: 600;
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
              z-index: 1000000 !important;
              font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
              width: 296px;
              position: fixed;
              top: 10px;
              right: 10px;
              background-color: #161515 !important;
              background-color: rgb(22, 21, 21, 1) !important;
              padding: 5px 12px 8px;
              box-sizing: border-box;
              border: 1px solid rgb(68, 86, 91, 0.5);
              border-radius: 12px;
            }

            #ext_show img {
              margin-right: 10px;
              height: 33px;
              width: auto;
              max-width: 40px;
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
              `;setTimeout(()=>{document.body.appendChild(o);var e=document.getElementById("closeNotification"),e=(e&&e.addEventListener("click",function(){o.style.display="none"}),t.closeCount&&n.storage.local.set({closeCount:closeCount-1}),document.getElementById("rateLink"));e&&e.addEventListener("click",function(){n.storage.local.set({closeCount:6}),o.style.display="none"})},6e5)}})},!1)}})();