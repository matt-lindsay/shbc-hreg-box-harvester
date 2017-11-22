'Use Strict';

const fs = require('fs');
const moment = require('moment');
const boxHousingFolder = process.env.boxHousingFolder;

var BoxHRegService = function (client) {

    //var timestamp = moment().format('YYYY-MM-DD h:mm:ss a');
    
    var createFolders = function (data, cb) {
        
        // Create folders from 'data' array.
        // Sub folders to be created are stored in a JSON file.
        let subFolders = JSON.parse(fs.readFileSync(__dirname + '/../data/subFolderArray.json'));
        
        //var results = false;
        var timestamp = moment().format('YYYY-MM-DD h:mm:ss a');

        data.forEach(function (folderName) {
            console.log('>>> ' + timestamp + ' Record Found: ' + folderName);
            // SEARCH for the existence of a folder.
            client.search.query(folderName, { type: 'folder', ancestor_folder_ids: boxHousingFolder }, function (err, queryResponse) {
                if (err) console.log(err);
                
                // Obtain the number of folders found matching the search case number.
                //var recordCount = queryResponse.total_count;

                // If a folder doesn't exist, CREATE it and it's sub folders.
                // If the recordCount is 0 then no match is present within Box.
                if (queryResponse.total_count === 0) {
                    createBoxFolders(client, folderName, subFolders, timestamp);
                    //results = true;
                } else { // Else iterate through the returned results and test for a match.
                    let searchResults = queryResponse.entries;
                    
                    matchResults(searchResults, folderName, timestamp).then(function (response) {
                        console.log(response);
                        createBoxFolders(client, folderName, subFolders, timestamp);
                        //results = true;
                    }, function (error) {
                        console.log('>>> Folder already exists.');
                    });
                }
            });
        });
        cb(null, 'Folders created');
    };

    var matchResults = function (searchResults, folderName, timestamp) {
        return new Promise(function (resolve, reject) {

            // Test each result returned in searchResults for a match with folderName. If a match is not returned create the folder.
            let matched = false;

            searchResults.forEach(function (item) {
                if (item.type === 'folder') {
                    console.log('>>> Folders found: ' + item.name);
                    // If a folder does exist, set 'matched' to true.
                    if (item.name.match(folderName)) {
                        console.log('>>> ' + timestamp + 'Matched: ' + item.name);
                        matched = true;
                    } else {
                        console.log('>>> Not Matched: ' + item.name);
                    }
                }
            });
            if (matched === false) {
                resolve('nomatch');
            } else if (matched === true) {
                reject('matched');
            }
        });
    };

    var createBoxFolders = function (client, folderName, subFolders, timestamp) {
        client.folders.create(boxHousingFolder, folderName, function (err, createFolderResponse) {
            if (err) {
                console.log('>>> createBoxFolders Error.');
                console.log(err);
            }

            let createFolderName = createFolderResponse.name;
            let createdFolderId = createFolderResponse.id;

            console.log('>>> Folder created: ' + createFolderName);                       
            
            subFolders.forEach(function (subFolderName) {
                client.folders.create(createdFolderId, subFolderName, function (err, secondSubFolderCreateResponse) {
                    if (err) console.log(err);
                    console.log('>>> ' + timestamp + ' Sub Folder created: ' + subFolderName);
                });
            });
        });
    };

    return {
        createFolders: createFolders
    };
};
module.exports = BoxHRegService;