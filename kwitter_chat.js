
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
 roomname = localStorage.getItem("roomname");

 function getData() 
 { 
   firebase.database().ref("/"+roomname).on('value', function(snapshot) 
   { 
     document.getElementById("output").innerHTML = "";
     snapshot.forEach(function(childSnapshot) 
    {
       childKey  = childSnapshot.key; 
       childData = childSnapshot.val();
       
       if(childKey != "purpose"){

        firebase_message_id = childKey;
        message_Data = childData;
        console.log(firebase_message_id);
        console.log(message_Data);

        Name = message_Data["name"];
        Message = message_Data["message"];
        Like = message_Data["like"];

        Namehtml = "<h4>" + Name + "<img src = 'tick.png' class = 'user_tick'> </h4>";
        Messagehtml = "<h4 class = 'message_h4'>" + Message + "</h4>";
        Likehtml = "<button class = 'btn btn-success' id =" + firebase_message_id + " value = " + Like + "onclick = 'newlike(this.id)' >";
        span = "<span class = 'glyphicon glyphicon-thumbs-up'>Likes : " + Like + "</span> </button><hr>";

        Row = Namehtml + Messagehtml + Likehtml + span;
        document.getElementById("output").innerHTML += Row;

       }
       //End code
        });  }); }
getData();

function newlike(message_id){

  button_id = message_id;
  likes = document.getElementById(button_id).value;
  
  updated_likes = Number(likes) + 1;
  
  firebase.database().ref(roomname).child(message_id).update({

    like: updated_likes

  })

}

function send(){

    text = document.getElementById("message").value;

    firebase.database().ref("/").child(roomname).push({
        
        name: username,
        message: text,
        like: 0

  });

  document.getElementById("message").value = " ";



}



function log_out(){

    localStorage.removeItem("username");
    localStorage.removeItem("roomname");
    window.location = "kwitter.html";

}



