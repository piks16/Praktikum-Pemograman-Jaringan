/*percobaan dan Latihan1
import request from 'postman-request';

// API key dan koordinat dari data Anda
const API_KEY = '5f32c154dd0b5f5d03e7d89abf3bfc9e';
const LATITUDE = -0.8983365148097643;
const LONGITUDE = 100.34995333139592;

const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${LATITUDE},${LONGITUDE}&units=m`;

console.log('=== LATIHAN 1 - API ACCESS WEATHERSTACK ===\n');
console.log('Mengecek cuaca di Universitas Negeri Padang...\n');

request({ url: url, json: true }, (error, response) => {
    if (error) {
        console.log('Error:', error);
        return;
    }

    if (response.body.error) {
        console.log('API Error:', response.body.error.info);
        return;
    }

    const data = response.body;
    
    // Mengakses data cuaca
    const temperature = data.current.temperature;
    const precip = data.current.precip;
    const weatherDescriptions = data.current.weather_descriptions[0]; // Array, ambil elemen pertama
    const location = data.location.name;
    const region = data.location.region;
    const country = data.location.country;
    const observationTime = data.current.observation_time;
    const humidity = data.current.humidity;
    const windSpeed = data.current.wind_speed;
    const pressure = data.current.pressure;
    const feelslike = data.current.feelslike;
    const visibility = data.current.visibility;
    const uvIndex = data.current.uv_index;

    // Menampilkan informasi cuaca lengkap
    console.log('📍 **INFORMASI CUACA TERKINI**');
    console.log(`Lokasi: ${location}, ${region}, ${country}`);
    console.log(`Koordinat: ${LATITUDE}, ${LONGITUDE}`);
    console.log(`Waktu Observasi: ${observationTime} GMT`);
    console.log('─────────────────────────────────────');
    
    console.log(`🌡️  Suhu saat ini: ${temperature}°C`);
    console.log(`🌡️  Suhu terasa seperti: ${feelslike}°C`);
    console.log(`☁️  Kondisi cuaca: ${weatherDescriptions}`);
    console.log(`💧 Kelembaban: ${humidity}%`);
    console.log(`🌧️  Kemungkinan hujan: ${precip}%`);
    console.log(`💨 Kecepatan angin: ${windSpeed} km/jam`);
    console.log(`📊 Tekanan udara: ${pressure} hPa`);
    console.log(`👁️  Jarak pandang: ${visibility} km`);
    console.log(`☀️  UV Index: ${uvIndex}`);
    console.log('─────────────────────────────────────');
    
    // Pesan cuaca berdasarkan kondisi
    if (precip > 50) {
        console.log('⚠️  WASPADA: Kemungkinan hujan tinggi! Bawa payung atau jas hujan.');
    } else if (temperature > 30) {
        console.log('☀️  Cuaca panas terik! Minum air yang cukup dan hindari sinar matahari langsung.');
    } else if (temperature < 20) {
        console.log('❄️  Cuaca cukup dingin! Kenakan pakaian yang hangat.');
    } else {
        console.log('😊 Cuaca cukup nyaman untuk beraktivitas di luar.');
    }

    // Saran berdasarkan UV Index
    if (uvIndex > 8) {
        console.log('🛡️  UV Index sangat tinggi! Gunakan sunscreen SPF 50+.');
    } else if (uvIndex > 5) {
        console.log('🛡️  UV Index tinggi! Gunakan sunscreen SPF 30+.');
    }
});
*/

//latihan2
/* import request from 'postman-request';

// Mapbox API key dari akun 
const MAPBOX_API_KEY = 'pk.eyJ1IjoicGlrczE2IiwiYSI6ImNtaDZidzh2dzBjN2syd29hNHUyZ3RxZm8ifQ.dLGsFrzn7AhFML_JGEC5ZA';
const location = 'Payakumbuh';

const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${MAPBOX_API_KEY}&limit=3`;

console.log('=== LATIHAN 2 - API MAPBOX GEOCODING ===\n');
console.log(`Mencari koordinat untuk: "${location}"\n`);

request({ url: geocodeURL, json: true }, (error, response) => {
    if (error) {
        console.log('❌ Error:', error);
        return;
    }

    if (!response.body || response.body.features.length === 0) {
        console.log('❌ Tidak dapat menemukan lokasi tersebut');
        return;
    }

    const features = response.body.features;
    
    console.log(`📍 Ditemukan ${features.length} hasil untuk "${location}":`);
    console.log('─────────────────────────────────────');

    // Menampilkan semua hasil pencarian
    features.forEach((place, index) => {
        const longitude = place.center[0];
        const latitude = place.center[1];
        const placeName = place.place_name;
        const placeType = place.place_type.join(', ');
        
        console.log(`🔍 Hasil ${index + 1}:`);
        console.log(`   📍 Nama Lokasi: ${placeName}`);
        console.log(`   🗺️  Tipe: ${placeType}`);
        console.log(`   📊 Latitude: ${latitude}`);
        console.log(`   📊 Longitude: ${longitude}`);
        console.log('   ───────────────────────');
    });

    // Menggunakan hasil pertama untuk contoh
    const firstResult = features[0];
    const longitude = firstResult.center[0];
    const latitude = firstResult.center[1];
    const placeName = firstResult.place_name;
    const placeType = firstResult.place_type.join(', ');

    console.log('✅ **HASIL UTAMA:**');
    console.log(`   Data yang dicari: ${location}`);
    console.log(`   Data ditemukan: ${placeName}`);
    console.log(`   Tipe lokasi: ${placeType}`);
    console.log(`   Koordinat: ${latitude}, ${longitude}`);
});
*/
import request from 'postman-request';

