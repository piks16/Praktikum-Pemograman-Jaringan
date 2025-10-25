import { writeFileSync } from 'fs';
/*import { readFileSync } from 'fs';

const buku = {
    judul: 'Pemrograman Jaringan',
    penulis: 'Hasanul Fikri'
};

const bookJSON = JSON.stringify(buku); // changed 'book' to 'buku'
writeFileSync('1-jsontest.json', bookJSON);
*/

const { readFileSync } = await import('fs');
const dataBuffer = readFileSync(new URL('./1-jsontest.json', import.meta.url));
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);
console.log(data.judul);
