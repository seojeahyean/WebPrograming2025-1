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
    username = username.trim();
    password = password.trim();
    email = email.trim();
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
    username = username.trim();
    password = password.trim();
    const users = getUserData();
    if (users[username] && users[username].password === password) { // In a real app, compare hashed passwords!
        return { success: true, message: 'Login successful.' };
    }
    return { success: false, message: 'Invalid username or password.' };
}

/**
 * Saves the array of bookmark objects for a user.
 * @param {string} username - The username.
 * @param {Array<{name: string, url: string}>} bookmarks - The array of bookmark objects.
 * @returns {{success: boolean, message?: string}}
 */
function saveUserBookmarks(username, bookmarks) {
    const users = getUserData();
    if (users[username]) {
        users[username].bookmarks = bookmarks; // Will now store array of objects
        setUserData(users);
        return { success: true, message: 'Bookmarks saved.' };
    }
    return { success: false, message: 'User not found.' };
}

/**
 * Loads the array of bookmark objects for a user.
 * @param {string} username - The username.
 * @returns {Array<{name: string, url: string}>} The array of bookmark objects, or an empty array.
 */
function loadUserBookmarks(username) {
    const users = getUserData();
    if (users[username] && users[username].bookmarks) {
        return users[username].bookmarks; // Will now return array of objects
    }
    return [];
}
