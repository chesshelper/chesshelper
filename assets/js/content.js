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

(() => {
  "use strict";
  (() => {
    const browser_cr = chrome ? chrome : browser;
    let interval0, interval1, interval2, interval3;
    const fonts = ["roboto", "poppins", "caprasimo", "playfair", "merriweather", "noto_sans", "nunito", "montserrat", "pixelify", "gabarito", "roboto_condensed", "inter"];
    const themes = ["night_owl", "purple_dark", "kittens", "ws_type", "srl", "amoled", "chains", "frutiger_aero", "glitter", "greener_green", "pink", "yellow"];
    const pieces = ["anime", "dani_maccari", "itchy", "itchy2", "marble", "mom_still_loves_them", "kiwen_suwi", "pjaworski",
      "cburnett",
      "cburnett_jp",
      "pjaworski_ice",
      "pjaworski_metal",
      "pjaworski_forest",
      "pjaworski_bluelake",
      "pjaworski_bluelake2",
      "pjaworski_purple",
      "pjaworski_pink",
      "new_metropol",
      "ancient_set",
      "32bit",
      "letters",
      "pjaworskim_mramor",
      "pjaworskim_metal",
      "pjaworskim_blue",
      "pjaworski_muesli",
      "anarcandy",
      "celtic",
      "dbenbenn",
      "fantasy",
      "gioco",
      "leipzig",
      "staunty",
      "cardinal",
      "chess7",
      "dubrovny",
      "fresca",
      "icpieces",
      "libra",
      "spatial",
      "tatiana"
    ];
    const boards = ["anime", "arcade", "gray_eyes", "peppermint", "blackwhite", "green2", "polarizer", "darkblue", "purple", "disa_board", "middaysun", "teal", "disa_night", "overheated_stain", "webpunk", "glass", "paperice", "wood", "26brown", "deepblue", "losangeles", "softlightblue",
      "26dmblue", "dmblue2", "midblue", "softpurple",
      "autumn", "field", "nightindesert", "someunix",
      "bluenblack", "iceberg", "revo", "twilight",
      "dbhc", "jelly", "softbrown", "emerald", "industrial"];

    console.log("boards: " + boards.length + ", pieces: " + pieces.length + ", themes: " + themes.length);

    function locReloadIfCanvas() {
      const board = document.getElementById('board') || document.getElementById('board-single');
      if (board?.querySelector("canvas"))
        location.reload()
    }


    function setTheme(selectedTheme) {
      if (themes.indexOf(selectedTheme) !== -1)
        setOrRemoveStylesOfItem(`/assets/graphs/themes/${selectedTheme}.css`, true, selectedTheme);
      themes.filter((e) => e !== selectedTheme).forEach((theme) => document.getElementById(theme)?.remove());
    }


    function setFont(selectedFont) {
      if (fonts.indexOf(selectedFont) !== -1)
        setOrRemoveStylesOfItem(`/assets/graphs/fonts/${selectedFont}.css`, true, selectedFont);
      fonts.filter((e) => e !== selectedFont).forEach((font) => document.getElementById(font)?.remove());
    }


    async function setPieces(selectedPieces, oldStatePieces, isInit) {
      const lsBoardCache = JSON.parse(localStorage.getItem("boardOptionsCache"));
      // Timeout for appear and override if not canvas, otherways without any delay
      if (!isInit && lsBoardCache && lsBoardCache?.animationType !== "arcade" && lsBoardCache?.animationType !== "natural") {
        await new Promise(r => setTimeout(r, 200));
      }
      //If pieces changed & isInit
      if (selectedPieces !== oldStatePieces && isInit) {
        locReloadIfCanvas();
        setOrRemoveStylesOfItemLocal(`#board-single, #board {opacity: 0!important; transition: opacity 0ms linear 0ms!important}`, true, "board_l3_appear");
        setTimeout(() => {
          document.getElementById("board_l3_appear")?.remove();
        }, 100);
      }
      //If pieces exist set them, remove others
      if (pieces.indexOf(selectedPieces) !== -1)
        setOrRemoveStylesOfItem(`/assets/graphs/pieces/${selectedPieces}.css`, true, selectedPieces);
      pieces.filter((e) => e !== selectedPieces).forEach((pieces) => document.getElementById(pieces)?.remove());
    }


    async function setBoard(selectedBoard, oldSelectedBoardState, isInit) {
      const lsBoardCache = JSON.parse(localStorage.getItem("boardOptionsCache"));
      // Timeout for appear and override if not canvas, otherways without any delay
      if (!isInit && lsBoardCache && lsBoardCache?.animationType !== "arcade" && lsBoardCache?.animationType !== "natural") {
        await new Promise(r => setTimeout(r, 200));
      }
      //If board changed & isInit
      if (selectedBoard !== oldSelectedBoardState && isInit) {
        locReloadIfCanvas();
        setOrRemoveStylesOfItemLocal(`#board-single, #board {opacity: 0!important; transition: opacity 0ms linear 0ms!important}`, true, "board_l3_appear");
        setTimeout(() => {
          document.getElementById("board_l3_appear")?.remove();
        }, 100);
      }
      //If board exist set it, remove others
      if (boards.indexOf(selectedBoard) !== -1)
        setOrRemoveStylesOfItem(`/assets/graphs/boards/${selectedBoard}.css`, true, selectedBoard);
      boards.filter((e) => e !== selectedBoard).forEach((board) => document.getElementById(board)?.remove());
    }


    browser_cr.storage.local.get("formState", (result) => {
      const state = result.formState.disabled ? { show_aside: true } : result.formState;
      setTheme(state.theme);
      setFont(state.font);
    });



    function splashScreenDelay(delay = 1000) {
      if (delay && !isNaN(delay)) {
        document.body.style.opacity = 0;
        setTimeout(() => (document.body.style.opacity = 1), delay);
      }
    }

    function setOrRemoveStylesOfItem(assetPath, item, item_id) {
      // Fetch the CSS file and append it
      fetch(browser_cr.runtime.getURL(assetPath))
        .then((response) => response.text())
        .then((css) => {
          let current = document.getElementById(item_id);
          let style = document.createElement("style");
          style.textContent = css;
          style.setAttribute("id", item_id);
          if (item && !current) document.head.appendChild(style);
          else if (!item && current instanceof Node) document.head.removeChild(current);
        }).catch(e => { });
    }


    function setOrRemoveStylesOfItemLocal(css, item, item_id) {
      let current = document.getElementById(item_id);
      let style = document.createElement("style");
      style.textContent = css;
      style.setAttribute("id", item_id);
      if (item && !current) document.head.appendChild(style);
      else if (!item && current instanceof Node) document.head.removeChild(current);
    }


    function collapseAside(isCollapsed) {
      if (isCollapsed) {
        const aside = document.querySelector(".nav-component");
        aside.classList.add("collapsed")
        document.body.classList.add("nav-collapsed")
      }
    }


    // Listen for changes in browser_cr.storage.local
    browser_cr.storage.local.onChanged.addListener((changes, namespace) => {
      if (
        changes.formState &&
        changes.formState.newValue &&
        changes.formState.oldValue &&
        JSON.stringify({ ...changes.formState.newValue }) !== JSON.stringify({ ...changes.formState.oldValue })
      ) {
        getCurrentState({ ...changes.formState.oldValue });
      }

    });


    // Removes Stream Block at the Main page
    function disableStream(state) {
      clearInterval(interval1);

      function disable() {
        const streamBlock = document.querySelector(".tv-player-component"),
          asideHeaders = document.querySelector(".layout-column-two").querySelectorAll(".v5-section");
        if (streamBlock) {
          streamBlock.remove()
          if (asideHeaders && asideHeaders.length) {
            asideHeaders.forEach(e => {
              e.querySelector('[href*="/member"].v5-header-name') && e.remove();
              e.querySelector('[href*="/tv"].v5-header-name') && e.remove()
            }
            )
          }
        }
      }
      const isHome =
        window.location.href && window.location.href.includes("/home")
        || window.location.href === "https://chess.com"
        || window.location.href === "https://chess.com/";

      if (state && isHome) {
        interval1 = setInterval(disable, 200)
      } else {
        clearInterval(interval1);
      }
    }



    // Adds Hyperbullet option to Time selection
    function addHyperbullet(state) {
      clearInterval(interval2);

      function add() {
        const clickMoreBtn = document.querySelector(".toggle-custom-game-button")
        const hyperBulletBtn = document.querySelector('[data-cy="time-selector-category-30"')

        !hyperBulletBtn && clickMoreBtn?.innerText == "More Time Controls" && clickMoreBtn.click()
      }

      const isGame =
        window.location.href && window.location.href.includes("/play/")
        || window.location.href && window.location.href.includes("/game/")

      if (state && isGame) {
        interval2 = setInterval(add, 20)
      } else if (!state) {
        const clickMoreBtn = document.querySelector(".toggle-custom-game-button");
        clickMoreBtn?.innerText == "Fewer Time Controls" && clickMoreBtn.click()
        clearInterval(interval2);
      }
    }



    function generateCoordinates(isFlipped) {
      // Create the SVG element
      let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      let current_class = isFlipped ? "coordinates_inj coordinates_inj__flipped" : "coordinates_inj coordinates_inj__normal";
      svg.setAttribute('version', '1.1');
      svg.setAttribute('class', current_class);
      svg.setAttribute('viewBox', '0 0 100 100');

      // Create the 'g' elements
      for (let i = 0; i < 8; i++) {
        let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        // Include empty text element at the beginning for even rows
        if (i % 2 !== 0) {
          let emptyText = document.createElement('text');
          emptyText.setAttribute('font-size', '0');
          emptyText.setAttribute('transform', 'matrix(1 0 0 1 0 0)');
          g.appendChild(emptyText);
        }
        for (let j = 7; j >= 0; j--) {
          let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          text.setAttribute('transform', 'matrix(1 0 0 1 ' + (8.1 + i * 12.4) + ' ' + (11.5 + j * 12.4) + ')');
          text.setAttribute('font-size', '3.4px');

          // If board is flipped then reverse only values
          if (isFlipped) {
            text.textContent = String.fromCharCode(104 - i) + (j + 1);
          } else {
            text.textContent = String.fromCharCode(97 + i) + (8 - j);
          }
          g.appendChild(text);
        }
        svg.appendChild(g);
      }
      return svg
    }


    // Adds Concrete Coordinates to each square
    // & flips it if board is on black side
    function addConcCoordinates(state) {
      clearInterval(interval3);

      async function changeCoordinates() {
        const board = document.getElementById('board') || document.getElementById('board-single');
        if (board && board.querySelector(".coordinates"))
          board.querySelector(".coordinates").style.opacity = "0"

        if (!board?.querySelector(".coordinates_inj")) {
          const coordinates = generateCoordinates();
          const coordinates_flipped = generateCoordinates(true);

          // Append the SVG elements to the 'board' element. Both flipped & not
          board.appendChild(coordinates);
          board.appendChild(coordinates_flipped);
        }

        // Color coordinates based on the current board theme (if css var's not accessible)
        if (false && !board?.querySelector(".coordinates_inj__colored")) {
          await new Promise(r => setTimeout(r, 20));
          const color1 = getComputedStyle(document.querySelector(".coordinates").querySelectorAll("text")[0]).fill;
          const color2 = getComputedStyle(document.querySelector(".coordinates").querySelectorAll("text")[1]).fill;
          setOrRemoveStylesOfItemLocal(`.coordinates_inj text {fill: ${color2}!important;} .coordinates_inj text:nth-child(2n) {fill: ${color1}!important;} `, state, "coor_each__local")
          board?.querySelector(".coordinates_inj").classList.add("coordinates_inj__colored")
        }
      }


      const isGame =
        window.location.href && window.location.href.includes("/play/")
        || window.location.href && window.location.href.includes("/game/");

      // Keep searching if state & isGame
      if (state && isGame) {
        interval3 = setInterval(changeCoordinates, 20)
      }
      // Else, if not state reverse changes & clear
      else if (!state) {
        clearInterval(interval3);
        const board = document.getElementById('board') || document.getElementById('board-single');
        if (board?.querySelector(".coordinates")) {
          board.querySelector(".coordinates").style.display = "block"
          board.querySelector(".coordinates").style.opacity = "1"
          board.querySelectorAll(".coordinates_inj").forEach(e => e.remove())
        }
      }
    }

    function addFullscreen(state) {
      if (state) {
        let isFullscreen = false;
        const fullscreenBlock = document.createElement("div")
        fullscreenBlock.innerHTML = `<button class="fullscreen_pgl">Enter Full Screen</button><style>.fullscreen_pgl {position: fixed;bottom: 10px;right: 10px;z-index: 10; border: none; padding: 4px 5px; background-color: rgb(128, 128, 128, 0.5); border-radius: 4px; color: white;}</style>`;

        function enterFullScreen(element) {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();     // Firefox
          } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();  // Safari
          } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();      // IE/Edge
          }
        };

        function exitFullscreen() {
          if (document.exitFullscreen && document.fullscreenElement) {
            document?.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
        };

        function onEscPressedEscape() {
          const btn = document.querySelector(".fullscreen_pgl");
          if (!document.fullscreenElement && isFullscreen) {
            btn.innerHTML = "Enter Full Screen"
            exitFullscreen(document.documentElement)
            isFullscreen = false;
          }
        }

        function onFullscreen() {
          const btn = document.querySelector(".fullscreen_pgl");
          if (isFullscreen) {
            btn.innerHTML = "Enter Full Screen"
            exitFullscreen();
          } else {
            btn.innerHTML = "Exit Full Screen"
            enterFullScreen(document.documentElement)
          }
          isFullscreen = !isFullscreen;
        }

        fullscreenBlock.addEventListener("click", onFullscreen, false)
        !document.querySelector(".fullscreen_pgl") && document.querySelector("body").appendChild(fullscreenBlock)
        document.addEventListener("fullscreenchange", onEscPressedEscape, false)
      } else {
        document.querySelectorAll(".fullscreen_pgl")?.forEach(e => e.remove())
      }
    }

    // Reloads page when you're disconnected popup appear. Both manual or automatic
    function showConnectButtonOrReload(manual, automatic) {
      clearInterval(interval0);

      function reloadPage() {
        location.reload()
        window.location.href = window.location.href;
      }

      function tryToFind() {
        const parents = document.querySelectorAll(".alerts-alert");
        parents.forEach(parent => {
          if (parent.innerText.includes("refresh the page")) {

            if (manual || automatic) {
              if (!parent.querySelector(".reload_pgdl")) {
                console.log("[ChessHelper]: Founded reload popup. Adding button.");
                const reloadBtn = document.createElement("div")
                reloadBtn.innerHTML = `<button class="reload_pgdl">Click to Reload</button><style>.reload_pgdl {order: 1} .alerts-info {display: flex; align-items: center} .alerts-close {order: 2}</style>`;
                reloadBtn.addEventListener("click", reloadPage, false);
                parent.appendChild(reloadBtn)
              }
            }
            if (automatic) {

            }
          }
        })
      }

      // Keep searching if at least any mode. Otherways clean
      if (manual || automatic) {
        interval0 = setInterval(tryToFind, 200)
      }
      else {
        document.querySelector(".reload_pgdl")?.remove();
        clearInterval(interval0);
      }
    }

    let isInit = false;
    function getCurrentState(oldState) {

      browser_cr.storage.local.get("formState", async (result) => {
        // Checks if extension is disabled or not
        const state = result.formState.disabled ? { show_aside: true } : result.formState;

        setTheme(state.theme);
        setFont(state.font);
        setPieces(state.pieces, oldState.pieces, isInit);
        setBoard(state.board, oldState.board, isInit);

        // Set init, appear 
        if (!isInit) {
          isInit = true;
          setTimeout(() => {
            document.getElementById("board_l3_appear")?.remove();
          }, 200);
        }


        //Reload if disabled prop changes & its canvas
        if (oldState?.disabled == true
          && result?.formState?.disabled == false
          && typeof oldState?.disabled == "boolean"
          && typeof result?.formState?.disabled == "boolean") {
          locReloadIfCanvas();
        }


        // To prevent layout bouncing
        document.body.style.transition = "all 0s!important";
        document.documentElement.style.opacity = 1;



        // Styles setters
        setOrRemoveStylesOfItem("/assets/graphs/coor_each.css", state.coor_each, "coor_each");
        setOrRemoveStylesOfItem("/assets/graphs/block_images.css", state.block_images, "block_images");
        setOrRemoveStylesOfItem("/assets/graphs/disable_aboutme.css", state.disable_aboutme, "disable_aboutme");
        setOrRemoveStylesOfItem("/assets/graphs/board_100vh.css", state.board_100vh, "board_100vh");
        setOrRemoveStylesOfItem("/assets/graphs/aside_hide.css", !state.show_aside, "aside_hide");
        setOrRemoveStylesOfItem("/assets/graphs/aside_smaller.css", state.show_aside__smaller, "aside_smaller");
        setOrRemoveStylesOfItem("/assets/graphs/aside_grayscale.css", state.show_aside__grayscale, "aside_grayscale");
        setOrRemoveStylesOfItem("/assets/graphs/hide_evaluation.css", state.hide_evaluation, "hide_evaluation");
        setOrRemoveStylesOfItem("/assets/graphs/add_hyperbullet.css", state.add_hyperbullet, "add_hyperbullet");
        setOrRemoveStylesOfItem("/assets/graphs/coor_bigger.css", state.coor_bigger, "coor_bigger");
        setOrRemoveStylesOfItem("/assets/graphs/bigger_controls.css", state.bigger_controls, "bigger_controls");
        setOrRemoveStylesOfItem("/assets/graphs/disable_cursor.css", state.disable_cursor, "disable_cursor");
        setOrRemoveStylesOfItem("/assets/graphs/disable_chat.css", state.disable_chat, "disable_chat");
        setOrRemoveStylesOfItem("/assets/graphs/disable_chat_unless.css", state.disable_chat_unless, "disable_chat_unless");
        setOrRemoveStylesOfItem("/assets/graphs/reload_disconnect.css", state.reload_disconnect, "reload_disconnect");
        setOrRemoveStylesOfItem("/assets/graphs/single_resign.css", state.single_resign, "single_resign");
        setOrRemoveStylesOfItem("/assets/graphs/coor_each__less.css", state.coor_each__less, "coor_each__less");
        setOrRemoveStylesOfItem("/assets/graphs/focus_mode.css", state.focus_mode, "focus_mode");


        addConcCoordinates(state.coor_each)
        disableStream(state.disable_stream);
        addHyperbullet(state.add_hyperbullet);
        addFullscreen(state.add_fullscreen);
        collapseAside(state.board_100vh);
        showConnectButtonOrReload(state.reload_disconnect_1, state.reload_disconnect_2)
        setOrRemoveStylesOfItem("/assets/graphs/square_shaped.css", state.square_shaped, "square_shaped");

      });
    }

    function updateVisuals() {
      setOrRemoveStylesOfItemLocal(`.coordinates_inj {opacity: 0;} .coordinates_inj__flipped {display: none} #board-single, #board {transition: opacity 200ms ease 50ms}`, true, "BASE_STYLES");
      setOrRemoveStylesOfItemLocal(`#board-single, #board {opacity: 0!important; transition: opacity 0ms linear 0ms!important}`, true, "board_l3_appear");
    }

    //Init get state and do delay
    splashScreenDelay(0);
    document.addEventListener("DOMContentLoaded", getCurrentState, false);
    document.addEventListener("DOMContentLoaded", updateVisuals, false);

  })();
})(this);



