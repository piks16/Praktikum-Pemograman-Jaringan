import fs from 'fs';
import chalk from 'chalk';

const ambilCatatan = function () {
    return 'Ini Catatan Randi Proska...';
}

const tambahCatatan = function (judul, isi) {
    const catatan = muatCatatan();
    const catatanGanda = catatan.filter(function (note) {
        return note.judul === judul;
    });

    if (catatanGanda.length === 0) {
        catatan.push({
            judul: judul,
            isi: isi
        });
        simpanCatatan(catatan);
        console.log(chalk.green.inverse('Catatan baru ditambahkan!'));
    } else {
        console.log(chalk.red.inverse('Judul catatan telah dipakai'));
    }
}

const hapusCatatan = function (judul) {
    const catatan = muatCatatan();
    const catatanUntukDisimpan = catatan.filter(function (note) {
        return note.judul !== judul;
    });

    if (catatan.length > catatanUntukDisimpan.length) {
        console.log(chalk.green.inverse('Catatan dihapus!'));
        simpanCatatan(catatanUntukDisimpan);
    } else {
        console.log(chalk.red.inverse('Catatan tidak ditemukan!'));
    }
}

const listCatatan = function () {
    const catatan = muatCatatan();
    
    console.log(chalk.blue.inverse('Daftar Catatan Anda:'));
    catatan.forEach((note, index) => {
        console.log(chalk.yellow(`${index + 1}. ${note.judul}`));
    });
}

const bacaCatatan = function (judul) {
    const catatan = muatCatatan();
    const catatanDitemukan = catatan.find(function (note) {
        return note.judul === judul;
    });

    if (catatanDitemukan) {
        console.log(chalk.blue.inverse(`Judul: ${catatanDitemukan.judul}`));
        console.log(chalk.white(`Isi: ${catatanDitemukan.isi}`));
    } else {
        console.log(chalk.red.inverse('Catatan tidak ditemukan!'));
    }
}

const simpanCatatan = function (catatan) {
    const dataJSON = JSON.stringify(catatan);
    fs.writeFileSync('catatan.json', dataJSON);
}

const muatCatatan = function () {
    try {
        const dataBuffer = fs.readFileSync('catatan.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

// Validator example (tambahan)
import validator from 'validator';
const validasiURL = function (url) {
    return validator.isURL(url);
}

export {
    ambilCatatan,
    tambahCatatan,
    hapusCatatan,
    listCatatan,
    bacaCatatan,
    validasiURL
};