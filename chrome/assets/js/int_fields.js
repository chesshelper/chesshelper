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

import{initialState}from"/assets/js/background.js";(()=>{"use strict";{var e=document.getElementById("l3_settings");const r=e.querySelectorAll(".ch_group"),a=e.querySelectorAll('[data-groupmain="true"]');e.addEventListener("change",t=>{let c=Array.from(r).filter(e=>e.contains(t.target))[0]?.querySelectorAll("input");if(c=c&&Array.from(c).filter(e=>!e.dataset.ignore),Array.from(a).some(e=>e.contains(t.target)))setTimeout(()=>{const t=[],r=(c.forEach(e=>{t.push(e.name)}),c[0].checked),a=t.reduce((e,t)=>(e[t]=r,e),{});r||chrome.storage.local.get("formState",e=>{e.formState?chrome.storage.local.set({formState:{...e.formState,...a}}):chrome.storage.local.set({formState:{...initialState,...a}})})},0);else if(Array.from(r).some(e=>e.contains(t.target))){const l=Array.from(c).reduce((e,t)=>(e[t.name]=t.checked,e),{});let r=Object.values(l).slice(1);var e=r.every(e=>!1===e);let a=r.every(e=>!0===e),o=!e&&!a;chrome.storage.local.get("formState",e=>{var t={[c[0].name]:o||1!==r.length&&!!a||Object.values(l)[0]};e.formState?chrome.storage.local.set({formState:{...e.formState,...l,...t}}):chrome.storage.local.set({formState:{...initialState,...l,...t}})})}})}})();