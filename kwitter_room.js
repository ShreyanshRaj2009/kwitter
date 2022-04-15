
//ADD YOUR FIREBASE LINKS HERE
const firebaseConfig = {
      apiKey: "AIzaSyCWwrRV1f8QK4uoO5BWUUNCxw46ZYT0b90",
      authDomain: "kwitter-chat-f7340.firebaseapp.com",
      databaseURL: "https://kwitter-chat-f7340-default-rtdb.firebaseio.com",
      projectId: "kwitter-chat-f7340",
      storageBucket: "kwitter-chat-f7340.appspot.com",
      messagingSenderId: "775498358372",
      appId: "1:775498358372:web:2e810092e579ad61dd0971",
      measurementId: "G-BZ96WPRBMF"
    };

//initialize your firebase here
firebase.initializeApp(firebaseConfig);

username = localStorage.getItem("username");


function getData() {
      firebase.database().ref("/").on('value', function(snapshot) 
      {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function(childSnapshot)
             {
                  childKey  = childSnapshot.key;
                  Room_names = childKey;
                  //Start code

                  row = "<div class = 'roomname' id=" + Room_names + " onclick='redirect(this.id)'>" + Room_names + "</div><hr>"
                  document.getElementById("output").innerHTML += row;
                  

                  //End code
            });
      });
}
getData();
      
function addroom(){

      room = document.getElementById("roomname").value;

      firebase.database().ref("/").child(room).update({

            purpose: "adding roomname"

      });

      localStorage.setItem("roomname", room);
      window.location = "kwitter_chat.html";


}
function log_out(){

      localStorage.removeItem("username");
      localStorage.removeItem("roomname");
      window.location = "kwitter.html";

}