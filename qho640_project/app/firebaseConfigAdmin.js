
import admin from 'firebase-admin';

// Move to dotenv for security reason
//const serviceAccount = require("../secret/qho640-dd856-firebase-adminsdk-uwtas-eb15eb51cd.json");


// Initialize Firebase Admin SDK
/*
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://qho640-dd856.firebaseio.com"
    });
}
*/

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(
            {
                "type": "service_account",
                "project_id": "qho640-dd856",
                "private_key_id": "eb15eb51cd4b7e90b8c5795533f29c94df33a3e5",
                "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCtrcPCCxWNsDw8\nQ7bx5nTCyMtTDtbSH7uVIcDriJOugUcaHEMGHXwTVzVTniujYnf+xDNWQq3Ca3pM\nw8vdSrvxJgMm3YecNH6RYUk/gckg+RaIXZJKqBlIQ6AtOuRHYRf4mrNXq2VqV5RM\nxGzm0IySc6MPj6bqOGPsXIJH0NmB/VEal3UjImyX5CrmsIq916Gft3xf3AgSVsNH\n5evyPxx4eDdcCdxcxwNB/XkeMeri5hNdDojOkWelDakql5S3HIe59bMU8Tis5Ylu\nNzh4R54nzEXv2vlCbGPEheYOdsgR9cQDcXKN9t8vD+CPPGi2Fgda37IIDKex22wG\nAqL8LufzAgMBAAECggEAKPVbPqY9iYIf2nh/qvGV5J/U73wG5lvscYGZzRIS/ern\n+TzkA4utiKQe497f3LKqqM7daoDkGH8fQv5D1Ca9RuQXhzFkO07X8HIYg50YcSm9\nCiDDEM8u0y97lV8XmcvIiuz00X6OtrL7utTx98cD97/EmzVeAEuXKRUx9jzHJtPS\nLRxcJOG0Dt4WHC8Ug6FGSHqPQfMW5ZU0hNwtPtpCoTv6g22aKedWb8CXoZsSXQxM\nt6gL1tVyuE65QpaaVsy1R9nAxVY42b66/AVMU7+JJRcbLwuA7aLKe4lRc5N9Z4Zo\nYcYTij0dpmF5JCRWqz7xWPt1IlveFrPz6T8V8Qdz9QKBgQDqNpIZ8aVinu0+wEgO\nrjnXVwKcJVO2OpOrKPk+OP92vtBWnrwFSFtpZI6ZPt4rbRDgWZqX+RTlScWsvfOX\nq7/WHHEZmP4iZHwW0ZR1x2bdwjpal4Y0FM4SgsxsR32+P1MLlxMfAz5lxw6lWos5\nsgZqDLwsjxAWphwqOOZhnT7UZQKBgQC91ajcQwYL5IoEQQXYN8UuF7J8n27F08CC\nM6rT875AjejHUNW6IndfRxnDke4SffZ/BES3v8qdRs81+D/2Ke34+H5R5PrgjQJR\ng3IuhyxAJn3IGFNyEU612++KLVIeQPxqDrnzkRH4PASVxi34I5Rv5aqjP7WXkiCo\naw/L3b4pdwKBgQDjEM7qSiUuDKgzixUQ7oZzKA8GtQWIiRe6+7lQQtAhHnM7Vx8v\n++trrSq2lYWtEksnRpejOL+yX6g+hdXQuJj+iop356SSUVsggEVvPkeTPQd35qkc\newMiXR6050aYGCp59Rh7m5h18dtYIgUShW7Eh94zUOunGZn6sTlhb6KHJQKBgASg\nOT4sz+/oQMi7wOW07jQiVbIdvHhLoaxKkAYcMW2nR53bxWmEv33t4J3YZ4HB2gjc\nVMRZgxl0CUaaZwyblvXzMDjUqJxiM0VDO7wQhS6HAZenqBjmfRGHa33lftPH5565\n/yQFS/fNlpsDukkKrOpRIWha/BTWdb9E5JymKaUfAoGAChOzLP2la2/12dMskEXK\n0Ggngj4mB3VmgPRX0oHFF6UK+2i+YwIUCg9ERFIc5Jt7NPzF9ARrzV27wxFeyZVo\nSsdkMRLULWo4PJ7uWkw/MNGdzVGj/Ck6IYaBzbpc94UKfoulJ3no/6B2oS2+pNcE\nryDyyVhggR3DxQzpzvLyS/o=\n-----END PRIVATE KEY-----\n",
                "client_email": "firebase-adminsdk-uwtas@qho640-dd856.iam.gserviceaccount.com",
                "client_id": "113182530490153240448",
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-uwtas%40qho640-dd856.iam.gserviceaccount.com",
                "universe_domain": "googleapis.com"
              }
        ),
        databaseURL: "https://qho640-dd856.firebaseio.com"
    });
}



const dbAdmin = admin.firestore();

export {dbAdmin};

