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
const initialState={disabled:!1,focus_mode:!0,modern_mode:!0,dark_mode:!0,disable_aboutme:!1,board_100vh:!1,coor_bigger:!1,coor_each:!1,bigger_controls:!1,disable_chat:!1,disable_chat_unless:!1,reload_disconnect:!0,single_resign:!1,add_fullscreen:!0,reload_disconnect_1:!0,reload_disconnect_2:!1,board_persp:!1,theme:"ws_type",font:"inter",pieces:"default",board:"default",timestamp:Date.now()},browser_cr=chrome||browser;function initStateIfNotExist(){browser_cr.storage.local.get("formState",e=>{e.formState&&0!==Object.keys(e.formState).length||browser_cr.storage.local.set({formState:{...initialState}})})}initStateIfNotExist(),browser_cr.runtime.onInstalled.addListener(function(t){"install"!==t.reason&&"update"!==t.reason||chrome.storage.local.get("welcomePageDisplayed",function(e){e.welcomePageDisplayed||"install"!==t.reason?"update"===t.reason&&chrome.tabs.create({url:"https://weblxapplications.com/lc/update"}):(chrome.tabs.create({url:"https://weblxapplications.com/lc/welcome"}),chrome.storage.local.set({welcomePageDisplayed:!0}))})}),browser_cr.runtime.setUninstallURL("https://docs.google.com/forms/d/e/1FAIpQLSfH54zUfiG54rUMWu5ynVjQRP0h6tGfseoL56sYoBfke9AGtw/viewform?usp=sf_link");