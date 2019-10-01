#!/usr/bin/env node
/* eslint-disable no-console */
require("dotenv").config();
const AWS = require("aws-sdk");
const ip = require("ip");

console.log(process.env);
AWS.config.update({
  region: "eu-west-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const ipAddress = ip.address();
var params = {
  Message: `PI started and connected to internet on ${ipAddress}`,
  TopicArn: process.env.TOPIC_ARN
};

console.log();
(async () => {
  const publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();

  console.log(await publishTextPromise);
})().catch(console.error);
