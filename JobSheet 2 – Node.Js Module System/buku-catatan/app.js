//percobaan yargs untuk command line argument parsing
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as catatan from './catatan.js';
import validator from 'validator';
import chalk from 'chalk';

// Contoh penggunaan core module dan validator
const fs = await import('fs');

// Contoh write file dengan ES Module
fs.writeFileSync('catatan.txt', 'HAsanul Fikri');

// Contoh penggunaan validator
console.log(validator.isURL('https://proska.com'));

// Contoh penggunaan chalk
console.log(chalk.blue('Print warna biru sukses'));
console.log(chalk.red('Print warna merah sukses'));

// Yargs configuration
const argv = yargs(hideBin(process.argv))
    .version('10.1.0')
    
    // Command: tambah
    .command({
        command: 'tambah',
        describe: 'tambah sebuah catatan baru',
        builder: {
            judul: {
                describe: 'Judul catatan',
                demandOption: true,
                type: 'string'
            },
            isi: {
                describe: 'Isi catatan',
                demandOption: true,
                type: 'string'
            }
        },
        handler: function (argv) {
            catatan.tambahCatatan(argv.judul, argv.isi);
        }
    })
    
    // Command: hapus
    .command({
        command: 'hapus',
        describe: 'hapus catatan',
        builder: {
            judul: {
                describe: 'Judul catatan yang akan dihapus',
                demandOption: true,
                type: 'string'
            }
        },
        handler: function (argv) {
            catatan.hapusCatatan(argv.judul);
        }
    })
    
    // Command: list
    .command({
        command: 'list',
        describe: 'menampilkan semua catatan',
        handler: function () {
            catatan.listCatatan();
        }
    })
    
    // Command: baca
    .command({
        command: 'baca',
        describe: 'membaca sebuah catatan',
        builder: {
            judul: {
                describe: 'Judul catatan yang akan dibaca',
                demandOption: true,
                type: 'string'
            }
        },
        handler: function (argv) {
            catatan.bacaCatatan(argv.judul);
        }
    })
    
    // Command: test (contoh tambahan)
    .command({
        command: 'test',
        describe: 'testing catatan functions',
        handler: function () {
            console.log(catatan.ambilCatatan());
            console.log('URL Validation:', catatan.validasiURL('https://google.com'));
        }
    })
    
    .demandCommand(1, 'You need to specify a command')
    .help()
    .argv;

// Command line arguments basic example
if (process.argv[2]) {
    console.log('Command line arguments:', process.argv.slice(2));
}
