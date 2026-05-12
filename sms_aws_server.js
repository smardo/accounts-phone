var AWS = Npm.require('aws-sdk');

/**
 * Send SMS via AWS SNS.
 *
 * Activated when SMS.sns is configured in settings:
 *   "SMS": {
 *     "sns": {
 *       "REGION": "eu-west-1",
 *       "SENDER_ID": "getcards",
 *       // Optional: omit to use IAM role / env vars (AWS_ACCESS_KEY_ID etc.)
 *       "ACCESS_KEY_ID": "...",
 *       "SECRET_ACCESS_KEY": "..."
 *     }
 *   }
 */
SMS._sendViaSNS = async function (options) {
  console.log("Sending SMS via AWS SNS", options);

  var snsConfig = {
    region: SMS.sns.REGION || "eu-west-1"
  };

  if (SMS.sns.ACCESS_KEY_ID) {
    snsConfig.accessKeyId = SMS.sns.ACCESS_KEY_ID;
    snsConfig.secretAccessKey = SMS.sns.SECRET_ACCESS_KEY;
  }

  var sns = new AWS.SNS(snsConfig);

  var params = {
    Message: options.body,
    PhoneNumber: options.to,
    MessageAttributes: {
      "AWS.SNS.SMS.SMSType": {
        DataType: "String",
        StringValue: "Transactional"
      }
    }
  };

  if (SMS.sns.SENDER_ID) {
    params.MessageAttributes["AWS.SNS.SMS.SenderID"] = {
      DataType: "String",
      StringValue: SMS.sns.SENDER_ID
    };
  }

  return await sns.publish(params).promise();
};
