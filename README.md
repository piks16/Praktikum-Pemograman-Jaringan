<h1 align="center">LAPORAN PRAKTIKUM PEMOGRAMAN JARINGAN</h1>
<h1 align="center">=====================================</h1>

**NAMA : HASANUL FIKRI**                      
                                                       
**NIM : 23343040**                            
                                                       
**JURUSAN : INFORMATIKA**                     
                                                       
**UNIVERSITAS NEGERI PADANG**                 
                                                       
# Praktikum Pemrograman Jaringan - Rangkuman Materi

## Daftar Isi
1. [Jobsheet 1: Pengantar Node.js](#jobsheet-1-pengantar-nodejs)
2. [Jobsheet 2: Node.js Module System](#jobsheet-2-nodejs-module-system)
3. [Jobsheet 3: HTTP Request and API](#jobsheet-3-http-request-and-api)
4. [Jobsheet 4: JavaScript Essentials](#jobsheet-4-javascript-essentials)
5. [Jobsheet 5: Web Server and Express.js](#jobsheet-5-web-server-and-expressjs)
6. [Jobsheet 6: JSON HTTP Endpoints](#jobsheet-6-json-http-endpoints)
7. [Jobsheet 7: Version Control and App Deployment](#jobsheet-7-version-control-and-app-deployment)
8. [Jobsheet 8: MongoDB and Database Server](#jobsheet-8-mongodb-and-database-server)
9. [Jobsheet 9: Socket Programming](#jobsheet-9-socket-programming)

---

## Jobsheet 1: Pengantar Node.js

### Kesimpulan Materi

**Node.js** adalah runtime environment JavaScript yang dibangun di atas V8 JavaScript engine dari Chrome. Node.js memungkinkan JavaScript untuk dijalankan di sisi server, bukan hanya di browser.

#### Poin-Poin Penting:

1. **Karakteristik Utama Node.js**
   - **Asynchronous & Non-blocking I/O**: Node.js menggunakan model event-driven yang memungkinkan operasi I/O berjalan tanpa memblokir eksekusi kode lainnya
   - **Single-threaded dengan Event Loop**: Meskipun single-threaded, Node.js dapat menangani banyak koneksi secara bersamaan melalui event loop
   - **NPM (Node Package Manager)**: Ekosistem package yang sangat besar untuk mempermudah development

2. **Kelebihan Node.js**
   - Performa tinggi untuk aplikasi real-time
   - Satu bahasa (JavaScript) untuk front-end dan back-end
   - Komunitas yang besar dan aktif
   - Cocok untuk aplikasi yang membutuhkan banyak I/O operations

3. **Penggunaan Node.js**
   - Web server dan RESTful API
   - Real-time applications (chat, gaming)
   - Microservices
   - Command-line tools
   - IoT applications

**Kesimpulan**: Node.js adalah platform yang powerful untuk membangun aplikasi jaringan yang scalable dan performant, terutama untuk aplikasi yang membutuhkan banyak operasi I/O dan real-time communication.

---

## Jobsheet 2: Node.js Module System

### Kesimpulan Materi

**Module System** adalah cara Node.js mengorganisir dan membagi kode menjadi file-file terpisah yang dapat digunakan kembali (reusable).

#### Poin-Poin Penting:

1. **Jenis-Jenis Module**
   - **Core Modules**: Module bawaan Node.js (fs, http, path, os, dll)
   - **Local Modules**: Module yang dibuat sendiri oleh developer
   - **Third-party Modules**: Module dari NPM yang diinstall menggunakan `npm install`

2. **Export dan Import Module**
   
   **Mengexport module:**
   ```javascript
   // Cara 1: module.exports
   module.exports = functionName;
   
   // Cara 2: exports object
   exports.functionName = function() { ... };
   
   // Cara 3: export multiple (beberapa fungsi/variabel)
   module.exports = {
       func1,
       func2,
       variable1
   };
   ```
   
   **Mengimport module:**
   ```javascript
   // Import local module (module buatan sendiri)
   const myModule = require('./myModule');
   
   // Import core module (module bawaan Node.js)
   const fs = require('fs');
   
   // Import fungsi tertentu saja
   const { func1, func2 } = require('./myModule');
   ```

3. **CommonJS vs ES6 Modules**
   - Node.js secara default menggunakan **CommonJS** (`require`/`module.exports`)
   - ES6 Modules (`import`/`export`) juga didukung dengan konfigurasi khusus
   - CommonJS lebih synchronous, ES6 Modules lebih modern dan asynchronous

4. **Best Practices**
   - Pisahkan kode menjadi module-module kecil dengan fungsi spesifik
   - Gunakan nama file yang descriptive
   - Hindari circular dependencies
   - Gunakan folder structure yang terorganisir (misal: utils, controllers, models)

**Kesimpulan**: Module system membantu developer untuk menulis kode yang lebih modular, maintainable, dan reusable. Pemahaman yang baik tentang module system adalah fundamental untuk membangun aplikasi Node.js yang terstruktur dengan baik.

---

## Jobsheet 3: HTTP Request and API

### Kesimpulan Materi

**HTTP Request** adalah komunikasi antara client dan server menggunakan protokol HTTP. **API (Application Programming Interface)** adalah interface yang memungkinkan aplikasi berkomunikasi satu sama lain.

#### Poin-Poin Penting:

1. **HTTP Methods**
   - **GET**: Mengambil data dari server
   - **POST**: Mengirim data baru ke server
   - **PUT/PATCH**: Mengupdate data yang ada
   - **DELETE**: Menghapus data

2. **Membuat HTTP Request di Node.js**
   
   **Menggunakan module `https` atau `http` bawaan:**
   ```javascript
   const https = require('https');
   
   https.get('https://api.example.com/data', (res) => {
       let data = '';
       res.on('data', (chunk) => {
           data += chunk;
       });
       res.on('end', () => {
           console.log(JSON.parse(data));
       });
   });
   ```
   
   **Menggunakan package `request` atau `axios` (lebih mudah):**
   ```javascript
   const axios = require('axios');
   
   axios.get('https://api.example.com/data')
       .then(response => console.log(response.data))
       .catch(error => console.error(error));
   ```

3. **Membuat RESTful API dengan Express.js**
   ```javascript
   const express = require('express');
   const app = express();
   
   app.use(express.json()); // Middleware untuk parsing JSON
   
   // GET endpoint
   app.get('/api/users', (req, res) => {
       res.json({ users: [] });
   });
   
   // POST endpoint
   app.post('/api/users', (req, res) => {
       const newUser = req.body;
       res.status(201).json({ message: 'User created', user: newUser });
   });
   
   app.listen(3000, () => console.log('Server running on port 3000'));
   ```

4. **Working with External APIs**
   - Gunakan API key untuk autentikasi
   - Handle error dengan baik (try-catch, .catch())
   - Perhatikan rate limiting dari API provider
   - Parse response dengan benar (biasanya JSON)

5. **Status Codes**
   - **2xx**: Success (200 OK, 201 Created)
   - **3xx**: Redirection
   - **4xx**: Client Error (400 Bad Request, 404 Not Found)
   - **5xx**: Server Error (500 Internal Server Error)

**Kesimpulan**: HTTP Request dan API adalah fondasi dari komunikasi web modern. Node.js menyediakan tools yang powerful untuk membuat dan mengkonsumsi API, baik menggunakan module bawaan maupun third-party packages seperti Express.js dan Axios.

---

## Jobsheet 4: JavaScript Essentials

### Kesimpulan Materi

**JavaScript Essentials** mencakup konsep-konsep fundamental JavaScript yang penting untuk pemrograman Node.js, termasuk syntax modern ES6+, asynchronous programming, dan functional programming.

#### Poin-Poin Penting:

1. **ES6+ Features**
   
   **Let dan Const:**
   ```javascript
   let variable = 'dapat diubah';
   const constant = 'tidak dapat diubah';
   ```
   
   **Arrow Functions:**
   ```javascript
   // Fungsi tradisional
   function add(a, b) { return a + b; }
   
   // Arrow function (lebih singkat)
   const add = (a, b) => a + b;
   ```
   
   **Template Literals:**
   ```javascript
   const name = 'John';
   const greeting = `Halo, ${name}!`; // Interpolasi string
   ```
   
   **Destructuring:**
   ```javascript
   // Object destructuring (mengambil property dari object)
   const { name, age } = person;
   
   // Array destructuring (mengambil elemen dari array)
   const [first, second] = array;
   ```
   
   **Spread Operator:**
   ```javascript
   const arr1 = [1, 2, 3];
   const arr2 = [...arr1, 4, 5]; // Gabungkan array: [1, 2, 3, 4, 5]
   
   const obj1 = { a: 1, b: 2 };
   const obj2 = { ...obj1, c: 3 }; // Gabungkan object: { a: 1, b: 2, c: 3 }
   ```

2. **Asynchronous JavaScript**
   
   **Callbacks:**
   ```javascript
   fs.readFile('file.txt', (err, data) => {
       if (err) throw err; // Jika error, lempar error
       console.log(data); // Jika berhasil, tampilkan data
   });
   ```
   
   **Promises:**
   ```javascript
   const fetchData = () => {
       return new Promise((resolve, reject) => {
           // Operasi asynchronous
           if (success) resolve(data); // Berhasil
           else reject(error); // Gagal
       });
   };
   
   // Menggunakan promise
   fetchData()
       .then(data => console.log(data)) // Jika berhasil
       .catch(err => console.error(err)); // Jika error
   ```
   
   **Async/Await (cara paling modern dan mudah dibaca):**
   ```javascript
   async function getData() {
       try {
           const data = await fetchData(); // Tunggu sampai selesai
           console.log(data);
       } catch (error) {
           console.error(error); // Tangani error
       }
   }
   ```

3. **Array Methods (Functional Programming)**
   ```javascript
   const numbers = [1, 2, 3, 4, 5];
   
   // map: mengubah setiap elemen array
   const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]
   
   // filter: menyaring elemen berdasarkan kondisi
   const evens = numbers.filter(n => n % 2 === 0); // [2, 4]
   
   // reduce: menggabungkan semua elemen menjadi satu nilai
   const sum = numbers.reduce((acc, n) => acc + n, 0); // 15
   
   // forEach: melakukan iterasi pada setiap elemen
   numbers.forEach(n => console.log(n));
   
   // find: mencari elemen pertama yang sesuai kondisi
   const found = numbers.find(n => n > 3); // 4
   
   // some/every: pengecekan boolean
   const hasEven = numbers.some(n => n % 2 === 0); // true (ada angka genap)
   const allPositive = numbers.every(n => n > 0); // true (semua positif)
   ```

4. **Object Methods**
   ```javascript
   const obj = { a: 1, b: 2, c: 3 };
   
   Object.keys(obj);    // Ambil semua key: ['a', 'b', 'c']
   Object.values(obj);  // Ambil semua value: [1, 2, 3]
   Object.entries(obj); // Ambil pasangan key-value: [['a', 1], ['b', 2], ['c', 3]]
   ```

5. **Error Handling (Penanganan Error)**
   ```javascript
   try {
       // Kode yang mungkin menghasilkan error
       throw new Error('Terjadi kesalahan');
   } catch (error) {
       console.error('Error:', error.message); // Tangani error
   } finally {
       // Selalu dijalankan, baik error maupun tidak
       console.log('Cleanup');
   }
   ```

**Kesimpulan**: JavaScript Essentials adalah fondasi untuk menulis kode Node.js yang modern, clean, dan efficient. Pemahaman tentang ES6+ features, asynchronous programming, dan functional programming sangat penting untuk development yang efektif.

---

## Jobsheet 5: Web Server and Express.js

### Kesimpulan Materi

**Express.js** adalah web application framework untuk Node.js yang minimal dan flexible, dirancang untuk memudahkan pembuatan web server dan API.

#### Poin-Poin Penting:

1. **Setup Express.js**
   ```bash
   npm install express
   ```
   
   ```javascript
   const express = require('express');
   const app = express();
   const port = 3000;
   
   app.listen(port, () => {
       console.log(`Server berjalan di port ${port}`);
   });
   ```

2. **Routing (Pengaturan Route)**
   ```javascript
   // Routing dasar
   app.get('/', (req, res) => {
       res.send('Hello World!');
   });
   
   app.post('/users', (req, res) => {
       res.send('Membuat user baru');
   });
   
   app.put('/users/:id', (req, res) => {
       res.send(`Update user dengan ID: ${req.params.id}`);
   });
   
   app.delete('/users/:id', (req, res) => {
       res.send(`Hapus user dengan ID: ${req.params.id}`);
   });
   ```

3. **Middleware**
   
   Middleware adalah fungsi yang memiliki akses ke request object, response object, dan next middleware.
   
   ```javascript
   // Built-in middleware (middleware bawaan)
   app.use(express.json()); // Parse JSON dari request body
   app.use(express.urlencoded({ extended: true })); // Parse data URL-encoded
   app.use(express.static('public')); // Sajikan file statis dari folder public
   
   // Custom middleware (middleware buatan sendiri)
   const logger = (req, res, next) => {
       console.log(`${req.method} ${req.url}`); // Log method dan URL
       next(); // Lanjut ke middleware berikutnya
   };
   app.use(logger);
   
   // Error handling middleware (middleware untuk handle error)
   app.use((err, req, res, next) => {
       console.error(err.stack);
       res.status(500).send('Terjadi kesalahan di server!');
   });
   ```

4. **Template Engines (Handlebars/HBS)**
   ```javascript
   const hbs = require('hbs');
   
   // Set view engine
   app.set('view engine', 'hbs');
   app.set('views', './templates/views');
   hbs.registerPartials('./templates/partials');
   
   // Render template dengan data
   app.get('/', (req, res) => {
       res.render('index', {
           title: 'Halaman Utama',
           name: 'John'
       });
   });
   ```

5. **Request dan Response Objects**
   ```javascript
   app.get('/example', (req, res) => {
       // Request object - data yang diterima dari client
       console.log(req.query);     // Query parameters (?name=value)
       console.log(req.params);    // Route parameters (/users/:id)
       console.log(req.body);      // Request body (data dari form/JSON)
       console.log(req.headers);   // Headers HTTP
       
       // Response methods - cara mengirim respon ke client
       res.send('text');           // Kirim text biasa
       res.json({ data: 'json' }); // Kirim JSON
       res.status(404).send('Tidak Ditemukan'); // Set status code
       res.redirect('/other');     // Redirect ke halaman lain
       res.render('view', data);   // Render template
   });
   ```

6. **Router untuk Modularisasi**
   ```javascript
   // routes/users.js - file terpisah untuk routes users
   const express = require('express');
   const router = express.Router();
   
   router.get('/', (req, res) => {
       res.send('Ambil semua users');
   });
   
   router.post('/', (req, res) => {
       res.send('Buat user baru');
   });
   
   module.exports = router;
   
   // app.js - import dan gunakan router
   const userRoutes = require('./routes/users');
   app.use('/users', userRoutes); // Semua route users dimulai dengan /users
   ```

**Kesimpulan**: Express.js menyederhanakan pembuatan web server dan API di Node.js dengan menyediakan struktur routing yang jelas, sistem middleware yang powerful, dan berbagai utilities untuk handling request dan response. Express adalah framework yang sangat populer dan menjadi standar industri untuk Node.js web development.

---

## Jobsheet 6: JSON HTTP Endpoints

### Kesimpulan Materi

**JSON HTTP Endpoints** adalah REST API endpoints yang menerima dan mengirim data dalam format JSON, yang merupakan standar untuk modern web APIs.

#### Poin-Poin Penting:

1. **JSON (JavaScript Object Notation)**
   
   JSON adalah format pertukaran data yang lightweight, mudah dibaca manusia, dan mudah diparse oleh mesin.
   
   ```json
   {
       "name": "John Doe",
       "age": 30,
       "email": "john@example.com",
       "hobbies": ["reading", "gaming"],
       "address": {
           "city": "Jakarta",
           "country": "Indonesia"
       }
   }
   ```

2. **Membuat RESTful JSON API**
   ```javascript
   const express = require('express');
   const app = express();
   
   // PENTING: Parse JSON dari request body
   app.use(express.json());
   
   // Data contoh (nanti diganti dengan database)
   let users = [
       { id: 1, name: 'John', email: 'john@example.com' },
       { id: 2, name: 'Jane', email: 'jane@example.com' }
   ];
   
   // GET semua users
   app.get('/api/users', (req, res) => {
       res.json(users);
   });
   
   // GET user berdasarkan ID
   app.get('/api/users/:id', (req, res) => {
       const user = users.find(u => u.id === parseInt(req.params.id));
       if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
       res.json(user);
   });
   
   // POST membuat user baru
   app.post('/api/users', (req, res) => {
       const newUser = {
           id: users.length + 1,
           name: req.body.name,
           email: req.body.email
       };
       users.push(newUser);
       res.status(201).json(newUser); // 201 = Created
   });
   
   // PUT update user
   app.put('/api/users/:id', (req, res) => {
       const user = users.find(u => u.id === parseInt(req.params.id));
       if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
       
       user.name = req.body.name;
       user.email = req.body.email;
       res.json(user);
   });
   
   // DELETE hapus user
   app.delete('/api/users/:id', (req, res) => {
       const index = users.findIndex(u => u.id === parseInt(req.params.id));
       if (index === -1) return res.status(404).json({ error: 'User tidak ditemukan' });
       
       const deleted = users.splice(index, 1);
       res.json({ message: 'User berhasil dihapus', user: deleted[0] });
   });
   ```

3. **Query Parameters untuk Filtering**
   ```javascript
   // GET /api/users?age=25&city=Jakarta
   app.get('/api/users', (req, res) => {
       let filtered = users;
       
       // Filter berdasarkan umur
       if (req.query.age) {
           filtered = filtered.filter(u => u.age === parseInt(req.query.age));
       }
       
       // Filter berdasarkan kota
       if (req.query.city) {
           filtered = filtered.filter(u => u.city === req.query.city);
       }
       
       res.json(filtered);
   });
   ```

4. **Input Validation (Validasi Input)**
   ```javascript
   app.post('/api/users', (req, res) => {
       // Validasi field yang wajib diisi
       if (!req.body.name || !req.body.email) {
           return res.status(400).json({ 
               error: 'Nama dan email wajib diisi' 
           });
       }
       
       // Validasi format email
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if (!emailRegex.test(req.body.email)) {
           return res.status(400).json({ 
               error: 'Format email tidak valid' 
           });
       }
       
       // Jika validasi lolos, buat user...
   });
   ```
       if (!req.body.name || !req.body.email) {
           return res.status(400).json({ 
               error: 'Name and email are required' 
           });
       }
       
       // Validate email format
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if (!emailRegex.test(req.body.email)) {
           return res.status(400).json({ 
               error: 'Invalid email format' 
           });
       }
       
       // Create user...
   });
   ```

5. **Response Structure Best Practices (Struktur Response yang Baik)**
   ```javascript
   // Success response (respon sukses)
   res.json({
       success: true,
       data: users,
       message: 'Data users berhasil diambil'
   });
   
   // Error response (respon error)
   res.status(400).json({
       success: false,
       error: 'Permintaan tidak valid',
       message: 'Field nama wajib diisi'
   });
   
   // Pagination (untuk data yang banyak)
   res.json({
       success: true,
       data: users,
       pagination: {
           page: 1,
           limit: 10,
           total: 100
       }
   });
   ```

6. **CORS (Cross-Origin Resource Sharing)**
   ```javascript
   const cors = require('cors');
   
   // Aktifkan CORS untuk semua routes
   app.use(cors());
   
   // Atau konfigurasi untuk origin tertentu
   app.use(cors({
       origin: 'http://localhost:3000', // Hanya izinkan dari origin ini
       methods: ['GET', 'POST', 'PUT', 'DELETE'] // Method yang diizinkan
   }));
   ```

**Kesimpulan**: JSON HTTP Endpoints adalah standar modern untuk membuat API yang dapat dikonsumsi oleh berbagai client (web, mobile, IoT). Dengan Express.js, membuat RESTful JSON API menjadi mudah dan straightforward. Penting untuk mengikuti best practices seperti proper status codes, validation, error handling, dan consistent response structure.

---

## Jobsheet 7: Version Control and App Deployment

### Kesimpulan Materi

**Version Control** menggunakan Git dan **App Deployment** adalah proses untuk mengelola source code dan men-deploy aplikasi ke production environment.

#### Poin-Poin Penting:

1. **Git Basics (Dasar-dasar Git)**
   
   **Setup Git:**
   ```bash
   git config --global user.name "Nama Anda"
   git config --global user.email "email.anda@example.com"
   ```
   
   **Perintah Dasar:**
   ```bash
   # Inisialisasi repository baru
   git init
   
   # Tambahkan file ke staging area
   git add .              # Tambahkan semua file
   git add filename.js    # Tambahkan file tertentu
   
   # Commit perubahan
   git commit -m "Pesan commit"
   
   # Cek status repository
   git status
   
   # Lihat history commit
   git log
   git log --oneline      # Format ringkas
   ```

2. **Working with Remote Repository (GitHub)**
   ```bash
   # Clone repository dari GitHub
   git clone https://github.com/user/repo.git
   
   # Tambahkan remote repository
   git remote add origin https://github.com/user/repo.git
   
   # Push ke remote (upload perubahan)
   git push origin main
   git push -u origin main  # Set upstream untuk pertama kali
   
   # Pull dari remote (download perubahan)
   git pull origin main
   
   # Cek daftar remote
   git remote -v
   ```

3. **Branching dan Merging**
   ```bash
   # Buat branch baru
   git branch feature-name
   git checkout -b feature-name  # Buat dan pindah sekaligus
   
   # Pindah branch
   git checkout main
   git switch main
   
   # Lihat daftar branch
   git branch
   git branch -a  # Termasuk remote branches
   
   # Merge branch (gabungkan perubahan dari branch lain)
   git checkout main          # Pindah ke main dulu
   git merge feature-name     # Gabungkan feature-name ke main
   
   # Hapus branch
   git branch -d feature-name  # Hapus branch lokal
   ```

4. **.gitignore File**
   
   File untuk mengabaikan file/folder tertentu agar tidak masuk ke version control:
   ```
   # Dependencies (jangan upload node_modules)
   node_modules/
   
   # Environment variables (jangan upload file .env karena berisi secret)
   .env
   .env.local
   
   # Logs (file log tidak perlu di-track)
   *.log
   logs/
   
   # OS files (file sistem operasi)
   .DS_Store
   Thumbs.db
   
   # IDE (pengaturan editor)
   .vscode/
   .idea/
   
   # Build outputs (hasil build tidak perlu di-track)
   dist/
   build/
   ```

5. **Environment Variables (Variabel Lingkungan)**
   
   **Menggunakan .env file:**
   ```bash
   npm install dotenv
   ```
   
   **.env file (simpan konfigurasi rahasia di sini):**
   ```
   PORT=3000
   DATABASE_URL=mongodb://localhost:27017/mydb
   API_KEY=your_secret_api_key
   NODE_ENV=development
   ```
   
   **Menggunakan di aplikasi:**
   ```javascript
   require('dotenv').config(); // Load variabel dari .env
   
   const port = process.env.PORT || 3000; // Gunakan PORT dari .env atau 3000
   const dbUrl = process.env.DATABASE_URL;
   const apiKey = process.env.API_KEY;
   ```

6. **Deployment Platforms (Platform Deployment)**
   
   **Heroku:**
   ```bash
   # Install Heroku CLI
   # Login ke Heroku
   heroku login
   
   # Buat aplikasi baru
   heroku create app-name
   
   # Deploy aplikasi
   git push heroku main
   
   # Set environment variables
   heroku config:set API_KEY=your_key
   
   # Lihat logs aplikasi
   heroku logs --tail
   ```
   
   **Vercel (untuk Node.js/Next.js):**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy aplikasi
   vercel
   
   # Production deployment
   vercel --prod
   ```
   
   **Railway:**
   - Hubungkan repository GitHub
   - Auto-deploy setiap kali push
   - Konfigurasi environment variables via dashboard

7. **Persiapan untuk Production**
   
   **package.json scripts:**
   ```json
   {
       "scripts": {
           "start": "node src/app.js",      // Jalankan aplikasi production
           "dev": "nodemon src/app.js",     // Jalankan aplikasi development
           "test": "jest"                   // Jalankan testing
       }
   }
   ```
   
   **Procfile (untuk Heroku):**
   ```
   web: node src/app.js
   ```
   
   **Port configuration (Konfigurasi Port):**
   ```javascript
   // Gunakan PORT dari environment atau default 3000
   const port = process.env.PORT || 3000;
   app.listen(port, () => {
       console.log(`Server berjalan di port ${port}`);
   });
   ```

**Kesimpulan**: Version control dengan Git adalah essential skill untuk developer modern, memungkinkan kolaborasi tim dan tracking perubahan code. Deployment platforms seperti Heroku, Vercel, dan Railway memudahkan proses deployment aplikasi Node.js ke production dengan minimal configuration. Pemahaman tentang environment variables dan .gitignore sangat penting untuk keamanan dan portability aplikasi.

---

## Jobsheet 8: MongoDB and Database Server

### Kesimpulan Materi

**MongoDB** adalah NoSQL database yang document-oriented, menggunakan format JSON-like (BSON) untuk menyimpan data. MongoDB sangat cocok untuk aplikasi Node.js karena schema-less dan bekerja dengan JavaScript objects.

#### Poin-Poin Penting:

1. **MongoDB Basics**
   
   **Konsep:**
   - **Database**: Container untuk collections
   - **Collection**: Mirip table di SQL, container untuk documents
   - **Document**: Data record dalam format JSON-like (BSON)
   - **Field**: Key-value pairs dalam document
   
   **Kelebihan MongoDB:**
   - Schema-less (flexible structure)
   - Scalability yang baik
   - Performance tinggi untuk read/write
   - Native JSON support
   - Rich query language

2. **MongoDB Installation dan Setup**
   ```bash
   # Install MongoDB driver untuk Node.js
   npm install mongodb
   
   # Atau install Mongoose (ODM - Object Data Modeling)
   npm install mongoose
   ```
   
   **Connection dengan MongoDB:**
   ```javascript
   const { MongoClient } = require('mongodb');
   
   const url = 'mongodb://localhost:27017';
   const dbName = 'myDatabase';
   
   const client = new MongoClient(url);
   
   async function connect() {
       try {
           await client.connect(); // Koneksi ke MongoDB
           console.log('Berhasil terhubung ke MongoDB');
           const db = client.db(dbName);
           return db;
       } catch (error) {
           console.error('Error koneksi:', error);
       }
   }
   ```

3. **CRUD Operations dengan Native MongoDB Driver**
   
   **Create (Insert - Memasukkan Data):**
   ```javascript
   // Insert satu document
   const result = await collection.insertOne({
       name: 'John Doe',
       email: 'john@example.com',
       age: 30
   });
   
   // Insert banyak documents sekaligus
   const result = await collection.insertMany([
       { name: 'John', age: 30 },
       { name: 'Jane', age: 25 }
   ]);
   ```
   
   **Read (Find - Membaca/Mencari Data):**
   ```javascript
   // Cari semua documents
   const users = await collection.find({}).toArray();
   
   // Cari dengan filter tertentu
   const user = await collection.findOne({ name: 'John' });
   
   // Cari dengan kondisi
   const adults = await collection.find({ age: { $gte: 18 } }).toArray();
   
   // Cari dengan projection (pilih field tertentu saja)
   const users = await collection.find({}, { 
       projection: { name: 1, email: 1, _id: 0 } // 1 = tampilkan, 0 = sembunyikan
   }).toArray();
   ```
   
   **Update (Mengupdate Data):**
   ```javascript
   // Update satu document
   const result = await collection.updateOne(
       { name: 'John' },              // Filter: document yang akan diupdate
       { $set: { age: 31 } }          // Update: ubah age menjadi 31
   );
   
   // Update banyak documents sekaligus
   const result = await collection.updateMany(
       { age: { $lt: 18 } },          // Semua yang umurnya < 18
       { $set: { status: 'minor' } }  // Ubah status jadi 'minor'
   );
   
   // Replace document (ganti seluruh document)
   const result = await collection.replaceOne(
       { name: 'John' },
       { name: 'John Doe', email: 'john@example.com', age: 31 }
   );
   ```
   
   **Delete (Menghapus Data):**
   ```javascript
   // Hapus satu document
   const result = await collection.deleteOne({ name: 'John' });
   
   // Hapus banyak documents sekaligus
   const result = await collection.deleteMany({ age: { $lt: 18 } });
   ```

4. **Mongoose ODM (Object Data Modeling)**
   
   **Setup Mongoose:**
   ```javascript
   const mongoose = require('mongoose');
   
   mongoose.connect('mongodb://localhost:27017/myDatabase', {
       useNewUrlParser: true,
       useUnifiedTopology: true
   });
   
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'Error koneksi:'));
   db.once('open', () => {
       console.log('Terhubung ke MongoDB dengan Mongoose');
   });
   ```
   
   **Define Schema dan Model:**
   ```javascript
   // Schema = struktur/blueprint dari document
   const userSchema = new mongoose.Schema({
       name: {
           type: String,
           required: true,      // Wajib diisi
           trim: true           // Hapus spasi di awal/akhir
       },
       email: {
           type: String,
           required: true,
           unique: true,        // Harus unik, tidak boleh duplikat
           lowercase: true      // Otomatis convert ke lowercase
       },
       age: {
           type: Number,
           min: 0,              // Minimal 0
           max: 120             // Maksimal 120
       },
       createdAt: {
           type: Date,
           default: Date.now    // Otomatis isi dengan tanggal sekarang
       }
   });
   
   // Model = class untuk berinteraksi dengan collection
   const User = mongoose.model('User', userSchema);
   ```
   
   **CRUD dengan Mongoose:**
   ```javascript
   // Create (Buat user baru)
   const user = new User({
       name: 'John Doe',
       email: 'john@example.com',
       age: 30
   });
   await user.save(); // Simpan ke database
   
   // Read (Baca data)
   const users = await User.find();                           // Ambil semua
   const user = await User.findOne({ email: 'john@example.com' }); // Cari satu
   const user = await User.findById(id);                      // Cari by ID
   
   // Update (Update data)
   await User.updateOne({ _id: id }, { age: 31 });
   const user = await User.findByIdAndUpdate(
       id, 
       { age: 31 }, 
       { new: true }  // Return document yang sudah diupdate
   );
   
   // Delete (Hapus data)
   await User.deleteOne({ _id: id });
   await User.findByIdAndDelete(id);
   ```

5. **Query Operators (Operator Query)**
   ```javascript\n   // Comparison Operators (Operator Perbandingan)
   { age: { $gt: 18 } }      // greater than (lebih dari 18)
   { age: { $gte: 18 } }     // greater than or equal (lebih dari atau sama dengan 18)
   { age: { $lt: 65 } }      // less than (kurang dari 65)
   { age: { $lte: 65 } }     // less than or equal (kurang dari atau sama dengan 65)
   { age: { $ne: 30 } }      // not equal (tidak sama dengan 30)
   { age: { $in: [20, 25, 30] } }  // in array (ada dalam array ini)
   
   // Logical Operators (Operator Logika)
   { $and: [{ age: { $gte: 18 } }, { age: { $lte: 65 } }] }  // DAN (keduanya harus true)
   { $or: [{ age: { $lt: 18 } }, { age: { $gt: 65 } }] }     // ATAU (salah satu true)
   
   // Regex (Pencarian dengan pattern)
   { name: { $regex: /john/i } }  // Cari nama yang mengandung 'john' (case insensitive)
   ```

6. **Express.js + MongoDB Integration**
   ```javascript
   const express = require('express');
   const mongoose = require('mongoose');
   const app = express();
   
   app.use(express.json());
   
   // Koneksi ke MongoDB
   mongoose.connect('mongodb://localhost:27017/myDatabase');
   
   // Routes dengan error handling
   app.get('/api/users', async (req, res) => {
       try {
           const users = await User.find();
           res.json(users);
       } catch (error) {
           res.status(500).json({ error: error.message });
       }
   });
   
   app.post('/api/users', async (req, res) => {
       try {
           const user = new User(req.body);
           await user.save();
           res.status(201).json(user);
       } catch (error) {
           res.status(400).json({ error: error.message });
       }
   });
   
   app.put('/api/users/:id', async (req, res) => {
       try {
           const user = await User.findByIdAndUpdate(\n               req.params.id, \n               req.body, \n               { new: true, runValidators: true } // new: return updated, runValidators: jalankan validasi\n           );
           if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
           res.json(user);
       } catch (error) {
           res.status(400).json({ error: error.message });
       }
   });
   
   app.delete('/api/users/:id', async (req, res) => {
       try {
           const user = await User.findByIdAndDelete(req.params.id);
           if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
           res.json({ message: 'User berhasil dihapus', user });
       } catch (error) {
           res.status(500).json({ error: error.message });
       }
   });
   ```

**Kesimpulan**: MongoDB adalah database yang powerful dan flexible untuk aplikasi Node.js. Dengan native MongoDB driver atau Mongoose ODM, developer dapat dengan mudah melakukan CRUD operations dan query complex data. Mongoose menyediakan structure melalui schemas, validation, dan berbagai features yang memudahkan development. Integrasi MongoDB dengan Express.js memungkinkan pembuatan full-stack applications dengan database persistence.

---

## Jobsheet 9: Socket Programming

### Kesimpulan Materi

**Socket Programming** memungkinkan komunikasi real-time dua arah (bi-directional) antara client dan server. Berbeda dengan HTTP yang request-response, socket memungkinkan server untuk mengirim data ke client kapan saja.

#### Poin-Poin Penting:

1. **Apa itu WebSocket?**
   - Protokol komunikasi full-duplex melalui single TCP connection
   - Memungkinkan real-time data transfer
   - Lebih efisien dibanding HTTP polling untuk real-time apps
   - Persistent connection (tidak perlu reconnect setiap kali)

2. **Socket.IO**
   
   Socket.IO adalah library JavaScript untuk real-time web applications yang mempermudah implementasi WebSocket.
   
   **Server-side (Node.js):**
   ```javascript
   const express = require('express');
   const http = require('http');
   const socketIO = require('socket.io');
   
   const app = express();
   const server = http.createServer(app);
   const io = socketIO(server);
   
   // Event ketika user terhubung
   io.on('connection', (socket) => {
       console.log('User terhubung:', socket.id);
       
       // Dengarkan event dari client
       socket.on('chat message', (msg) => {
           // Broadcast ke semua client
           io.emit('chat message', msg);
       });
       
       // Event ketika user disconnect
       socket.on('disconnect', () => {
           console.log('User terputus:', socket.id);
       });
   });
   
   server.listen(3000);
   ```
   
   **Client-side (Browser):**
   ```javascript
   const socket = io();
   
   // Kirim message ke server
   socket.emit('chat message', 'Halo Dunia!');
   
   // Terima message dari server
   socket.on('chat message', (msg) => {
       console.log('Pesan diterima:', msg);
   });
   ```

3. **Event Handling**
   - **emit()**: Mengirim event
   - **on()**: Mendengarkan event
   - **broadcast.emit()**: Mengirim ke semua client kecuali pengirim
   - **to(room).emit()**: Mengirim ke room tertentu
   - **disconnect**: Event saat client terputus

4. **Rooms dan Namespaces**
   ```javascript
   // Bergabung ke room tertentu
   socket.join('room1');
   
   // Kirim message ke room tertentu
   io.to('room1').emit('message', 'Halo room 1!');
   
   // Menggunakan namespace (untuk pemisahan channel)
   const chatNamespace = io.of('/chat');
   chatNamespace.on('connection', (socket) => {
       // Handle events untuk namespace chat
   });
   ```
   const chatNamespace = io.of('/chat');
   chatNamespace.on('connection', (socket) => {
       // Handle events untuk namespace chat
   });
   ```

5. **Use Cases (Kasus Penggunaan)**
   - **Chat applications**: Aplikasi chat real-time
   - **Live notifications**: Push notifications tanpa refresh halaman
   - **Collaborative tools**: Multiple users mengedit dokumen bersamaan
   - **Gaming**: Multiplayer games
   - **Live data updates**: Harga saham, skor pertandingan real-time
   - **IoT**: Real-time sensor data dari perangkat IoT

6. **Best Practices**
   - Implement authentication untuk keamanan
   - Handle disconnection dengan baik (graceful)
   - Gunakan rooms untuk scalability
   - Implement error handling yang proper
   - Monitor performance dan jumlah connections

**Kesimpulan**: Socket programming dengan Socket.IO membuka kemungkinan untuk membangun aplikasi real-time yang interaktif dan responsive. Ini adalah teknologi essential untuk aplikasi modern yang membutuhkan komunikasi instan antara client dan server, seperti chat apps, collaborative tools, dan live notifications.

---
