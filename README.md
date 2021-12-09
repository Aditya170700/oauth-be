# oauth-be

1. Jalankan servernya (oauth-be) 'nodemon start' / 'node index.js'
2. Jalankan clientnya (oauth-fe) 'npm run serve'
3. Akses root client (http://localhost:8082), kemudian ketika button "Google Sign In" di klik, client melakukan request ke server
4. Server melakukan request ke provider oauth (google)
5. Provider oauth (google) mengirim response berupa page html (choose account google)
6. Ketika salah satu akun dipilih, google akan mengirimkan data akun tersebut ke server
7. Server melakukan pengecekan data yang diterima dari google, jika ada di database, server generate jwt, jika tidak ada, server akan insert data akun baru, kemudian baru generate jwt
8. Jwt dikirim ke client
9. Client menerima jwt dan jwt di store ke local storage
