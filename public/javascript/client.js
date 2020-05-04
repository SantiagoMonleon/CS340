
var calendar = document.getElementById("calendar")

calendar.onload = function(){
    alert("calendar loaded");
    var test = document.createElement("h1");
    test.textContent = "Load succesfull";
    calendar.appendChild(test);
};