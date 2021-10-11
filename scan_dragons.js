// Lambda function code - Important!


/*

    Checks the console argument to test if it's "All" or a dragon's name

    if "All", then
        Scan (Retrieve) all the dragons and display

    else
        Retrieve only the one specified dragon

*/

exports.handler = function(event, context, callback){ 
   console.log("To run a Local test in Cloud 9 use `node scan_dragons.js test`");
   console.log("running in Lambda");
   if(event["dragon_name_str"] !== undefined && event["dragon_name_str"] !== "All"){
        justThisDragon(event["dragon_name_str"], callback);
   }else{
        scanTable(callback);
   }
};

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

/*
    Function to retieve only 'this' or particluar dragon based on the name of the dragon

    Working :  Queries the dynamodb table and filters the result based on the filter expression 

    A full scan call can be made and the  result could be filtered, but it would have been less efficient campared to a query call.
*/

function justThisDragon(dragon_name_str, cb) {
    var
        params = {
            ExpressionAttributeValues: {
                ":dragon_name": {
                    S: dragon_name_str
                }
            },
            KeyConditionExpression: "dragon_name = :dragon_name",
            TableName: "dragon_stats"
        };
    DDB.query(params, function (err, data) {
        if (err) {
            cb(err);
        } else if (data.Items) {
            cb(null, data.Items);
        } else {
            cb(null, []);
        }
    });
}

/*
    Scans the entire dynamodb table
*/

function scanTable(cb){
     var 
        params = {
            TableName: "dragon_stats",
            ExpressionAttributeNames: {
                "#family": "family"
            },
            ProjectionExpression: "dragon_name, #family, protection, damage, description"
        };
      console.log("Full scan all");
     DDB.scan(params, function(err, data){
         if(err){
             throw err;
         }
         cb(null, data.Items); 
     });
}

/*
    if argument value is ONLY "All" then
        return the full dynamodb table with all the dragons

    else
        return the dragon with the specified name

*/
if(process.argv[2] === "test"){
    if(process.argv[3] && process.argv[3] !== "All"){
        console.log("Local test for a dragon called " + process.argv[3]);
        justThisDragon(process.argv[3], console.log);
    }else{
        console.log("Local test for all dragons");
        scanTable(console.log);
    }
}
