// Your web app's Firebase configuration
const firebaseConfig = {
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

var user_name= localStorage.getItem("user_name");
var room_name= localStorage.getItem("room_name");
var message= " ";

function send() {
    message= document.getElementById("message").value;
    firebase.database().ref("/" + room_name).push({
      name : user_name,
      message : message,
      likes : 0
    });
    document.getElementById("message").value= " ";
};

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
      document.getElementById("output").innerHTML= " ";
      snapshot.forEach(function (snapshot) {
        childKey= snapshot.key;
        childData= snapshot.val();
        if (childKey != "purpose") {
          firebase_message_id= childKey;
          message_data= childData;
          //start code
          console.log(firebase_message_id);
          console.log(message_data);
          var username= message_data['name'];
          var message_of_user= message_data['message'];
          var likes= message_data['likes'];
          var user_name_tag= "<h4>" + username + "<img class='user_tick' src='tick.png'></h4>";
          var message_tag= "<h4 class='message_h4'>" + message_of_user + "</h4>";
          var likes_button= "<button id='" + firebase_message_id + "' class='btn btn-warning' value='" + likes + "' onclick='updateLikes(this.id)'>Likes: " + likes + "</button><hr>";
          var row= user_name_tag + message_tag + likes_button;
          document.getElementById("output").innerHTML += row;   
          //end code
        };
      });
    });
};
getData();

function updateLikes(message_id) {
  var likes= document.getElementById(message_id).value;
  var updated_likes= parseInt(likes) + 1;
  firebase.database().ref("/" + room_name + "/" + message_id).update({
    likes : updated_likes
  });
};

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location= "index.html";
};