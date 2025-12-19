const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const namaDatabase = 'task-manager';

async function main() {
  try {
    await client.connect();
    console.log('Berhasil terhubung ke MongoDB database server');

    const db = client.db(namaDatabase);

    // Memperbaharui data dengan perintah updateOne
    const result = await db.collection('pengguna').updateOne(
      { _id: new ObjectId('69452fef3c90cdd703840306') },
      // { $set: { nama: 'Bro_Fikri' } }
      { $inc: { usia: 1 } }
    );
    console.log('UpdateOne result:', result);

    // Memperbaharui data dengan perintah updateMany
    // const resultMany = await db.collection('tugas').updateMany(
    //   { StatusPenyelesaian: false },
    //   { $set: { StatusPenyelesaian: true } }
    // );
    // console.log('UpdateMany modifiedCount:', resultMany.modifiedCount);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

main();