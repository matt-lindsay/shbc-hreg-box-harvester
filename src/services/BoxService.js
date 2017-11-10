'Use Strict';

const fs = require('fs');
const Box = require('box-node-sdk');
const moment = require('moment');

var BoxService = function () {
    
    var boxClientID = process.env.boxClientID;
    var boxClientSecret = process.env.boxClientSecret;
    var privateKey = process.env.boxPrivateKey;
    var publicKeyId = process.env.boxKeyID;
    var publicKeyPassphrase = process.env.boxKeyPassphrase;
    var boxEnterpriseId = process.env.boxEnterpriseId;

    var createFolders = function (data, cb) {
        var sdk = new Box({
            clientID: boxClientID,
            clientSecret: boxClientSecret,
            appAuth: {
                keyID: publicKeyId,
                privateKey: privateKey,
                passphrase: publicKeyPassphrase
            }
        });

        var client = sdk.getAppAuthClient('enterprise', boxEnterpriseId);
        client.asUser('281003709'); // 281003709 me, 1429785787 another user.

        // Housing Option: 22303582137
        // 02 Housing Documents: 22304818963 ** CREATE FOLDERS HERE **
        // Dev: 14274812032
        
        // Create folders from 'data' array.
        // Sub folders to be created are stored in a JSON file.
        let subFolders = JSON.parse(fs.readFileSync(__dirname + '/../data/subFolderArray.json'));
        
        // need a better way to handle response back to Express app.
        var results = [];
        var timestamp = moment().format('YYYY-MM-DD h:mm:ss a');

        data.forEach(function (folderName) {
            console.log('>>> ' + timestamp + ' Record Found: ' + folderName);
            // SEARCH for the existence of a folder.
            client.search.query(folderName, { type: 'folder', ancestor_folder_ids: '14274812032' }, function (err, queryResponse) {
                if (err) console.log(err);
                
                // Obtain the number of folders found matching the search case number.
                var recordCount = queryResponse.total_count;

                // If a folder doesn't exist, CREATE it and it's sub folders.
                // If the recordCount is 0 then no match is present within Box.
                if (queryResponse.total_count === 0) {
                    client.folders.create('14274812032', folderName, function (err, createResponse) {
                        let createdFolderName = createResponse.name;
                        let createdFolderId = createResponse.id;

                        console.log('>>> Folder created: ' + createdFolderName);                        
                        subFolders.forEach(function (subFolderName) {
                            client.folders.create(createdFolderId, subFolderName, function (err, subFolderCreateResponse) {
                                if (err) console.log(err);
                                console.log('>>> ' + timestamp + ' Folder created: ' + subFolderName);
                            });
                        });
                        results.push(createResponse);
                    });
                } else { // Else If a folder does exist, skip that record and move onto the next one.
                    console.log('>>> ' + timestamp + ' Folder exists: ' + queryResponse.entries[0].name);
                }
            });
        });
        cb(null, results);
    };

    return {
        createFolders: createFolders
    };
};
module.exports = BoxService;