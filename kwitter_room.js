// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCgfKJ4dku6KhhCQBhv52ctvFeIWqws5IA",
  authDomain: "letschat-21387.firebaseapp.com",
  databaseURL: "https://letschat-21387-default-rtdb.firebaseio.com",
  projectId: "letschat-21387",
  storageBucket: "letschat-21387.appspot.com",
  messagingSenderId: "342940574614",
  appId: "1:342940574614:web:9be13664282224a67d33b7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var room_names= " ";
function load() {
  var user_name= localStorage.getItem("user_name");
  document.getElementById("welcome_name").innerHTML= "Welcome " + user_name +"!";
};

function addRoom() {
  room_name= document.getElementById("roomname").value;
  localStorage.setItem("room_name", room_name);
  firebase.database().ref("/").child(room_name).update({
    purpose : "adding new room"
  });
  window.location= "kwitter_page.html";
};

function getData() {
  firebase.database().ref("/").onDataChange(function (snapshot) {
    document.getElementById("output").innerHTML= " ";
    snapshot.forEach(function (snapshot) {
      room_names= snapshot.key;
      row= "<div class='room_name' id='" + room_names + "' onclick='redirectToRoomName(this.id)'>" + room_names + "</div><hr>";
      var original_output= document.getElementById("output").innerHTML;
      document.getElementById("output").innerHTML= original_output + row;
    });
  });
};

function redirectToRoomName(name) {
  localStorage.setItem("room_name", name);
  window.location= "kwitter_page.html";
};

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location= "index.html";
};