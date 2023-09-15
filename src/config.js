export default {
  SECRET: "productsNovaApi",
};
export const conection = {
  PORT: 3002,
  MONGODB_URI: "mongodb+srv://jordonez:6452487@cluster0.waefubr.mongodb.net/novakademia"
}

export const mailTo = {
  email: "xavidev19@gmail.com",
  pass: 'iehatnhbmfsvlyep'
}


const AWS = require("aws-sdk");

AWS.config.update({
  region: "EE. UU. Este (Norte de Virginia) us-east-1",
  accessKeyId: "s3://bucket-preguntepues/novakademia/",
  secretAccessKey: "arn:aws:s3:::bucket-preguntepues/novakademia/",
});

/* 
{
  xavidev19
  iehatnhbmfsvlyep


  javier19pedraza;
  lkzukcvbchxgaked;
}
 */