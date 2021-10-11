/* Initailise the AWS 
    - Region
    - bucket name (Very Important!!!!!!)
    - API version 
*/

var 
    AWS = require("aws-sdk"),                       
    DDB = new AWS.DynamoDB({
        apiVersion: "2012-08-10",
        region: "us-east-1"
    });                                              

//create Dragon stats table

function createTheDragonStatsTable(){
    var 
        params = {
            AttributeDefinitions: [{
                AttributeName: "dragon_name", 
                AttributeType: "S"
            }], 
            KeySchema: [{
                AttributeName: "dragon_name", 
                KeyType: "HASH"
            }],
            BillingMode: "PAY_PER_REQUEST",
            TableName: "dragon_stats"
        };
     return DDB.createTable(params).promise();
}

//create Dragon Current power table

function createTheDragonCurrentPowerTable(){
    var 
        params = {
            AttributeDefinitions: [{
                AttributeName: "game_id", 
                AttributeType: "S"
            }], 
            KeySchema: [{
                AttributeName: "game_id", 
                KeyType: "HASH"
            }],
            BillingMode: "PAY_PER_REQUEST",
            TableName: "dragon_current_power"
        };
    return DDB.createTable(params).promise();
}

//create Dragon Bonus Attack table

function createTheDragonBonusAttackTable(){
    var 
        params = {
            AttributeDefinitions: [{
                AttributeName: "breath_attack", 
                AttributeType: "S"
            },{
                AttributeName: "range", 
                AttributeType: "N"
            }], 
            KeySchema: [{
                AttributeName: "breath_attack", 
                KeyType: "HASH"
            },{
                AttributeName: "range", 
                KeyType: "RANGE"
            }],
            BillingMode: "PAY_PER_REQUEST",
            TableName: "dragon_bonus_attack"
        };
    return DDB.createTable(params).promise();
}

//create Dragon Family  table

function createTheDragonFamilyTable(){
    var 
        params = {
            AttributeDefinitions: [{
                AttributeName: "family", 
                AttributeType: "S"
            }], 
            KeySchema: [{
                AttributeName: "family", 
                KeyType: "HASH"
            }],
            BillingMode: "PAY_PER_REQUEST",
            TableName: "dragon_family"
        };
    return DDB.createTable(params).promise();
}

// Execution of the  functions

(async function createAllTables(){
    console.time("HowFastWasThat");
    console.log(await Promise.all([
        createTheDragonStatsTable(),
        createTheDragonCurrentPowerTable(),
        createTheDragonBonusAttackTable(),
        createTheDragonFamilyTable()
    ]));
    console.timeEnd("HowFastWasThat");
})();



