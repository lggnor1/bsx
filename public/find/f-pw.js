
import { sendPasswordResetEmail, getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyDKBSqfFbALvHZl3B_B9nT7TMa8S9MUr4U",
    authDomain: "bsx-ab06d.firebaseapp.com",
    projectId: "bsx-ab06d",
    storageBucket: "bsx-ab06d.firebasestorage.app",
    messagingSenderId: "207778898458",
    appId: "1:207778898458:web:35ced1792936ad2856a7a3",
    measurementId: "G-VLZY30SCBP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const resetPasswordForm = $('#reset-password-form');
const emailInput = $('#reset-email');

resetPasswordForm.on('submit', (event) => {
    event.preventDefault();

    const email = emailInput.val().trim(); // 이메일 앞뒤 공백 제거

    // 이메일이 비어있는지 확인
    if (!email) {
        alert("Please enter your email.");
        return;
    }

    // 이메일 형식이 올바른지 확인
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // 비밀번호 재설정 이메일 전송
    sendPasswordResetEmail(auth, email)
    .then(() => {
        alert("Check email to reset the password.");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`An error has occurred. If the problem persists, please contact the customer service center: ${errorMessage}`);
    });
});