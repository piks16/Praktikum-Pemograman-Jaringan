import request from 'postman-request';

// API key dan koordinat dari data Anda
const API_KEY = '5f32c154dd0b5f5d03e7d89abf3bfc9e';
const LATITUDE = -0.8983365148097643;
const LONGITUDE = 100.34995333139592;

const urlCuaca = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${LATITUDE},${LONGITUDE}&units=m`;

console.log('=== CEK CUACA SEDERHANA - UNIVERSITAS NEGERI PADANG ===\n');

request({ url: urlCuaca, json: true }, (error, response) => {
    if (error) {
        console.log('Tidak dapat terhubung ke layanan cuaca!');
        console.log('Error details:', error);
        return;
    }

    if (response.body.error) {
        console.log('API Error:', response.body.error.info);
        return;
    }

    // LATIHAN 1: Menambahkan akses ke weather_descriptions
    const temperature = response.body.current.temperature;
    const precip = response.body.current.precip;
    const weatherDesc = response.body.current.weather_descriptions[0]; // Array, ambil elemen pertama
    const location = response.body.location.name;
    const humidity = response.body.current.humidity;
    const windSpeed = response.body.current.wind_speed;

    // Menampilkan informasi cuaca
    console.log(`📍 Lokasi: ${location}`);
    console.log(`🌡️  Suhu saat ini: ${temperature}°C`);
    console.log(`☁️  Deskripsi cuaca: ${weatherDesc}`);
    console.log(`🌧️  Kemungkinan hujan: ${precip}%`);
    console.log(`💧 Kelembaban: ${humidity}%`);
    console.log(`💨 Angin: ${windSpeed} km/jam`);
    console.log('─────────────────────────────────────');
    
    // LATIHAN 1 - No.2: Teks sesuai keinginan
    console.log(`📢 **LAPORAN CUACA UNP**:`);
    console.log(`Saat ini di kawasan ${location} suhu mencapai ${temperature}°C`);
    console.log(`dengan kondisi ${weatherDesc.toLowerCase()}.`);
    console.log(`Peluang hujan sekitar ${precip}% dan kelembaban ${humidity}%.`);
    console.log(`Kondisi angin ${windSpeed} km/jam.`);
    console.log('─────────────────────────────────────');
    
    // Pesan tambahan berdasarkan kondisi cuaca
    if (weatherDesc.toLowerCase().includes('rain') || precip > 30) {
        console.log('💡 Saran: Bawa payung atau jas hujan untuk ke kampus!');
    } else if (weatherDesc.toLowerCase().includes('sunny') || temperature > 28) {
        console.log('💡 Saran: Cuaca cerah, gunakan topi dan sunscreen!');
    } else if (weatherDesc.toLowerCase().includes('cloud')) {
        console.log('💡 Saran: Cuaca berawan, nyaman untuk beraktivitas!');
    } else {
        console.log('💡 Saran: Cuaca normal, tetap semangat belajar!');
    }
});