// ---- Rate extension popup ---- //

(() => {
  "use strict";
  (() => {
    const APPEAR_TIMEOUT = 10 * 1000 * 60;
    // const APPEAR_TIMEOUT = 1000;
    const MAX_CLOSE_COUNT = 5;
    const browser_cr = chrome ? chrome : browser;
    const STORE_LINKS = {
      "chrome": "https://chromewebstore.google.com/detail/kdkckejnngdmlcephpnfaggaeofloode/reviews/write",
      "edge": "https://chromewebstore.google.com/detail/kdkckejnngdmlcephpnfaggaeofloode/reviews/write",
      "firefox": "https://addons.mozilla.org/en-US/firefox/addon/chesshelper/reviews/",
      "edge-2": "https://microsoftedge.microsoft.com/addons/detail/piiencmafefnakeddeeecjkehmbgcjdg",
      "opera": "https://chromewebstore.google.com/detail/kdkckejnngdmlcephpnfaggaeofloode/reviews/write"
    }

    function detectBrowser() {
      const agent = navigator.userAgent;
      if (agent.includes("Edg")) return "edge";
      if (agent.includes("OPR")) return "opera";
      if (agent.includes("Chrome")) return "chrome";
      if (agent.includes("Firefox")) return "firefox";

      // Default to Chrome
      return "chrome";
    }

    const initRateMePopup = () => {
      const browser = detectBrowser();

      if (browser && STORE_LINKS[browser]) {
        browser_cr.storage.local.get('closeCount', function (data) {

          if (!data.closeCount) {
            browser_cr.storage.local.set({ 'closeCount': 0 });
          }

          if (!data.closeCount || data.closeCount < MAX_CLOSE_COUNT) {
            const notification = document.createElement('div');
            const logo = browser_cr.runtime.getURL('assets/img/logo.svg');
            notification.innerHTML = `
            <div id="ext_show"><div><div class="groupl">${logo ? `<img src = "${logo}" alt = "logo" /> ` : ''}
            <h1>It would really help.</h1></div><p>If you enjoy using this extension,
            would you mind rate it on the webstore,
            then?</p><a href="${STORE_LINKS[browser]}" target="_blank" id="rateLink" data-action="RATE">Rate it</a><div class="cls"><span id="closeNotification" data-action="CLOSE" style="cursor: pointer;">No,
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
              `;

            const appendPopup = () => {
              // Append the notification to the body
              document.body.appendChild(notification);

              // Event listener to the close button
              const closeBtn = document.getElementById('closeNotification');
              if (closeBtn) {
                closeBtn.addEventListener('click', function () {
                  browser_cr.storage.local.set({ 'closeCount': data.closeCount + 1 });
                  notification.style.display = 'none';
                });
              }

              // Event listener to the rate link
              const rateLink = document.getElementById('rateLink');
              if (rateLink) {
                rateLink.addEventListener('click', function () {
                  browser_cr.storage.local.set({ 'closeCount': MAX_CLOSE_COUNT + 1 });
                  notification.style.display = 'none';
                });
              }

              // }
            }
            setTimeout(appendPopup, APPEAR_TIMEOUT);
          }
        });
      }
    };
    //Init get state and do delay
    document.addEventListener("DOMContentLoaded", initRateMePopup, false);
  })();
})(this);