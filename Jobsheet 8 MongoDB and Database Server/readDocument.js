const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const namaDatabase = 'task-manager';

async function main() {
  try {
    await client.connect();
    console.log('Berhasil terhubung ke MongoDB database server');

    const db = client.db(namaDatabase);

    // Find by nama
    const byNama = await db.collection('pengguna').findOne({ nama: 'Bro_Fikrii' });

    // Find by ObjectID
    const byObjectID = await db.collection('pengguna').findOne({
      _id: new ObjectId('69452fef3c90cdd703840306')
    });

    // Find multiple documents
    const toArray = await db.collection('pengguna').find({ usia: 21 }).toArray();

    if (byNama && byObjectID && toArray) {
      console.log('Data Pengguna ditemukan (berdasarkan nama):', byNama);
      console.log('Data Pengguna ditemukan (berdasarkan ID Objek):', byObjectID);
      console.log('Data Pengguna ditemukan (dalam format Array):', toArray);
    } else {
      console.log('Data Pengguna tidak ditemukan');
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main().catch(console.error);