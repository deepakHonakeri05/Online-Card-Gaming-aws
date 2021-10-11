/* Initailise the AWS 
    - Region
    - bucket name (Very Important!!!!!!)
    - API version 
*/

var 
    AWS = require("aws-sdk"),
    S3API = new AWS.S3({
        apiVersion: "2006-03-01",
        region: "us-east-1"
    }),
    FS = require("fs"),
    bucket_name_str = "dragoncardgame";

//converts the HTML/Javascript/png files to binary before uploading


function uploadItemAsBinary(key_name_str, content_type_str, bin){
    var params = {
        Bucket: bucket_name_str,
        Key: key_name_str,
        Body: bin,
        ContentType: content_type_str,
        CacheControl: "max-age=0"
    };
    S3API.putObject(params, function(error, data){
        console.log(error, data);
    });
}


/*  Init function sets the 
    - file path
    - file names on the cloud9 platform
*/


(function init(){
    var 
        file_path_str = "/home/ec2-user/environment/lab2/resources/website/",
        file_name_str = "config.js",
        config_bin = FS.readFileSync(file_path_str + file_name_str);
    uploadItemAsBinary(file_name_str, "text/javascript", config_bin);
})();

