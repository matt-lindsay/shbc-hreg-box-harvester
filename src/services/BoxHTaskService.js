'use strict';

const fs = require('fs');
const moment = require('moment');
const boxHousingFolder = process.env.boxHousingFolder;

var BoxHTaskService = function (client) {

    var createTaskFolders = function (data, cb) {

        let subFolders = JSON.parse(fs.readFileSync(__dirname + '/../data/subFolderArray.json'));
        var timestamp = moment().format('YYYY-MM-DD h:mm:ss a');
        //var results = false;

        // Create task folder name.
        let folderName = data.caseno + ' - ' + data.name;
        // Remove any forward slashes.
        folderName = folderName.replace("/", "");
        
        // Check for a Housing Register case #.
        if (data.hreg) {
            client.search.query(data.hreg, { type: 'folder', ancestor_folder_ids: boxHousingFolder }, function (err, primarySearchResults) {
                if (err) {
                    cb(err, null);
                } else {
                    if (primarySearchResults.total_count === 0) {
                        // Can't find h reg # in Task data, create the task separately.
                        // !!! TIDY UP
                        client.folders.create(boxHousingFolder, folderName, function (err, createTaskFolderResponse) {
                           if (err) {
                               cb(err, null);
                           } else {
                               subFolders.forEach(function (folderItem) {
                                   client.folders.create(createTaskFolderResponse.id, folderItem, function (err, subfolderCreateResponse) {
                                       if (err) {
                                           console.log(err);
                                       } else {
                                           console.log('>>> ' + timestamp + ' Sub Folder created: ' + subfolderCreateResponse.name);
                                       }
                                   });
                               });
                               cb(null, 'Task folders created: ' + createTaskFolderResponse.name);
                           }
                        }); // !!!
                    } else { // Else create the task in the correct sub folder.
                        // Identify the correct sub folder.
                        client.folders.getItems(primarySearchResults.entries[0].id, null, function (err, secondarySearchResults) {
                             if (err) {
                                 cb(err, null);
                             } else { // Else iterate through the returned results and test for a match.
                                 let typeFolders = secondarySearchResults.entries;
                                 
                                 matchedResults(typeFolders, data.type).then(function (matchedResultsResponse) {
                                     // Create sub folder.
                                     createBoxFolder(client, matchedResultsResponse, folderName, timestamp, subFolders, function (err, createFolderResponse) {
                                         if (err) {
                                             cb(err, 'Create Box Folder');
                                         } else {
                                             cb(null, createFolderResponse);
                                         }
                                     });
                                 }, function (error) {
                                     cb(error);
                                 });
                             }
                        });
                    }
                }
            });
        } else {
            // Create a separate task folder.
            // !!! TIDY UP
            client.folders.create(boxHousingFolder, folderName, function (err, createTaskFolderResponse) {
               if (err) {
                   cb(err, null);
               } else {
                   subFolders.forEach(function (folderItem) {
                       client.folders.create(createTaskFolderResponse.id, folderItem, function (err, subfolderCreateResponse) {
                           if (err) {
                               console.log(err);
                           } else {
                               console.log('>>> ' + timestamp + ' Sub Folder created: ' + subfolderCreateResponse.name);
                           }
                       });
                   });
                   cb(null, 'Task folders created: ' + createTaskFolderResponse.name);
               }
            }); // !!!
            //cb(null, 'no H REG case'); 
        }
    };
    
    var matchedResults = function (subfolderResults, taskType) {
        return new Promise(function (resolve, reject) {
             
            // Test each result returned in searchResults for a match with folderName.
            // If a match is not returned create the folder.
            let matched = false;
            let matchedId;
            
            subfolderResults.forEach(function (item) {
                if (item.name.match(taskType)) {
                    matched = true;
                    matchedId = item.id;
                }
            });
            if (matched === true) {
                resolve(matchedId); // Sub folder Id to create the task in.
            } else if (matched === false) {
                reject('nomatch'); // TODO Something is wrong: where is the correct sub folder?
            }
        });
    };
    
    var createBoxFolder = function (client, parentId, folderName, timestamp, subFolders, cb) {
        client.folders.create(parentId, folderName, function (err, response) {
            if (err) {
                cb(err, null);
            } else {
                let createFolderName = response.name;
                let createdFolderId = response.id;
    
                console.log('>>> ' + timestamp + 'Task Folder created: ' + createFolderName);
                
                subFolders.forEach(function (subFolderName) {
                    client.folders.create(createdFolderId, subFolderName, function (err, secondSubFolderCreateResponse) {
                        if (err) {
                            console.log(err);
                            //cb(err, null); // TODO error handling here.
                        } else {
                            console.log('>>> ' + timestamp + ' Sub Folder created: ' + secondSubFolderCreateResponse.name);
                        }
                    });
                });
                cb(null, 'Task folders created: ' + createFolderName);
            }
        });
    };

    return {
        createTaskFolders: createTaskFolders
    };
};
module.exports = BoxHTaskService;