$(document).ready(function() {

	// 1. Initialize Firebase
  var config = {
    apiKey: "AIzaSyBgpWBN3m3bMKaTdsynPZSCCraWh-mZ2XQ",
    authDomain: "june2019-a0ce0.firebaseapp.com",
    databaseURL: "https://june2019-a0ce0.firebaseio.com",
    projectId: "june2019-a0ce0",
    storageBucket: "june2019-a0ce0.appspot.com",
    messagingSenderId: "553559315408",
    appId: "1:553559315408:web:b6f27ea4355bbd6e"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

 

  // First Time (pushed back 1 year to make sure it comes before current time)
   
  // 2. Button for adding Trains
  $("#add-train-btn").on("click", function(event) {
  		event.preventDefault();

	 // Grabs user input
	  var trainName = $("#train-name-input").val().trim();
	  var trainDest = $("#dest-input").val().trim();
	  var firstTrain = $("#firstTrain-input").val().trim();
	  var trainFreq = $("#freq-input").val().trim();

	  // Creates local "temporary" object for holding train data
	  var newTrain = {
	  	name: trainName,
	  	destination: trainDest,
	  	start: firstTrain,
	  	frequency: trainFreq
	  };

	  // Uploads train data to the database
  		database.ref().push(newTrain);


	   // Alert
  		alert("Train successfully added");

	 // Clears all of the text-boxes
	  $("#train-name-input").val("");
	  $("#dest-input").val("");
	  $("#firstTrain-input").val("");
	  $("#freq-input").val("");
  	});

  	// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	  console.log(childSnapshot.val());

	  // Store everything into a variable.
	  var trainName = childSnapshot.val().name;
	  var trainDest = childSnapshot.val().destination;
	  var firstTrain = childSnapshot.val().start;
	  var trainFreq = childSnapshot.val().frequency;

  		var trainFreq;

  		// Time is to be entered on the entry form
   		var firstTime = 0;

	    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
	    console.log(firstTimeConverted);

	    //Current Time
	    var currentTime = moment();
	    console.log("Current time: " + moment(currentTime).format("HH:mm"));

	    //Time difference
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("Time difference is: " + diffTime);

		// Modulus
	    var tRemainder = diffTime % trainFreq;
	    console.log(tRemainder);

	    // Minute Until Train
	    var arrivalInMin = trainFreq - tRemainder;
	    console.log("Minutes til next train: " + arrivalInMin);

	    // Next Train
	    var nextTrain = moment().add(arrivalInMin, "minutes");
	    console.log("Arrival time: " + moment(nextTrain).format("HH:mm"));


	  // Add each train's data into the table
	  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + 
	   "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + arrivalInMin + "</td></tr>");
	});

});