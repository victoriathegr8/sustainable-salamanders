let companyData = [];

document.getElementById('submitsearch').addEventListener('click', function() {
  console.log(document.getElementById("searching").value);
  let selectedCompany = companyData.filter(company => (
    company.companyName === document.getElementById("searching").value
  ))
  console.log(selectedCompany)
  selectedCompany = selectedCompany[0];
  let score = 100 - (selectedCompany.mainScore * 2);
  document.getElementById('manufacturer').textContent = document.getElementById("searching").value;
  document.getElementById('main').innerHTML = score + "<span>%</span>";
  document.getElementById('climate').textContent = selectedCompany.climate;
  document.getElementById('water').textContent = selectedCompany.water;
  document.getElementById('forests').textContent = selectedCompany.forests;
});

// Update the relevant fields with the new data.
const setDOMInfo = info => {  
    let selectedCompany = companyData.filter(company => (
      company.companyName === info.manufacturer
    ))
    selectedCompany = selectedCompany[0];
    let score = 100 - (selectedCompany.mainScore * 2);

    // let style = document.querySelector('style');
    // let innerStyle = "@keyframes anim{100%{stroke-dashoffset: " + (472 - 472 * score) + ";}}"
    // style.innerHTML = innerStyle;

    document.getElementById('manufacturer').textContent = info.manufacturer;
    document.getElementById('main').innerHTML = score + "<span>%</span>";
    document.getElementById('climate').textContent = selectedCompany.climate;
    document.getElementById('water').textContent = selectedCompany.water;
    document.getElementById('forests').textContent = selectedCompany.forests;

    document.getElementById('forests').addEventListener('mouseover', function() {
      document.body.style.backgroundImage = "url('img/forest-background.png')";
    });
    document.getElementById('water').addEventListener('mouseover', function() {
      document.body.style.backgroundImage = "url('img/water-background.png')";
      document.body.style.color = "white";
    });
    // document.querySelector(".loading").style.display = "none";
    // document.querySelector(".main-data").style.display = "block";
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

    document.querySelector(".SearchBar").addEventListener('click', function() {
      document.getElementById("manufacturer").style.display = "none";
    })

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