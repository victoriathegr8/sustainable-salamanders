let number = document.getElementById("number");
let counter = 0;
setInterval(() => {
  if(counter == 65){
    clearInterval();
  }else{
    counter+=1;
    number.innerHTML = counter+"%";
    document.getElementById("circleBar").style.stroke = "rgb(" + counter*3 + "," + counter*3 + "," + 0 + ")"
  }
},30)