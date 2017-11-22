'use strict';

const Box = require('box-node-sdk');

var boxClient = function () {
    var boxClientID = process.env.boxClientID;
    var boxClientSecret = process.env.boxClientSecret;
    var privateKey = process.env.boxPrivateKey;
    var publicKeyId = process.env.boxKeyID;
    var publicKeyPassphrase = process.env.boxKeyPassphrase;
    var boxEnterpriseId = process.env.boxEnterpriseId;
    var boxHousingUser = process.env.boxHousingUser;

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
    client.asUser(boxHousingUser);

    return client;
};
module.exports = boxClient;