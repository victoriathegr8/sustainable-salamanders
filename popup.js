let companyData = [];

// Update the relevant fields with the new data.
const setDOMInfo = info => {
    let selectedCompany = companyData.filter(company => (
      company.companyName === info.manufacturer
    ))
    selectedCompany = selectedCompany[0];
    document.getElementById('manufacturer').textContent = info.manufacturer;
    document.getElementById('main').textContent = selectedCompany.mainScore;
    document.getElementById('climate').textContent = selectedCompany.climate;
    document.getElementById('water').textContent = selectedCompany.water;
    document.getElementById('forests').textContent = selectedCompany.forests;
    // let manufacturers = [];
    // let storage = localStorage["manufacturer"];
    // if (storage != undefined) {
    //     manufacturers = JSON.parse(localStorage["manufacturer"])
    // };
    // if (manufacturers.length < 1) {
    //     let manArr = [];
    //     manArr.push((info.manufacturer));
    //     localStorage["manufacturer"] = JSON.stringify(manArr);
    // } else {
    //     manufacturers.push((info.manufacturer));
    //     localStorage["manufacturer"] = JSON.stringify(manufacturers);
    // }


  };
  // Once the DOM is ready...
  window.addEventListener('DOMContentLoaded', () => {
    fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      companyData = data;
    })
    .catch((err) => {
      //throw(err);
    })
    .finally(() => {
      //finally something
    });
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