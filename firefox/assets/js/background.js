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
const initialState={disabled:!0,focus_mode:!1,show_aside:!0,show_aside__smaller:!0,show_aside__grayscale:!1,disable_stream:!1,add_hyperbullet:!1,disable_aboutme:!1,board_100vh:!1,coor_bigger:!1,coor_each:!1,bigger_controls:!1,disable_chat:!1,disable_chat_unless:!1,reload_disconnect:!0,single_resign:!1,add_fullscreen:!0,reload_disconnect_1:!0,reload_disconnect_2:!1,theme:"night_owl",font:"inter",pieces:"pjaworski",board:"overheated_stain"},browser_cr=chrome||browser;function initStateIfNotExist(){browser_cr.storage.local.get("formState",e=>{e.formState&&0!==Object.keys(e.formState).length||browser_cr.storage.local.set({formState:{...initialState}})})}initStateIfNotExist(),browser_cr.runtime.onInstalled.addListener(function(){browser_cr.tabs.create({url:"https://chesscolibri.pro/welcome"})}),browser_cr.runtime.setUninstallURL("https://docs.google.com/forms/d/e/1FAIpQLSdd2UnPg2VA3VolpuI4NwB013CNV4HqpaK3XnLVHK7-YYW2hA/viewform?usp=sf_link");