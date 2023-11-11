import { initialState } from "/assets/js/background.js";

(() => {
  "use strict";
  (() => {
    const form = document.getElementById("l3_settings");
    const all_groups = form.querySelectorAll(".ch_group");
    const groupmain_btns = form.querySelectorAll('[data-groupmain="true"]');

    form.addEventListener("change", (e) => {
      const parent = Array.from(all_groups).filter((i) => i.contains(e.target));
      let inputs = parent[0]?.querySelectorAll("input");

      if (inputs)
        // Find and remove exceptions 
        inputs = Array.from(inputs).filter(e => !e.dataset.ignore)

      // Check if click was direct in main item checkbox (parent)
      if (Array.from(groupmain_btns).some((element) => element.contains(e.target))) {
        setTimeout(() => {
          const arr = [];
          // Iterate over each input
          inputs.forEach((i) => {
            arr.push(i.name);
          });

          // Set all to true if inputs[0] is checked, otherwise set all to false
          const isChecked = inputs[0].checked;
          const newGroupState = arr.reduce((result, element) => {
            result[element] = isChecked;
            return result;
          }, {});
          if (!isChecked) {
            chrome.storage.local.get("formState", (result) => {
              if (!result.formState) {
                chrome.storage.local.set({ formState: { ...initialState, ...newGroupState } });
              } else {
                chrome.storage.local.set({ formState: { ...result.formState, ...newGroupState } });
              }
            });
          }
        }, 0);
      }
      // If it was a group child but not the first one, then
      else if (Array.from(all_groups).some((element) => element.contains(e.target))) {
        const newGroupState = Array.from(inputs).reduce((result, el) => {
          result[el.name] = el.checked;
          return result;
        }, {});

        let objvalues = Object.values(newGroupState).slice(1);
        let isAllNotSelectedExceptTheFirstOne = objvalues.every((item) => item === false);
        let isAllSelectedExceptTheFirstOne = objvalues.every((item) => item === true);
        let isAnySelectedExceptTheFirstOneButNotAll = !isAllNotSelectedExceptTheFirstOne && !isAllSelectedExceptTheFirstOne;

        chrome.storage.local.get("formState", (result) => {
          let newValueForTheFirstOne = {
            [inputs[0].name]: isAnySelectedExceptTheFirstOneButNotAll
              ? true : objvalues.length === 1 ? Object.values(newGroupState)[0]
                : isAllSelectedExceptTheFirstOne
                  ? true
                  : Object.values(newGroupState)[0]
          };

          if (!result.formState) {
            chrome.storage.local.set({ formState: { ...initialState, ...newGroupState, ...newValueForTheFirstOne } });
          } else {
            chrome.storage.local.set({ formState: { ...result.formState, ...newGroupState, ...newValueForTheFirstOne } });
          }
        });
      }
    });
  })();
})();