// API Keys
const WEATHERSTACK_API_KEY = '5f32c154dd0b5f5d03e7d89abf3bfc9e';
const MAPBOX_API_KEY = 'pk.eyJ1IjoicGlrczE2IiwiYSI6ImNtaDZidzh2dzBjN2syd29hNHUyZ3RxZm8ifQ.dLGsFrzn7AhFML_JGEC5ZA';

const locationQuery = 'Payakumbuh'; // Sesuai contoh di jobsheet

console.log('=== LATIHAN 3 - MEMANGGIL DATA API ===\n');

// Fungsi untuk mendapatkan koordinat dari Mapbox
const getCoordinates = (location, callback) => {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${MAPBOX_API_KEY}&limit=1`;
    
    request({ url: geocodeURL, json: true }, (error, response) => {
        if (error) {
            callback('Tidak dapat terhubung ke Mapbox service!', undefined);
            return;
        }

        if (!response.body || response.body.features.length === 0) {
            callback('Lokasi tidak ditemukan!', undefined);
            return;
        }

        const data = response.body.features[0];
        const latitude = data.center[1];
        const longitude = data.center[0];
        const placeName = data.place_name;
        const placeType = data.place_type[0];
        const query = data.text || location; // Data yang dicari

        callback(undefined, {
            latitude: latitude,
            longitude: longitude,
            placeName: placeName,
            placeType: placeType,
            query: query
        });
    });
};

// Fungsi untuk mendapatkan cuaca dari Weatherstack
const getWeather = (latitude, longitude, callback) => {
    const weatherURL = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}&query=${latitude},${longitude}&units=m`;
    
    request({ url: weatherURL, json: true }, (error, response) => {
        if (error) {
            callback('Tidak dapat terhubung ke weather service!', undefined);
            return;
        }

        if (response.body.error) {
            callback('Error dari weather API: ' + response.body.error.info, undefined);
            return;
        }

        const data = response.body;
        callback(undefined, {
            temperature: data.current.temperature,
            precip: data.current.precip,
            weatherDesc: data.current.weather_descriptions[0],
            location: data.location.name,
            region: data.location.region,
            country: data.location.country
        });
    });
};

// Main execution - LATIHAN 3
getCoordinates(locationQuery, (error, coordData) => {
    if (error) {
        console.log('❌ Error:', error);
        return;
    }

    // Tampilkan data dari Mapbox (sesuai Latihan 3)
    console.log('📍 **DATA DARI MAPBOX API:**');
    console.log(`   Koordinat lokasi anda adalah ${coordData.latitude}, ${coordData.longitude}`);
    console.log(`   Data yang anda cari adalah: ${coordData.query}`);
    console.log(`   Data yang ditemukan adalah: ${coordData.placeName}`);
    console.log(`   Tipe lokasi adalah: ${coordData.placeType}`);
    console.log('─────────────────────────────────────');

    // Dapatkan informasi cuaca berdasarkan koordinat
    getWeather(coordData.latitude, coordData.longitude, (error, weatherData) => {
        if (error) {
            console.log('❌ Error cuaca:', error);
            return;
        }

        // Tampilkan data dari Weatherstack (sesuai Latihan 3)
        console.log('🌤️  **DATA DARI WEATHERSTACK API:**');
        console.log(`   Saat ini suhu di ${weatherData.location} mencapai ${weatherData.temperature} derajat celcius.`);
        console.log(`   Kemungkinan terjadinya hujan adalah ${weatherData.precip}%`);
        console.log('─────────────────────────────────────');
        
        // OUTPUT AKHIR SESUAI JOBSHEET (Halaman 11)
        console.log('✅ **HASIL AKHIR LATIHAN 3:**');
        console.log(`Koordinat lokasi anda adalah ${coordData.latitude}, ${coordData.longitude}`);
        console.log(`Data yang anda cari adalah: ${coordData.query}`);
        console.log(`Data yang ditemukan adalah: ${coordData.placeName}`);
        console.log(`Tipe lokasi adalah: ${coordData.placeType}`);
        console.log(`Saat ini suhu di ${weatherData.location} mencapai ${weatherData.temperature} derajat celcius.`);
        console.log(`Kemungkinan terjadinya hujan adalah ${weatherData.precip}%`);
    });
});
