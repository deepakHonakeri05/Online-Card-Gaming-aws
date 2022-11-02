# Online Card Gaming Web App - AWS

## Overview

The is an online card gaming website that features dragon cards. It’s a static website hosted on amazon AWS S3. The website is built using HTML5, CSS3, and Node.js. It leverages Amazon’s AWS S3, Lambda function, DynamoDB and CORS enabled Amazon API Gateway.


## Purpose of the project

The purpose of this project was to learn and create multiple DynamoDB tables using AWS SDK which can store the card data and learn to add a new IAM role for the Lambda Function. Moreover, the motive was to learn how to upload data into the multiple items at one single go instead of uploading items one-by-one.

Furthermore, the purpose of the project was to learn how to code a Lambda Function that scans the DynamoDB tables and create a CORS enabled Amazon API that points to the Lambda Function.

## Contents

1. Creation of the table
2. Uploading the website to the amazon S3 bucket
3. Creating the lambda scan script
4. Create REST API to connect to the website.


### 1. Creating the table

- The table is created using the create_dragon_tables.js file which has 5 tables.<br>
- Each table is popluated using the "batchWriteItem" menthod. Each table has atleast 5 to 6 rows of data.
- Use the cloud9 envrironment to create the tables and popluate the tables with data.

### 2. Upload the website to the amazon S3 bucket

The Script "upload_website.js" script allows us to upload the website onto the Amazon Aws S3 storage facility.


Initally go to AWS Management Dashboard and the follow the steps
1. Choose Services and search for s3.
2. Choose Create bucket.
3. For Bucket name make sure you type in something unique but easy to remember. Example: er-101-2019-05-16-app-store
4. Leave Block all public access checked.
5. Choose Create bucket.
6. Once the bucket is created choose it from the S3 buckets list. 
7. Choose the Permissions tab and select Bucket Policy.
8. Refer to the policy in the file "policy.js"

### 3. Creating the lambda scan script
#### 3a Create a IAM Role use case with lambda
Create a lambda function in the AWS console and select the following permissions for the Role:
1. AmazonDynamoDBFullAccess .
2. AWSLambdaBasicExecutionRole .
3. AWSXrayWriteOnlyAccess .
4. AmazonS3FullAccess .

#### 3b Create a Lambda function
Follow these steps to create the lambda function
Create a lambda function using the code present in the "scan_dragons.js" file.

### 4. Creating a REST API (API Gateway)

Create a REST API from the API Gateway service. Once the API has been created, choose Actions and create method and then Choose Integration type as "Lambda Function" and choose the name of the lambda function created in the f[previous step.

[Important!!]

We have to enable CORS because, the website is hosted in one domain and the API is hosted in different domain. So the browser doesn't accpet this and we have to API CORS enabled.

