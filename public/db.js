//need to create indexDB to store data so when a user goes offline, website works in the broswer and then pushes to database when online
//need to establish a variable that will shortcut opening the indexDB
// need a method in order to handle db chances which could be with columns or table additions. will need a onupgrade
//we need an onsuccess  to update a property of a record. a onsuccess is as described below
//ets the associated record from the IDBObjectStore (made available as objectStoreTitleRequest.result), updates one property 
//of the record, and then puts the updated record back into the object store
// in case of an error we should have a method just like onsuccess that calls for error if it occurs with onerror
//after several functions we need a way to save the data

let db;

const request = window.indexedDB.open("budget, 1");

request.onupgradeneeded = function(event) {

    const db = event.target.result;
    db.createObjectStore("pending", { autoIncrement: tru});
};

request.onsucess = function(event) {
    db = event.target.result;

    //need to check if app is online before reading from db
    if (navigator.onLine) {
        checkDatabase();
    }
};

request.onerror = function(event) {
    console.log("Woops " + event.target.errorCode);
}

