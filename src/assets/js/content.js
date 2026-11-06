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
    const themes = [ "frutiger_aero_green", "frutiger_aero_dimmed", "night_owl", "purple_dark", "kittens", "ws_type", "srl", "amoled", "chains", "frutiger_aero", "glitter", "greener_green", "pink", "yellow"];
    const pieces = ["anime", "dani_maccari", "itchy", "itchy2", "marble", "ridiculus", "kiwen_suwi", "pjaworski",
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
      "tatiana",
      "maestro"
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

    let backup_links = [];

    async function setLazyPieces(isCustomPieces) {

      const allPieces = document.querySelectorAll(".game-preview-lazy-piece");

      // if there's lazy pieces & not default pieces theme is set
      if(allPieces?.length >0 && isCustomPieces) {
        allPieces.forEach((e, i) => {
          let link = e.src + "";
          let link_fragment = link.split(".")?.at(-2)?.split("/")?.at(-1);

          if(link_fragment?.length == 2) {
            backup_links[i] = e.src;
            e.src = ""
          }
          
          link_fragment && e.classList.add(link_fragment)
        })
      }

      // if set back to default, set links back
      else if(allPieces?.length >0 && !isCustomPieces) {
        allPieces.forEach((e, i) => {
          if(backup_links[i])
            e.src = backup_links[i];
        })
      }
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
      if (pieces.indexOf(selectedPieces) !== -1) {
        setOrRemoveStylesOfItem(`/assets/graphs/pieces/${selectedPieces}.css`, true, selectedPieces);
      }
  
      setLazyPieces(selectedPieces !== "default");
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
        if (document?.body?.style?.transition)
          document.body.style.transition = "all 0s!important";
        if (document?.documentElement?.style?.opacity)
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
        // setOrRemoveStylesOfItem( state.reload_disconnect, "reload_disconnect");
        setOrRemoveStylesOfItem("/assets/graphs/single_resign.css", state.single_resign, "single_resign");
        setOrRemoveStylesOfItem("/assets/graphs/coor_each__less.css", state.coor_each__less, "coor_each__less");
        setOrRemoveStylesOfItem("/assets/graphs/focus_mode.css", state.focus_mode, "focus_mode");


        addConcCoordinates(state.coor_each)
        disableStream(state.disable_stream);
        addHyperbullet(state.add_hyperbullet);
        addFullscreen(state.add_fullscreen);
        collapseAside(state.board_100vh);
        showConnectButtonOrReload(state.reload_disconnect_1, state.reload_disconnect_2)
        setOrRemoveStylesOfItem( state.square_shaped, "square_shaped");

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



// ---- Donate popup ---- //

(() => {
  "use strict";
  (() => {
    const APPEAR_TIMEOUT = 10 * 1000 * 60; 
    // const APPEAR_TIMEOUT = 2000;
    const MAX_CLOSE_COUNT = 5;
    const supported_languages = ["en", "de", "es", "pl", "uk", "sv", "ar", "be", "ru", "fr", "hi", "ja", "nl", "zh", "pt"];
    let current_lang = "en";
    const translations = {
      en: {
        "title": "Your support inspires us to create more!",
        "subtitle_1": "Thank you for using ChessHelper! We (me and my close friend) have put in a lot of time and effort to make your Chess.com experience enjoyable and personalized. If you appreciate what we do, support the project with a small donation. It helps us add new features and keep the extension free for everyone.",
        "title_2": "Why does it matter?",
        "subtitle_2": "Your donation allows us to improve themes, add more fonts and modes, and keep ChessHelper running smoothly.",
        "title_3": "Bonuses for you:",
        "pref_1": "Unique donor badge (in the extension).",
        "pref_2": "Priority access to new features.",
        "pref_3": "The ability to vote for future updates.",
        "don_1": "Donate with PayPal",
        "don_2": "Donate with Ko-Fi.com",
        "don_3": "Donate with Crypto",
        "sup": "Every heart we bring back to Chess.com is thanks to people like you!",
        "rem_btn": "Remind me later",
        "more_btn": "More about the project"
      },
      de: {
        "title": "Ihre Unterstützung inspiriert uns, mehr zu schaffen!",
        "subtitle_1": "Vielen Dank, dass Sie ChessHelper verwenden! Wir (ich und mein enger Freund) haben viel Zeit und Mühe investiert, um Ihr Chess.com-Erlebnis angenehm und personalisiert zu gestalten. Wenn Sie schätzen, was wir tun, unterstützen Sie das Projekt mit einer kleinen Spende. Das hilft uns, neue Funktionen hinzuzufügen und die Erweiterung für alle kostenlos zu halten.",
        "title_2": "Warum ist das wichtig?",
        "subtitle_2": "Ihre Spende ermöglicht es uns, Themen zu verbessern, mehr Schriftarten und Modi hinzuzufügen und ChessHelper stabil zu halten.",
        "title_3": "Boni für Sie:",
        "pref_1": "Einzigartiges Spenderabzeichen (in der Erweiterung).",
        "pref_2": "Prioritärer Zugriff auf neue Funktionen.",
        "pref_3": "Die Möglichkeit, über zukünftige Updates abzustimmen.",
        "don_1": "Spenden mit PayPal",
        "don_2": "Spenden mit Ko-Fi.com",
        "don_3": "Spenden mit Krypto",
        "sup": "Jedes Herz, das wir zu Chess.com zurückbringen, verdanken wir Menschen wie Ihnen!",
        "rem_btn": "Später erinnern",
        "more_btn": "Mehr über das Projekt"
      },
      es: {
        "title": "¡Tu apoyo nos inspira a crear más!",
        "subtitle_1": "¡Gracias por usar ChessHelper! Nosotros (yo y mi amigo cercano) hemos dedicado mucho tiempo y esfuerzo para que tu experiencia en Chess.com sea agradable y personalizada. Si valoras lo que hacemos, apoya el proyecto con una pequeña donación. Esto nos ayuda a añadir nuevas funciones y mantener la extensión gratuita para todos.",
        "title_2": "¿Por qué es importante?",
        "subtitle_2": "Tu donación nos permite mejorar los temas, añadir más fuentes y modos, y mantener ChessHelper funcionando sin problemas.",
        "title_3": "Bonificaciones para ti:",
        "pref_1": "Insignia de donante única (en la extensión).",
        "pref_2": "Acceso prioritario a nuevas funciones.",
        "pref_3": "La posibilidad de votar por futuras actualizaciones.",
        "don_1": "Donar con PayPal",
        "don_2": "Donar con Ko-Fi.com",
        "don_3": "Donar con Cripto",
        "sup": "¡Cada corazón que devolvemos a Chess.com es gracias a personas como tú!",
        "rem_btn": "Recordar más tarde",
        "more_btn": "Más sobre el proyecto"
      },
      pl: {
        "title": "Twoje wsparcie inspiruje nas do tworzenia więcej!",
        "subtitle_1": "Dziękujemy za korzystanie z ChessHelper! My (ja i mój bliski przyjaciel) włożyliśmy wiele czasu i wysiłku, aby uczynić Twoje doświadczenie ze Chess.com przyjemnym i spersonalizowanym. Jeśli doceniasz to, co robimy, wesprzyj projekt drobną darowizną. To pomoże nam dodawać nowe funkcje i utrzymać rozszerzenie bezpłatnym dla wszystkich.",
        "title_2": "Dlaczego to ważne?",
        "subtitle_2": "Twoja darowizna pozwala nam ulepszać motywy, dodawać więcej czcionek i trybów oraz utrzymywać ChessHelper w stabilnym działaniu.",
        "title_3": "Bonusy dla Ciebie:",
        "pref_1": "Unikalna odznaka darczyńcy (w rozszerzeniu).",
        "pref_2": "Priorytetowy dostęp do nowych funkcji.",
        "pref_3": "Możliwość głosowania na przyszłe aktualizacje.",
         "don_1": "Wesprzyj przez PayPal",
        "don_2": "Wesprzyj przez Ko-Fi.com",
        "don_3": "Wesprzyj za pomocą kryptowaluty",
        "sup": "Każde serce, które przywracamy do Chess.com, to zasługa takich osób jak Ty!",
        "rem_btn": "Przypomnij później",
        "more_btn": "Więcej o projekcie"
      },
      uk: {
        "title": "Ваша підтримка надихає нас творити більше!",
        "subtitle_1": "Дякуємо за використання ChessHelper! Ми (я і мій близький друг) доклали багато часу та зусиль, щоб зробити ваш досвід зі Chess.com приємним і персоналізованим. Якщо ви цінуєте те, що ми робимо, підтримайте проєкт невеликою пожертвою. Це допоможе нам додавати нові функції та зберігати розширення безкоштовним для всіх.",
        "title_2": "Чому це важливо?",
        "subtitle_2": "Ваша пожертва дозволяє нам покращувати теми, додавати більше шрифтів і режимів, а також підтримувати стабільну роботу ChessHelper.",
        "title_3": "Бонуси для вас:",
        "pref_1": "Унікальний значок донора (в розширенні).",
        "pref_2": "Пріоритетний доступ до нових функцій.",
        "pref_3": "Можливість голосувати за майбутні оновлення.",
         "don_1": "Пожертвувати через PayPal",
        "don_2": "Пожертвувати через Ko-Fi.com",
        "don_3": "Пожертвувати криптовалютою",
        "sup": "Кожне серце, яке ми повертаємо в Chess.com, — це заслуга таких людей, як ви!",
        "rem_btn": "Нагадати пізніше",
        "more_btn": "Детальніше про проєкт"
      },
      ru: {
        "title": "Ваша поддержка вдохновляет нас творить больше!",
        "subtitle_1": "Спасибо, что используете ChessHelper! Мы (я и мой близкий друг) вложили много времени и усилий, чтобы сделать ваше взаимодействие со Chess.com приятным и персонализированным. Если вы цените то, что мы делаем, поддержите проект небольшим донатом. Это поможет нам добавлять новые функции и поддерживать расширение бесплатным для всех.",
        "title_2": "Почему это важно?",
        "subtitle_2": "Ваш донат позволяет нам улучшать темы, добавлять больше шрифтов и режимов, а также поддерживать стабильную работу ChessHelper.",
        "title_3": "Бонусы для вас:",
        "pref_1": "Уникальный значок донора (в расширении).",
        "pref_2": "Приоритетный доступ к новым функциям.",
        "pref_3": "Возможность голосовать за будущие обновления.",
        "don_1": "Пожертвовать через PayPal",
        "don_2": "Пожертвовать через Ko-Fi.com",
        "don_3": "Пожертвовать криптовалютой",
        "sup": "Каждое сердечко, которое мы возвращаем в Chess.com, — это заслуга таких людей, как вы!",
        "rem_btn": "Напомнить позже",
        "more_btn": "Подробнее о проекте"
      },
      sv: {
        "title": "Ditt stöd inspirerar oss att skapa mer!",
        "subtitle_1": "Tack för att du använder ChessHelper! Vi (jag och min nära vän) har lagt ner mycket tid och ansträngning för att göra din Chess.com-upplevelse trevlig och personlig. Om du uppskattar det vi gör, stöd projektet med en liten donation. Det hjälper oss att lägga till nya funktioner och hålla tillägget gratis för alla.",
        "title_2": "Varför är det viktigt?",
        "subtitle_2": "Din donation gör att vi kan förbättra teman, lägga till fler typsnitt och lägen samt hålla ChessHelper stabilt.",
        "title_3": "Bonusar för dig:",
        "pref_1": "Unikt donatormärke (i tillägget).",
        "pref_2": "Prioriterad tillgång till nya funktioner.",
        "pref_3": "Möjlighet att rösta om framtida uppdateringar.",
        "don_1": "Donera med PayPal",
        "don_2": "Donera med Ko-Fi.com",
        "don_3": "Donera med Kryptovaluta",
        "sup": "Varje hjärta vi återför till Chess.com är tack vare människor som dig!",
        "rem_btn": "Påminn mig senare",
        "more_btn": "Mer om projektet"
      },
      ar: {
        "title": "دعمك يلهمنا للإبداع أكثر!",
        "subtitle_1": "شكرًا لاستخدامك ChessHelper! نحن (أنا وصديقي المقرب) بذلنا الكثير من الوقت والجهد لجعل تجربتك مع Chess.com ممتعة ومخصصة. إذا كنت تقدر ما نقوم به، ادعم المشروع بتبرع صغير. يساعدنا ذلك على إضافة ميزات جديدة والحفاظ على الامتداد مجانيًا للجميع.",
        "title_2": "لماذا هذا مهم؟",
        "subtitle_2": "تبرعك يتيح لنا تحسين الثيمات، إضافة المزيد من الخطوط والأوضاع، والحفاظ على ChessHelper يعمل بسلاسة.",
        "title_3": "المكافآت لك:",
        "pref_1": "شارة مانح فريدة (في الإضافة).",
        "pref_2": "أولوية الوصول إلى الميزات الجديدة.",
        "pref_3": "إمكانية التصويت على التحديثات المستقبلية.",
        "don_1": "تبرع باستخدام PayPal",
        "don_2": "تبرع باستخدام Ko-Fi.com",
        "don_3": "تبرع بالعملات المشفرة",
        "sup": "كل قلب نعيده إلى Chess.com هو بفضل أشخاص مثلك!",
        "rem_btn": "ذكرني لاحقًا",
        "more_btn": "المزيد عن المشروع"
      },
      be: {
        "title": "Ваша падтрымка натхняе нас ствараць больш!",
        "subtitle_1": "Дзякуй, што карыстаецеся ChessHelper! Мы (я і мой блізкі сябар) уклалі шмат часу і намаганняў, каб зрабіць ваш досвед са Chess.com прыемным і персаналізаваным. Калі вы цэніце тое, што мы робім, падтрымайце праект невялікім ахвяраваннем. Гэта дапаможа нам дадаваць новыя функцыі і падтрымліваць пашырэнне бясплатным для ўсіх.",
        "title_2": "Чаму гэта важна?",
        "subtitle_2": "Ваш унёсак дазваляе нам удасканальваць тэмы, дадаваць больш шрыфтоў і рэжымаў, а таксама падтрымліваць стабільную працу ChessHelper.",
        "title_3": "Бонусы для вас:",
        "pref_1": "Унікальны значок донара (у пашырэнні).",
        "pref_2": "Прыярытэтны доступ да новых функцый.",
        "pref_3": "Магчымасць галасаваць за будучыя абнаўленні.",
        "don_1": "Ахвяраваць праз PayPal",
        "don_2": "Ахвяраваць праз Ko-Fi.com",
        "don_3": "Ахвяраваць крыптавалютай",
        "sup": "Кожнае сэрца, якое мы вяртаем у Chess.com, — гэта заслуга такіх людзей, як вы!",
        "rem_btn": "Нагадаць пазней",
        "more_btn": "Даведацца больш пра праект"
      },
      fr: {
        "title": "Votre soutien nous inspire à créer davantage !",
        "subtitle_1": "Merci d'utiliser ChessHelper ! Nous (moi et mon ami proche) avons investi beaucoup de temps et d'efforts pour rendre votre expérience Chess.com agréable et personnalisée. Si vous appréciez ce que nous faisons, soutenez le projet avec un petit don. Cela nous aide à ajouter de nouvelles fonctionnalités et à maintenir l'extension gratuite pour tout le monde.",
        "title_2": "Pourquoi est-ce important ?",
        "subtitle_2": "Votre don nous permet d'améliorer les thèmes, d'ajouter plus de polices et de modes, et de maintenir ChessHelper opérationnel.",
        "title_3": "Bonus pour vous :",
        "pref_1": "Badge de donateur unique (dans l'extension).",
        "pref_2": "Accès prioritaire aux nouvelles fonctionnalités.",
        "pref_3": "Possibilité de voter pour les futures mises à jour.",
        "don_1": "Faire un don avec PayPal",
        "don_2": "Faire un don avec Ko-Fi.com",
        "don_3": "Faire un don avec des cryptomonnaies",
        "sup": "Chaque cœur que nous ramenons sur Chess.com est grâce à des personnes comme vous !",
        "rem_btn": "Me rappeler plus tard",
        "more_btn": "En savoir plus sur le projet"
      },
      hi: {
        "title": "आपका समर्थन हमें और अधिक बनाने के लिए प्रेरित करता है!",
        "subtitle_1": "ChessHelper का उपयोग करने के लिए धन्यवाद! हमने (मैं और मेरे करीबी दोस्त) ने आपका Chess.com अनुभव सुखद और व्यक्तिगत बनाने के लिए बहुत समय और मेहनत लगाई है। यदि आप हमारे कार्य की सराहना करते हैं, तो एक छोटी सी डोनेशन के साथ परियोजना का समर्थन करें। यह हमें नई सुविधाएँ जोड़ने और एक्सटेंशन को सभी के लिए मुफ्त रखने में मदद करता है।",
        "title_2": "यह क्यों मायने रखता है?",
        "subtitle_2": "आपका दान हमें थीम्स सुधारने, अधिक फोंट और मोड्स जोड़ने और ChessHelper को सुचारू रूप से चलाने में सक्षम बनाता है।",
        "title_3": "आपके लिए बोनस:",
        "pref_1": "विशिष्ट दाता बैज (एक्सटेंशन में)।",
        "pref_2": "नई सुविधाओं तक प्राथमिकता पहुंच।",
        "pref_3": "भविष्य के अपडेट के लिए वोट करने की सुविधा।",
        "don_1": "PayPal के माध्यम से दान करें",
        "don_2": "Ko-Fi.com के ज़रिये दान करें",
        "don_3": "क्रिप्टो के माध्यम से दान करें",
        "sup": "Chess.com में हम जो भी दिल वापस लाते हैं, वह आप जैसे लोगों की वजह से है!",
        "rem_btn": "मुझे बाद में याद दिलाएं",
        "more_btn": "परियोजना के बारे में अधिक जानकारी"
      },
      nl: {
        "title": "Jouw steun inspireert ons om meer te creëren!",
        "subtitle_1": "Bedankt voor het gebruik van ChessHelper! Wij (ik en mijn goede vriend) hebben veel tijd en moeite gestoken in het leuker en persoonlijker maken van jouw Chess.com-ervaring. Als je waardeert wat we doen, steun dan het project met een kleine donatie. Het helpt ons om nieuwe functies toe te voegen en de extensie gratis te houden voor iedereen.",
        "title_2": "Waarom is het belangrijk?",
        "subtitle_2": "Jouw donatie stelt ons in staat om thema's te verbeteren, meer lettertypen en modi toe te voegen en ChessHelper soepel te laten draaien.",
        "title_3": "Bonussen voor jou:",
        "pref_1": "Uniek donorbadge (in de extensie).",
        "pref_2": "Prioritaire toegang tot nieuwe functies.",
        "pref_3": "De mogelijkheid om te stemmen voor toekomstige updates.",
        "don_1": "Doneren met PayPal",
        "don_2": "Doneren met Ko-Fi.com",
        "don_3": "Doneren met Crypto",
        "sup": "Elke hart die we terugbrengen naar Chess.com is dankzij mensen zoals jij!",
        "rem_btn": "Herinner me later",
        "more_btn": "Meer over het project"
      },
      zh: {
        "title": "您的支持激励我们创造更多！",
        "subtitle_1": "感谢您使用 ChessHelper！我和我的好友花费了大量时间和精力，为您提供愉快且个性化的 Chess.com 体验。如果您欣赏我们的工作，请通过小额捐款支持这个项目。您的支持将帮助我们添加新功能，并确保扩展对所有人免费。",
        "title_2": "为什么重要？",
        "subtitle_2": "您的捐赠可以帮助我们改进主题、增加更多字体和模式，并确保 ChessHelper 顺畅运行。",
        "title_3": "您将获得的奖励：",
        "pref_1": "独特的捐赠者徽章（在扩展中显示）。",
        "pref_2": "优先使用新功能。",
        "pref_3": "有权投票决定未来的更新。",
        "don_1": "通过PayPal捐赠",
        "don_2": "通过Ko-Fi.com捐赠",
        "don_3": "用加密货币捐赠",
        "sup": "每个回归 Chess.com 的心都要感谢像您这样的人！",
        "rem_btn": "稍后提醒我",
        "more_btn": "了解更多关于项目的信息"
      },
      pt: {
        "title": "Seu apoio nos inspira a criar mais!",
        "subtitle_1": "Obrigado por usar o ChessHelper! Nós (eu e meu amigo próximo) dedicamos muito tempo e esforço para tornar sua experiência no Chess.com agradável e personalizada. Se você aprecia o que fazemos, apoie o projeto com uma pequena doação. Isso nos ajuda a adicionar novos recursos e manter a extensão gratuita para todos.",
        "title_2": "Por que isso é importante?",
        "subtitle_2": "Sua doação nos permite melhorar temas, adicionar mais fontes e modos, e manter o ChessHelper funcionando sem problemas.",
        "title_3": "Bônus para você:",
        "pref_1": "Distintivo exclusivo de doador (na extensão).",
        "pref_2": "Acesso prioritário a novos recursos.",
        "pref_3": "A capacidade de votar nas futuras atualizações.",
        "don_1": "Doar com PayPal",
        "don_2": "Doar com Ko-Fi.com",
        "don_3": "Doar com Criptomoedas",
        "sup": "Cada coração que trazemos de volta ao Chess.com é graças a pessoas como você!",
        "rem_btn": "Lembre-me mais tarde",
        "more_btn": "Mais sobre o projeto"
      },
      ja: {
        "title": "あなたのサポートが私たちの創作意欲を高めます！",
        "subtitle_1": "ChessHelperをご利用いただきありがとうございます！私たち（私と親しい友人）は、Chess.comの体験を楽しくパーソナライズされたものにするために多くの時間と努力を費やしました。私たちの活動を気に入っていただけたら、小さな寄付でプロジェクトをサポートしてください。新しい機能を追加し、この拡張機能をすべての人に無料で提供し続ける助けになります。",
        "title_2": "なぜ重要なのですか？",
        "subtitle_2": "あなたの寄付により、テーマの改善、フォントやモードの追加、ChessHelperの円滑な運営が可能になります。",
        "title_3": "あなたへの特典:",
        "pref_1": "ユニークなドナーバッジ（拡張機能内）。",
        "pref_2": "新機能への優先アクセス。",
        "pref_3": "今後のアップデートへの投票権。",
        "don_1": "PayPalで寄付",
        "don_2": "Ko-Fi.comで寄付",
        "don_3": "暗号通貨で寄付",
        "sup": "Chess.comにハートを取り戻すのは、あなたのような人々のおかげです！",
        "rem_btn": "あとでリマインドする",
        "more_btn": "プロジェクトについてもっと知る"
      },
    };

    const browser_cr = chrome ? chrome : browser;

    function getTranslation() {
      const browser_lang = navigator?.language?.split("-")[0]?.toLowerCase() || "en"

      if (supported_languages.indexOf(browser_lang) !== -1) {
        return browser_lang;
      }
      return "en";
    }
    // set's lang prefix translations[prefix].value
    current_lang = getTranslation();

    const initDonatePopup = () => {
      if (browser_cr?.storage?.local) {
        browser_cr.storage.local.get('closeDonateCount', function (data) {

          // set closeDonateCount if not defined
          if (!data.closeDonateCount) {
            browser_cr.storage.local.set({ 'closeDonateCount': 0 });
          }



          if (!data.closeDonateCount || data.closeDonateCount < MAX_CLOSE_COUNT) {

            // Gets formState.disabled prop
            browser_cr.storage.local.get("formState", (result) => {

              // if(typeof result?.formState?.theme === "string") {
              //   console.log("theme type is a string.", result.formState);
              // } else {
              //   throw new Error('Current state is not defined.');
              // }

              const FOUR_DAYS_IN_MS = 4 * 24 * 60 * 60 * 1000; // 4 days in milliseconds
              const isExtensionDisabled = result?.formState?.disabled;


              const isFourDaysLeftFromInstall = () => {
                const timestamp = result?.formState?.timestamp;
                // console.log("ts from state:", timestamp);
                if (timestamp == null || isNaN(timestamp)) {
                  return true; // treat missing or invalid timestamps as "4 days left"
                }
                return (timestamp + FOUR_DAYS_IN_MS) < Date.now();
              };

              // Check if extension is enabled && isFourDaysLeftFromInstall, and only then append modal window.
              if (!isExtensionDisabled && isFourDaysLeftFromInstall()) {
                // console.log("show");

                // Creating the DOM element using innterHTML in ID wrapper
                const notification = document.createElement('div');
                notification.setAttribute('id', "ext_show_dn");
                const preview = browser_cr.runtime.getURL('assets/img/frog.gif');
                notification.innerHTML = `
            
  <div id="donation-popup">
  <div class="spp__popup-container">
    <div class="img">
      <img src="${preview}" alt="Donate">
    </div>
    <div class="prev"></div>
    <h2>${translations[current_lang].title}</h2>
    <p>${translations[current_lang].subtitle_1}</p>

    <h3>${translations[current_lang].title_2}</h3>
    <p>${translations[current_lang].subtitle_2}</p>

    <h3>${translations[current_lang].title_3}</h3>
    <ul>
      <li>🚀 ${translations[current_lang].pref_1}</li>
      <li>🔓 ${translations[current_lang].pref_2}</li>
      <li>🗳️ ${translations[current_lang].pref_3}</li>
    </ul>

    <div class="donate-as">
      <a href="https://www.paypal.com/donate/?cmd=_donations&business=pjaworski.dev@gmail.com&currency_code=USD" target="_blank" class="donate-btn"">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 800 800" style="enable-background:new 0 0 800 800;" xml:space="preserve">
        <circle style="fill:#0070BA;" cx="400" cy="400" r="387.1"/>
        <path style="fill:#FFFFFF;fill-opacity:0.6;" d="M561.2,285.8c-0.4,2.8-0.9,5.6-1.5,8.5c-19,97.8-84.2,131.5-167.4,131.5H350
          c-10.2,0-18.7,7.4-20.3,17.4L308,580.7l-6.1,39c-1,6.6,4,12.5,10.7,12.5h75.1c8.9,0,16.5-6.5,17.9-15.2l0.7-3.8l14.1-89.8l0.9-4.9
          c1.4-8.8,9-15.3,17.9-15.3h11.2c72.8,0,129.8-29.6,146.4-115.1c7-35.7,3.4-65.6-15.1-86.5C576.2,295.3,569.3,290.1,561.2,285.8z"/>
        <path style="fill:#FFFFFF;fill-opacity:0.8;" d="M541.3,277.8c-2.9-0.8-5.9-1.6-9-2.3c-3.1-0.7-6.3-1.3-9.5-1.8
          c-11.4-1.8-23.9-2.7-37.3-2.7H372.3c-2.8,0-5.4,0.6-7.8,1.8c-5.2,2.5-9.1,7.5-10,13.5l-24.1,152.5l-0.7,4.4
          c1.6-10,10.2-17.4,20.3-17.4h42.4c83.2,0,148.3-33.8,167.4-131.5c0.6-2.9,1-5.7,1.5-8.5c-4.8-2.6-10-4.7-15.7-6.6
          C544.2,278.7,542.7,278.3,541.3,277.8z"/>
        <path style="fill:#FFFFFF;" d="M354.4,286.3c0.9-6,4.8-11,10-13.5c2.4-1.1,5-1.8,7.8-1.8h113.2c13.4,0,25.9,0.9,37.3,2.7
          c3.3,0.5,6.4,1.1,9.5,1.8c3.1,0.7,6.1,1.5,9,2.3c1.4,0.4,2.9,0.9,4.3,1.3c5.6,1.9,10.8,4.1,15.7,6.6c5.7-36.1,0-60.7-19.6-83
          c-21.5-24.5-60.4-35-110.1-35H287.2c-10.2,0-18.8,7.4-20.4,17.4l-60.1,381.2c-1.2,7.5,4.6,14.3,12.2,14.3H308l22.4-142L354.4,286.3z
          "/>
        </svg>
      <span>${translations[current_lang].don_1}</span>
      </a>
        <a href="https://ko-fi.com/patrykjaworski" target="_blank" class="donate-btn"">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 800 800" style="enable-background:new 0 0 800 800;" xml:space="preserve">
      <circle style="fill:#1196CC;" cx="400" cy="400" r="333.3"/>
      <rect x="197.4" y="276.9" style="fill:#DB3535;stroke:#000000;stroke-miterlimit:10;" width="295.2" height="259"/>
      <path style="fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;" d="M570.8,229.9h-35.6h-357c-15.8,0-28.7,12.8-28.7,28.7v264.7
        c0,31.7,25.7,57.4,57.4,57.4h270.9c31.7,0,57.4-25.7,57.4-57.4v-37.4h35.6c68.7,0,124.3-55.7,124.3-124.3v-7.3
        C695.1,285.5,639.5,229.9,570.8,229.9z M535.2,419.5V296.2h32.5c34,0,61.6,27.6,61.6,61.6c0,34-27.6,61.6-61.6,61.6H535.2z
        M397.7,307.8c-33.1,0-54.2,13-63,38.9c-8.9-25.9-29.9-38.9-63-38.9c-49.7,0-68.2,61.9-42.1,102.3c17.4,27,52.4,61.1,105.1,102.3
        c52.7-41.2,87.7-75.3,105.1-102.3C465.8,369.7,447.4,307.8,397.7,307.8z"/>
      </svg>
      <span>${translations[current_lang].don_2}</span>
      </a>
      <a href="https://weblxapplications.com/donate#crypto" target="_blank" class="donate-btn"">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 800 800" style="enable-background:new 0 0 800 800;" xml:space="preserve">
          <g>
              <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="102.3725" y1="820.8485" x2="102.3725" y2="819.8786" gradientTransform="matrix(800 0 0 -800 -81498 656690.875)">
              <stop  offset="0" style="stop-color:#F9AA4B"/>
              <stop  offset="1" style="stop-color:#F7931A"/>
            </linearGradient>
            <path style="fill:url(#SVGID_1_);" d="M776.4,493.8c-51.8,208-262.5,334.4-470.2,282.5C98.2,724.5-28.2,513.8,23.7,306.2
              C75.5,98.2,285.9-28.2,493.8,23.7C701.5,75.2,828.2,285.9,776.4,493.8L776.4,493.8L776.4,493.8z"/>
            <path style="fill:#FFFFFF;" d="M584.7,351.7c7.6-51.5-31.5-79.4-85.5-97.9l17.6-70l-42.4-10.6l-17,68.2
              c-11.2-2.7-22.7-5.5-34.3-7.9l17-68.5l-42.4-10.6l-17.3,69.7c-9.4-2.1-18.5-4.2-27.3-6.4v-0.3l-58.8-14.5l-11.2,45.5
              c0,0,31.5,7.3,30.9,7.6c17.3,4.2,20.3,15.8,19.7,24.9l-20,79.7c1.2,0.3,2.7,0.6,4.5,1.5c-1.5-0.3-3-0.6-4.5-1.2l-27.9,111.5
              c-2.1,5.2-7.6,13-19.4,10c0.3,0.6-30.9-7.6-30.9-7.6l-21.2,48.8l55.5,13.9c10.3,2.7,20.3,5.2,30.3,7.9L282.5,616l42.4,10.6l17.6-70
              c11.5,3,23,6.1,33.9,8.8l-17.3,69.7l42.4,10.6l17.6-70.6c72.7,13.6,127.3,8.2,150-57.6c18.5-52.7-0.9-83.4-39.1-103.4
              C558.4,407.7,579.3,389.2,584.7,351.7L584.7,351.7L584.7,351.7z M487.4,488.1c-13,52.7-102.1,24.2-130.9,17l23.3-93.7
              C408.6,418.6,501.4,432.9,487.4,488.1L487.4,488.1z M500.8,350.7c-12.1,48.2-86.1,23.6-110,17.6l21.2-84.9
              C435.9,289.5,513.2,300.7,500.8,350.7L500.8,350.7z"/>
          </g>
        </svg>
      <span>${translations[current_lang].don_3}</span>
      </a>
    </div>

    <p class="spp__sup"><strong>${translations[current_lang].sup} ❤️</strong></p>

    <div class="close-popup">
      <a class="closeNotification">${translations[current_lang].rem_btn}</a>
      <a href="https://github.com/gerwld/IGPlus-extension/blob/main/README.md" target="_blank">${translations[current_lang].more_btn}</a>
    </div>
  </div>
  
  <button class="close_btn closeNotification">X</button>
</div>



<style id="43ggfdbt5rf">

  #donation-popup {
    position: fixed;
    top: 10px;
    right: 10px;
    max-width: 480px;
    max-height: 100vh;
    max-height: calc(100vh - 22px);
    min-height: 350px;
    overflow: scroll;
    background-color: #1f1f20 !important;
    border: 1px solid rgb(68, 86, 91, 0.5);
    box-shadow: rgba(0, 0, 0, 0.8) 0px 8px 24px;
    border-radius: 15px;
  }
  .spp__popup-container {
    position: relative;
    overflow: hidden;
  }

  .spp__popup-container .img {
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 155px;
    height: 155px;
    opacity: 0.7;
    margin: -5px -12px -8px -14px;
    overflow: hidden;
    pointer-events: none;
    user-select: none;
  }

  .spp__popup-container .prev {
    content: "";
    display: block;
    width: 100%;
    position: absolute;
    left: 0;
    top: 145px;
    height: 10px;
    background:linear-gradient(180deg, rgba(22, 21, 21, 0), rgba(22, 21, 21, 0.2));
    z-index: 1;
  }

  .spp__popup-container .donate-as {
    display: flex;
    flex-flow: wrap;
    flex-wrap: wrap;
    margin-top: 0.5rem;
  }

  .spp__popup-container .donate-as > a {
  display: flex;
  align-items: center;
  overflow: hidden;
  margin: 0 5px 5px 0;
  }

  .spp__popup-container .donate-as > a svg {
  margin-right: 0.3rem;
  width: 1.4rem;
  height: 1.4rem;
  width: 24px;
  height: 24px;
  }

  .spp__popup-container img {
    width: 100%;
    padding-top: 10px;
  }

  .spp__sup,
  .spp__popup-container h2,
  .spp__popup-container h3,
  .spp__popup-container li,
  .spp__popup-container a,
  .spp__popup-container button {
    color: #ffffff
  }

  .spp__popup-container h3 {
    font-size: 20px;
    margin-top: 0.8em;
    margin-bottom: 0.4em;
  }

  .spp__popup-container h2 {
    font-size: 1.5em;
    margin-top: 0.76em;
    margin-bottom: 0.56em;
  }

  .spp__popup-container ul {
    padding: 0 0 0 14px;
    margin: -5px 0 5px;
    font-size: 15px;
  }

  .spp__popup-container li {
    padding: 0;
    margin-bottom: 2px;
    font-size: 15px;
  }

  .spp__popup-container p {
    max-width: 96%;
    font-size: 14px;
    font-size: 13.4px;
    font-weight: 400;
    margin: 8px 0 16px;
    color: #868b90 !important;
    line-height: 140%;
    text-align: left;
  }

  .spp__popup-container .spp__sup {
    margin: 0.4em 0;
  }


  .close_btn,
  .spp__popup-container a,
  .spp__popup-container button {
    text-decoration: none !important;
    display: inline-block;
    overflow-wrap: no-wrap;
    border: 1px solid rgb(68, 86, 91, 0.5);
    border-radius: 10px;
    padding: 7px 10px;
    margin: 3px auto;
    max-width: 400px;
    background-color: #ffffff29 !important;
    color: white !important;
    text-align: center;
    font-size: 14px;
    font-size: 14.5px;
    cursor: pointer;
  }

  .spp__popup-container .close-popup {
    min-height: 33px;
  }

  .spp__popup-container a:hover,
  .spp__popup-container button:hover {
    text-decoration: none;
    background-color: rgba(255, 255, 255, 0.1) !important;
  }

  .spp__popup-container a:focus,
  .spp__popup-container button:focus {
    text-decoration: none;
  }

  .spp__popup-container {
    background-color: #000;
    padding: 5px 12px 8px 14px;
    box-sizing: border-box;
    transform: scale(1);
    border-radius: 15px;
    z-index: 100000 !important;
    font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  button.close_btn {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 100000;
    font-size: 12px;
    line-height: 12px;
    color: #fff;
    color: rgba(255, 255, 255, 0.9)!important;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border-radius: 100px;
  }
</style>

            `;
                const appendPopup = () => {
                  // Append the notification to the body
                  document.body.appendChild(notification);

                  // Event listener to the close button
                  const closeBtn = document.querySelectorAll('.closeNotification');
                  if (closeBtn) {
                    closeBtn?.forEach(e =>
                      e.addEventListener('click', function () {
                        // browser_cr.storage.local.set({ 'closeCount': data.closeDonateCount + 1 });
                        notification.style.display = 'none';
                      }));
                  }

                  // set closeCount -= 1 even if not closed & set new timestamp for 4 days delay
                  browser_cr.storage.local.set({ 'closeDonateCount': (isNaN(data.closeDonateCount) ? 0 : (data.closeDonateCount * 1)) + 1 });
                  if (typeof result?.formState?.theme === "string") {
                    browser_cr.storage.local.set({ formState: { ...result.formState, timestamp: Date.now() } });
                  }
                  // console.log((isNaN(data.closeDonateCount) ? 0 : (data.closeDonateCount * 1)) + 1);

                  // Event listener to the rate link (show one more time after click on donate, after 4 days)
                  const rateLink = document.querySelectorAll('.donate-btn');
                  if (rateLink.length) {
                    rateLink.forEach(l => l.addEventListener('click', function () {
                      browser_cr.storage.local.set({ 'closeDonateCount': MAX_CLOSE_COUNT - 1 });
                      // notification.style.display = 'none';
                    }));
                  }

                  // }
                }
                // Appending with timeout
                setTimeout(appendPopup, APPEAR_TIMEOUT);
              };

            })

          }

        });
      }
    };
    //Init get state and do delay
    document.addEventListener("DOMContentLoaded", initDonatePopup, false);
  })();
})(this);