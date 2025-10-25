const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/prediksiCuaca')

const app = express()

// Mendefinisikan jalur/path untuk konfigurasi Express
const direktoriPublic = path.join(__dirname, '../public')
const direktoriViews = path.join(__dirname, '../templates/views')
const direktoriPartials = path.join(__dirname, '../templates/partials')

// Setup handlebars engine dan lokasi folder views
app.set('view engine', 'hbs')
app.set('views', direktoriViews)
hbs.registerPartials(direktoriPartials)

// Setup direktori statis
app.use(express.static(direktoriPublic))

// Rute halaman utama
app.get('', (req, res) => {
    res.render('index', {
        judul: 'Aplikasi Cek Cuaca',
        nama: 'Hasanul Fikri',
        pageTitle: 'Aplikasi Cek Cuaca'
    })
})

// Rute halaman tentang
app.get('/tentang', (req, res) => {
    res.render('tentang', {
        judul: 'Tentang Saya',
        nama: 'Hasanul Fikri',
        pageTitle: 'Tentang'
    })
})

// Rute halaman bantuan
app.get('/bantuan', (req, res) => {
    res.render('bantuan', {
        judul: 'Bantuan',
        nama: 'Hasanul Fikri',
        teksBantuan: 'Ini adalah halaman bantuan untuk aplikasi cek cuaca.',
        pageTitle: 'Bantuan'
    })
})

// JSON HTTP Endpoint untuk info cuaca
app.get('/infocuaca', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Kamu harus memasukan lokasi yang ingin dicari'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, dataPrediksi) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                prediksiCuaca: dataPrediksi,
                lokasi: location,
                address: req.query.address
            })
        })
    })
})

// Rute wildcard untuk halaman bantuan yang tidak ditemukan
app.get('/bantuan/*', (req, res) => {
    res.render('404', {
        judul: '404',
        nama: 'Hasanul Fikri',
        pesankesalahan: 'Artikel yang dicari tidak ditemukan.',
        pageTitle: '404'
    })
})

// Rute wildcard untuk semua halaman yang tidak ditemukan
app.get('*', (req, res) => {
    res.render('404', {
        judul: '404',
        nama: 'Hasanul Fikri',
        pesankesalahan: 'Halaman tidak ditemukan.',
        pageTitle: '404'
    })
})

// Menjalankan server pada port 4000
app.listen(4000, () => {
    console.log('Server berjalan pada port 4000.')
})