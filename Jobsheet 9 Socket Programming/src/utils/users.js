const users = []

// Tambah Pengguna
const tambahPengguna = ({id, username, room}) => {
    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Validate the data
    if (!username || !room) {
        return {
            error: 'Username dan room dibutuhkan!'
        }
    }

    // Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    // Validate username
    if (existingUser) {
        return {
            error: 'Username sudah digunakan!'
        }
    }

    // Store user
    const user = {id, username, room}
    users.push(user)
    return {user}
}

// Hapus Pengguna
const hapusPengguna = (id) => {
    const index = users.findIndex((user) => user.id === id)
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

// Ambil Pengguna
const ambilPengguna = (id) => {
    return users.find((user) => user.id === id)
}

// Ambil Pengguna Dari Room
const ambilPenggunaDariRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}

module.exports = {
    tambahPengguna,
    hapusPengguna,
    ambilPengguna,
    ambilPenggunaDariRoom
}