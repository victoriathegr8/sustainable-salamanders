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
  /*
  if(score<15){
    document.getElementById('circleBar').style.color = "#89C73A";
  } else if(score<20){
    document.getElementById('circleBar').style.color = "#E6D05E";
  }else{
    document.getElementById('circleBar').style.color = "#DB3C32";
  }
  console.log(document.getElementById('circleBar').style.stroke)
  */
});


function hoverChanges() {
  document.body.style.color = "white";
  document.getElementById("main").style.color = "white";
  document.querySelector("span").style.color = "white";
  let smallCircles = document.querySelectorAll(".smaller-circle");
  for (let i = 0; i < smallCircles.length; i++) {
    smallCircles[i].style.background = "rgba(225, 225, 225, 0.5)";
    smallCircles[i].style.color = "black";
    smallCircles[i].style.border = "1.5px solid #EFEFEF";
  }
}

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
    
    document.getElementById('info').addEventListener('click', function() {
      var newURL = "https://www.cdp.net/en";
      chrome.tabs.create({ url: newURL });
    });
    document.getElementById('circleBar').addEventListener('click', function() {
      var newURL = "https://www.sustainalytics.com/";
      chrome.tabs.create({ url: newURL });
    });
    document.getElementById('climate').addEventListener('mouseover', function() {
      document.body.style.backgroundImage = "url('img/climate-background.png')";
      document.getElementById("manufacturer").style.color = "white";
      document.getElementById("submitsearch").src = "img/search.png";
      hoverChanges();
    })
    document.getElementById('circleBar').addEventListener('mouseover', function() {
      document.body.style.backgroundImage = 'none';
      document.body.style.background = "linear-gradient(359.28deg, #D8E6AF 4.1%, rgba(255, 255, 255, 0.25) 96.86%)";
      //window.location.href = "http://stackoverflow.com";
    });

    document.getElementById('forests').addEventListener('mouseover', function() {
      document.body.style.backgroundImage = "url('img/forest-background.png')";
      document.getElementById("manufacturer").style.color = "white";
      document.getElementById("submitsearch").src = "img/search.png";
      hoverChanges();
    });

    document.getElementById('water').addEventListener('mouseover', function() {
      document.body.style.backgroundImage = "url('img/water-background.png')";
      document.getElementById("manufacturer").style.color = "white";
      document.getElementById("submitsearch").src = "img/search.png";

      hoverChanges();
      
    });

        
  
   document.querySelector('svg').addEventListener('mouseover', function() {

      document.body.style.background = "linear-gradient(359.28deg, #D8E6AF 4.1%, rgba(255, 255, 255, 0.25) 96.86%)";
      document.getElementById("main").style.color = "black";
      document.querySelector("span").style.color = "black";
      document.getElementById("manufacturer").style.color = "black";
      document.getElementById("submitsearch").src = "img/searchIcon.png";

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