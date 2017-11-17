'Use Strict';

const fs = require('fs');
const moment = require('moment');
const boxHousingFolder = process.env.boxHousingFolder;

var BoxHTaskService = function (client) {

    var createTaskFolders = function (data, cb) {

        let subFolders = JSON.parse(fs.readFileSync(__dirname + '/../data/subFolderArray.json'));
        var timestamp = moment().format('YYYY-MM-DD h:mm:ss a');

        let folderName = data.caseno + ' - ' + data.name;
        folderName = folderName.replace("/", "");

        client.folders.create(boxHousingFolder, folderName, function (err, response) {
            if (err) {
                cb(err, null);
            } else {
                console.log(response);
                let createFolderName = response.name;
                let createdFolderId = response.id;
    
                console.log('>>> Task Folder created: ' + createFolderName);                       
                
                subFolders.forEach(function (subFolderName) {
                    client.folders.create(createdFolderId, subFolderName, function (err, secondSubFolderCreateResponse) {
                        if (err) {
                            console.log(err);
                            cb(err, null);
                        } else {
                            console.log('>>> ' + timestamp + ' Sub Folder created: ' + subFolderName);
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