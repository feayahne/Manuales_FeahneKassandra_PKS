document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Clear local storage to remove data from the previous user
        localStorage.clear();

        // Get the username and password from the form
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Perform login (this is just a placeholder, replace with actual login logic)
        fetch('authenticate.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `username=${username}&password=${password}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Store the username in local storage
                localStorage.setItem('username', data.username);

                // Fetch booking data for the user
                fetch('fetch_bookings.php')
                    .then(response => response.json())
                    .then(bookings => {
                        if (bookings.length > 0) {
                            const booking = bookings[0]; // Assuming you want to display the first booking
                            localStorage.setItem('bookingData', JSON.stringify(booking));
                        }
                        // Redirect to dashboard
                        window.location.href = 'dashboard.html';
                    });
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    });
    document.getElementById("google").addEventListener("click", googleLogin);
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth,GoogleAuthProvider,signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyALfS-j1IHbardWc2pwZZQXdxJLmocAEQM",
    authDomain: "hotelbookingsystem-20ec1.firebaseapp.com",
    projectId: "hotelbookingsystem-20ec1",
    storageBucket: "hotelbookingsystem-20ec1.firebasestorage.app",
    messagingSenderId: "529459522992",
    appId: "1:529459522992:web:3e78f5f77a6f5e835afa75"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth();
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();
const googlelogin = document.getElementById("google");
googlelogin.addEventListener("click", function(){
  signInWithPopup(auth, provider)
.then((result) => {

  const credential = GoogleAuthProvider.credentialFromResult(result);
  const user = result.user;
  console.log(user);
  window.location.href = "";
}).catch((error) => {
 
  const errorCode = error.code;
  const errorMessage = error.message;
});
})
