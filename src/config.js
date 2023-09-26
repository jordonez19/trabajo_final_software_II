require("dotenv").config();

export default {
  SECRET: process.env.SECRET,
};
export const conection = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
};

export const mailTo = {
  email: "xavidev19@gmail.com",
  pass: "iehatnhbmfsvlyep",
};

export const awsS3 = {
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
  AWS_PUBLIC_KEY: process.env.AWS_PUBLIC_KEY,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
};
/* 
#PORT------------------->>
PORT=3002
#MONGO------------------>>
MONGODB_URI=mongodb+srv://jordonez:6452487@cluster0.waefubr.mongodb.net/novakademia
#SECRET----------------->>
SECRET: productsNovaApi
#AWS-------------------->>
AWS_BUCKET_NAME: novakademia
AWS_BUCKET_REGION: us-east-1
AWS_PUBLIC_KEY: AKIAULNPTKBBHYXEWBHW
AWS_SECRET_KEY: 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
 */