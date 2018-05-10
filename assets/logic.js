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


}) // end of doc.ready