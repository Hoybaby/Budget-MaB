//need to create indexDB to store data so when a user goes offline, website works in the broswer and then pushes to database when online
//need to establish a variable that will shortcut opening the indexDB
// need a method in order to handle db chances which could be with columns or table additions. will need a onupgrade
//we need an onsuccess  to update a property of a record. a onsuccess is as described below
//ets the associated record from the IDBObjectStore (made available as objectStoreTitleRequest.result), updates one property 
//of the record, and then puts the updated record back into the object store

let db;

const request = window.indexedDB.open("budget, 1");