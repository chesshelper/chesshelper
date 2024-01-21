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


// Initial state object
const initialState = {
  disabled: false,
  dark_mode: true,
  focus_mode: false,
  show_aside: true,
  show_aside__smaller: true,
  show_aside__grayscale: false,
  disable_stream: false,
  add_hyperbullet: true,
  disable_aboutme: false,
  board_100vh: false,
  coor_bigger: false,
  coor_each: false,
  bigger_controls: false,
  disable_chat: false,
  disable_chat_unless: false,
  reload_disconnect: true,
  single_resign: true,
  add_fullscreen: true,
  reload_disconnect_1: true,
  reload_disconnect_2: false,
  theme: "night_owl",
  font: "inter",
  pieces: "default",
  board: "default",
};

const browser_cr = chrome ? chrome : browser;

function initStateIfNotExist() {
  browser_cr.storage.local.get("formState", (result) => {
    // chrome.storage.local.set({ formState: { ...initialState } });
    if (!result.formState || Object.keys(result.formState).length === 0) browser_cr.storage.local.set({ formState: { ...initialState } });
  });
}

initStateIfNotExist();

browser_cr.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'install' || details.reason === 'update') {
    chrome.storage.local.get('welcomePageDisplayed', function (data) {
      if (!data.welcomePageDisplayed && details.reason === 'install') {
        chrome.tabs.create({ url: "https://chesscolibri.pro/welcome" });
        chrome.storage.local.set({ 'welcomePageDisplayed': true });
      } else {
        // chrome.tabs.create({ url: "https://chesscolibri.pro/update-sp" });
      }
    });
  }
});

browser_cr.runtime.setUninstallURL("https://docs.google.com/forms/d/e/1FAIpQLSdd2UnPg2VA3VolpuI4NwB013CNV4HqpaK3XnLVHK7-YYW2hA/viewform?usp=sf_link");