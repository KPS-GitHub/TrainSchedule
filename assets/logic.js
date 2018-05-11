$(document).ready( function() {


// FIREBASE
var config = {
    apiKey: "AIzaSyBuMGkwmRP4B5YV5IoxwMoM7Z1pY6pPJGY",
    authDomain: "train-schedule-homework-775ae.firebaseapp.com",
    databaseURL: "https://train-schedule-homework-775ae.firebaseio.com",
    projectId: "train-schedule-homework-775ae",
    storageBucket: "",
    messagingSenderId: "978449382203"
};

firebase.initializeApp(config);

var database = firebase.database();


// INITIAL RENDERING OF PAGE HTML

// store table html in variable as string
var tableHtml = '<div class="row">'
                    + '<div class="col-lg-12">'
                        + '<div class="card card-primary">'
                            + '<div class="card-heading'
                                + '<h3 class="card-title"><strong>Train Schedule</strong></h3>'
                            + '</div>'
                            + '<div class="card-body">'
                                + '<table class="table table-hover" id="train-table">'
                                    + '<thead>'
                                        + '<tr>'
                                            + '<th>Train Name</th>'
                                            + '<th>Destination</th>'
                                            + '<th>Frequency</th>'
                                            + '<th>Next Arrival</th>'
                                            + '<th>Minutes Away</th>'
                                        + '</tr>'
                                    + '</thead>'
                                    + '<tbody></tbody>'
                                + '</table>'
                            + '</div>'
                        + '</div>'
                    + '</div>'
                + '</div>';

// render table html
$("#content").append(tableHtml);
    


// store form html in variable as string
var formHtml = '<div class="row">'
                   + '<div class="col-lg-12">'
                        + '<div class="card card-primary">'
                            + '<div class="card-heading">'
                                + '<h3 class="card-title"><strong>Add Train</strong></h3>'
                            + '</div>' 
                            + '<div class="card-body">'
                                + '<form>'
                                    + '<div class="form-group row">'
                                        + '<label for="train-name-input">Train Name</label>'
                                        + '<input class="form-control" id="train-name-input" type="text">'
                                    + '</div>'
                                    + '<div class="form-group row">'
                                        + '<label for="train-destination-input">Train Destination</label>'
                                        + '<input class="form-control" id="train-destination-input" type="text">'
                                    + '</div>' 
                                    + '<div class="form-group row">'
                                        + '<label for="train-time-input">First Train Time (HH:mm - military time)</label>'
                                        + '<input class="form-control" id="train-time-input" type="text">'
                                    + '</div>'
                                    + '<div class="form-group row">'
                                        + '<label for="train-frequency-input">Frequency (min)</label>'
                                        + '<input class="form-control" id="train-frequency-input" type="text">'
                                    + '</div>' 
                                    + '<button class="btn btn-primary" id="add-train-btn" type="submit">Submit</button>'
                                + '</form>'
                            + '</div>'
                        
                        + '</div>'
                    + '</div>'
                + '</div>' ;

// render form html
$("#content").append(formHtml);

// END OF INITIAL PAGE RENDERING


// CORE FUNCTIONALITY
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#train-destination-input").val().trim();
    var trainTime = moment($("#train-time-input").val().trim(), "HH:mm").format("X");
    var trainFrequency = $("#train-frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      time: trainTime,
      frequency: trainFrequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);
  
    // Alert
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#train-destination-input").val("");
    $("#train-time-input").val("");
    $("#train-frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;
  
    // train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

  
    // Calculate how many minutes away the next train is
    var trainTimeMinusYear = moment(trainTime, "X") - (365*24*60*60); // in seconds
    var minutesAway = (trainFrequency) - ((moment().diff(trainTimeMinusYear, "m")) % (trainFrequency));
    console.log(minutesAway);

    var nextArrival = moment.unix(moment().add("minutes", (12*60))).add("minutes", minutesAway).format("LTS");
  
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
  });

}) // end of doc.ready