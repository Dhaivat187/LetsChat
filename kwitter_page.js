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

          //end code
        };
      });
    });
};
getData();

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location= "index.html";
};