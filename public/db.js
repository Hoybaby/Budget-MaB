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

request.onupgradeneeded = function (event) {

    const db = event.target.result;
    db.createObjectStore("pending", { autoIncrement: tru });
};

request.onsucess = function (event) {
    db = event.target.result;

    //need to check if app is online before reading from db
    if (navigator.onLine) {
        checkDatabase();
    }
};

request.onerror = function (event) {
    console.log("Woops " + event.target.errorCode);
}

function saveRecord(record) {
    // create a transaction on the pending db with readwrite access
    const transaction = db.transaction(["pending"], "readwrite");

    // access your pending object store
    const store = transaction.objectStore("pending");

    // add record to your store with add method.
    store.add(record);
}

function checkDatabase() {
    //open a transaction on the pending db
    const transaction = db.transaction(["pending"], "readwrite");
    //acces my pending object store
    const store = transaction.objectStore("pending");
    //get all the records from the store
    const getAll = store.getAll();


    getAll.onsuccess = function () {
        if (getAll.result.length > 0) {
            fetch("/api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(() => {
                    // if successful, open a transaction on your pending db
                    const transaction = db.transaction(["pending"], "readwrite");

                    // access your pending object store
                    const store = transaction.objectStore("pending");

                    // clear all items in your store
                    store.clear();
                });
        }
    }
}


// listen for app coming back online
window.addEventListener("online", checkDatabase);


