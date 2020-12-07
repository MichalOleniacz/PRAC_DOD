const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = `mongodb+srv://${process.env.USER}:${process.env.PASSWD}@cluster0.e6cry.mongodb.net/PiUsageInfo?retryWrites=true&w=majority`;

const dbName = process.env.DB_NAME;
const generalCollectionName = process.env.GENERAL_INFO_COL_NAME;
const detailedCollectionName = process.env.DETAILED_INFO_COL_NAME;

// MongoClient.connect(
//   url,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   async (err, client) => {
//     assert.equal(null, err);
//     app.listen(PORT);

//     const db = client.db(dbName);

//     const detailedCollection = db.collection(detailedCollectionName);

//     const postDetailedUsageInfo = async () => {
//       const body = await getDetailedUsageInfo();

//       try {
//         const value = await DetailedUsageInfoSchema.validateAsync(body);
//         detailedCollection.insertOne(value).catch((err) => console.log(err));
//       } catch (error) {
//         if (error) {
//           console.log(error);
//           return;
//         }
//       }
//     };

//     const postGeneralUsageInfo = async () => {
//       const body = await getGeneralUsageInfo();

//       try {
//       } catch (error) {}
//     };
//   }
// );
