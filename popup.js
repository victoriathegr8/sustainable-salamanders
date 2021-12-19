let companyData = [];
let homebg;

document.getElementById('submitsearch').addEventListener('click', function() {
  console.log(document.getElementById("searching").value);
  let searchValue = document.getElementById("searching").value;
  searchValue = searchValue.charAt(0).toUpperCase() + searchValue.slice(1).toLowerCase();
  console.log(searchValue)
  let selectedCompany = companyData.filter(company => (
    company.companyName === searchValue
  ))
  selectedCompany = selectedCompany[0];
  let score = 100 - (selectedCompany.mainScore * 2);
  if (selectedCompany.mainScore < 20) {
    homebg = "linear-gradient(359.28deg, #D8E6AF 4.1%, rgba(255, 255, 255, 0.25) 96.86%)";
  } else homebg = "linear-gradient(359.28deg, #E6C3AF 4.1%, rgba(255, 255, 255, 0.25) 96.86%)";
  document.body.style.background = homebg;
  document.getElementById('manufacturer').textContent = searchValue;
  document.getElementById("searching").value = "";
  document.getElementById('main').innerHTML = score + "<span>%</span>";
  let el = document.getElementById('circleBar');
  el.classList.remove("anim");
  void el.offsetWidth;
  el.classList.add("anim");
  document.getElementById('climate').textContent = selectedCompany.climate;
  document.getElementById('water').textContent = selectedCompany.water;
  document.getElementById('forests').textContent = selectedCompany.forests;
  if (selectedCompany.warning.length > 0) {
    document.getElementById('warning-text').innerHTML = "&nbsp;" + selectedCompany.warning;
    document.getElementById('warning-icon').src= "img/warning.png";
  } else {
    document.getElementById('warning-text').innerHTML = "&nbsp;No current warnings";
    document.getElementById('warning-icon').src= "img/check.png";
  }
  document.querySelector('svg').addEventListener('click', function() {
    let newURL = selectedCompany.mainScoreLink;
    chrome.tabs.create({ url: newURL });
  });
  
  if(score>60){
    document.getElementById('circleBar').setAttribute('style','stroke: #89C73A');
  } else if(score>55){
    document.getElementById('circleBar').setAttribute('style','stroke: #E6D05E');
  }else{
    document.getElementById('circleBar').setAttribute('style','stroke: #DB3C32');
  }
  
});

document.querySelector("body").addEventListener('click', function(e) {
  if (e.target.id != "searching") {
    document.getElementById("manufacturer").style.display = "block";
  }
})

function hoverChanges() {
  document.querySelector(".warning").style.display = "none";
  document.body.style.color = "white";
  document.getElementById("main").style.color = "white";
  document.querySelector("span").style.color = "white";
  let smallCircles = document.querySelectorAll(".smaller-circle");
  for (let i = 0; i < smallCircles.length; i++) {
    smallCircles[i].style.background = "rgba(225, 225, 225, 0.5)";
    smallCircles[i].style.color = "black";
    smallCircles[i].style.border = "1.5px solid #EFEFEF";
  }
  document.getElementById("info").style.display = "block";
  document.getElementById("manufacturer").style.color = "white";
  document.getElementById("submitsearch").src = "img/white-search.png";
}

// Update the relevant fields with the new data.
const setDOMInfo = info => {  
    info.manufacturer = info.manufacturer.split(' ')[0];
    console.log(info.manufacturer);
    let selectedCompany = companyData.filter(company => (
      company.companyName === info.manufacturer
    ))
    selectedCompany = selectedCompany[0];
    let score = 100 - (selectedCompany.mainScore * 2);

    if (selectedCompany.mainScore < 20) {
      homebg = "linear-gradient(359.28deg, #D8E6AF 4.1%, rgba(255, 255, 255, 0.25) 96.86%)";
    } else homebg = "linear-gradient(359.28deg, #E6C3AF 4.1%, rgba(255, 255, 255, 0.25) 96.86%)";
    document.body.style.background = homebg;

    //let style = document.querySelector('style');
    //let innerStyle = "@keyframes anim{100%{stroke-dashoffset: " + (472 - 472 * score).toString() + ";}}"
    //style.innerHTML = innerStyle;

    document.getElementById('manufacturer').textContent = info.manufacturer;
    document.getElementById('main').innerHTML = score + "<span>%</span>";
    document.getElementById('climate').textContent = selectedCompany.climate;
    document.getElementById('water').textContent = selectedCompany.water;
    document.getElementById('forests').textContent = selectedCompany.forests;
    if (selectedCompany.warning.length > 0) {
      document.getElementById('warning-text').innerHTML = "&nbsp;" + selectedCompany.warning;
      document.getElementById('warning-icon').src= "img/warning.png";
    } else {
      document.getElementById('warning-text').innerHTML = "&nbsp;No current warnings";
      document.getElementById('warning-icon').src= "img/check.png";
    }
    
    
    document.getElementById('info').addEventListener('click', function() {
      var newURL = "https://www.cdp.net/en/companies/companies-scores";
      chrome.tabs.create({ url: newURL });
    });
    document.querySelector('svg').addEventListener('click', function() {
      let newURL = selectedCompany.mainScoreLink;
      chrome.tabs.create({ url: newURL });
    });
    document.getElementById('climate').addEventListener('mouseover', function() {
      document.body.style.backgroundImage = "url('img/climate-background.png')";
      document.getElementById("info").style.background = "#65504F";
      hoverChanges();
    })
    document.getElementById('circleBar').addEventListener('mouseover', function() {
      document.body.style.backgroundImage = 'none';
      document.body.style.background = homebg;
      //window.location.href = "http://stackoverflow.com";
    });

    document.getElementById('forests').addEventListener('mouseover', function() {
      document.body.style.backgroundImage = "url('img/forest-background.png')";
      document.getElementById("info").style.background = "#8D9575";
      hoverChanges();
    });

    document.getElementById('water').addEventListener('mouseover', function() {
      document.body.style.backgroundImage = "url('img/water-background.png')";
      document.getElementById("info").style.background = "#556176";
      hoverChanges();
      
    });

        
  
   document.querySelector('svg').addEventListener('mouseover', function() {
    let smallCircles = document.querySelectorAll(".smaller-circle");
    for (let i = 0; i < smallCircles.length; i++) {
      smallCircles[i].style.background = "#14213D";
      smallCircles[i].style.color = "white";
      smallCircles[i].style.border = "none";
    }
      document.body.style.background = homebg;
      document.getElementById("main").style.color = "black";
      document.querySelector("span").style.color = "black";
      document.body.style.color = "black";
      document.getElementById("manufacturer").style.color = "black";
      document.getElementById("submitsearch").src = "img/black-search.png";
      document.getElementById("info").style.display = "none";
      document.querySelector(".warning").style.display = "flex";
    });

  
    
  //document.body.style.color = "white";
  // let smallCircles = document.querySelectorAll(".smaller-circle");
  // for (let i = 0; i < smallCircles.length; i++) {
  //   smallCircles[i].style.background = "rgba(225, 225, 225, 0.5)";
  //   smallCircles[i].style.color = "white";
  //   smallCircles[i].style.border = "none";
  // }


    // document.getElementById('water').addEventListener('mouseover', function() {
    //   document.body.style.backgroundImage = "url('img/water-background.png')";
    //   document.body.style.color = "white";
    // });
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