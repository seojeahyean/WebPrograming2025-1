// userdata.js

function getUserData() {
    const data = localStorage.getItem('userData');
    try {
        return data ? JSON.parse(data) : {};
    } catch (e) {
        console.error("Error parsing user data from localStorage", e);
        return {};
    }
}

function setUserData(data) {
    localStorage.setItem('userData', JSON.stringify(data));
}

function registerUser(username, password, email) {
    const users = getUserData();

    // Check for existing username or email
    for (const existingUser in users) {
        if (existingUser === username || users[existingUser].email === email) {
            return { success: false, message: 'Username or email already exists.' };
        }
    }

    users[username] = {
        password: password, // In a real app, hash the password!
        email: email,
        bookmarks: []
    };
    setUserData(users);
    return { success: true, message: 'User registered successfully.' };
}

function loginUser(username, password) {
    const users = getUserData();
    if (users[username] && users[username].password === password) { // In a real app, compare hashed passwords!
        return { success: true, message: 'Login successful.' };
    }
    return { success: false, message: 'Invalid username or password.' };
}

function saveUserBookmarks(username, bookmarks) {
    const users = getUserData();
    if (users[username]) {
        users[username].bookmarks = bookmarks;
        setUserData(users);
        return { success: true, message: 'Bookmarks saved.' };
    }
    return { success: false, message: 'User not found.' };
}

function loadUserBookmarks(username) {
    const users = getUserData();
    if (users[username]) {
        return users[username].bookmarks || [];
    }
    return []; // Return empty array if user or bookmarks not found
}
