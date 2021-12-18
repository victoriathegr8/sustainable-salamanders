// Update the relevant fields with the new data.
const setDOMInfo = info => {
    document.getElementById('total').textContent = info.total;
    document.getElementById('inputs').textContent = info.inputs;
    document.getElementById('buttons').textContent = info.buttons;
    document.getElementById('manufacturer').textContent = info.manufacturer;
    let manufacturers = [];
    let storage = localStorage["manufacturer"];
    if (storage != undefined) {
        manufacturers = JSON.parse(localStorage["manufacturer"])
    };
    if (manufacturers.length < 1) {
        let manArr = [];
        manArr.push((info.manufacturer));
        localStorage["manufacturer"] = JSON.stringify(manArr);
    } else {
        manufacturers.push((info.manufacturer));
        localStorage["manufacturer"] = JSON.stringify(manufacturers);
    }


  };
  // Once the DOM is ready...
  window.addEventListener('DOMContentLoaded', () => {
    // ...query for the active tab...
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      // ...and send a request for the DOM info...
      chrome.tabs.sendMessage(
          tabs[0].id,
          {from: 'popup', subject: 'DOMInfo'},
          // ...also specifying a callback to be called 
          //    from the receiving end (content script).
          setDOMInfo);
    });
  });