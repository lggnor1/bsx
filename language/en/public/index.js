import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, doc, setDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";

// Firebase 설정
const firebaseConfig = {
    apiKey: "AIzaSyDKBSqfFbALvHZl3B_B9nT7TMa8S9MUr4U",
    authDomain: "bsx-ab06d.firebaseapp.com",
    projectId: "bsx-ab06d",
    storageBucket: "bsx-ab06d.firebasestorage.app",
    messagingSenderId: "207778898458",
    appId: "1:207778898458:web:35ced1792936ad2856a7a3",
    measurementId: "G-VLZY30SCBP"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 사용자의 IP 및 기기 정보 가져오기
async function getUserInfo() {
    try {
        const ipResponse = await fetch("https://api64.ipify.org?format=json");
        const ipData = await ipResponse.json();
        const ipAddress = ipData.ip || "Unknown";

        const userAgent = navigator.userAgent;
        const platform = navigator.platform;

        return { ipAddress, userAgent, platform };
    } catch (error) {
        console.error("Failed to get user information:", error);
        return { ipAddress: "Unknown", userAgent: "Unknown", platform: "Unknown" };
    }
}

function validatePassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

// Firestore에서 ID 중복 확인
async function isIdDuplicate(id) {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
}

$(document).ready(function () {
    const password = $('#password');
    const confirmPassword = $('#confirm-password');
    const passwordError = $('#password-error');
    const registerButton = $('#register');

    function checkPasswords() {
        if (password.val() === confirmPassword.val()) {
            passwordError.hide();
            registerButton.prop('disabled', false);
        } else {
            passwordError.show();
            registerButton.prop('disabled', true);
        }
    }

    password.on('input', checkPasswords);
    confirmPassword.on('input', checkPasswords);

    $('#register').on('click', async function (e) {
        e.preventDefault();

        const id = $('#id').val();
        const firstName = $('#f-name').val();
        const lastName = $('#l-name').val();
        const email = $('#email').val();
        const phone = $('#phone').val();
        const password = $('#password').val();
        const confirmPassword = $('#confirm-password').val();

        if (password !== confirmPassword) {
            alert("Password does not match.");
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            alert("Invalid email address.");
            return;
        }

        if (!validatePassword(password)) {
            alert("Passwords must be at least 8 characters long and contain uppercase or lowercase letters, numbers, and special characters.");
            return;
        }

        try {
            // Firestore에서 ID 중복 확인
            const idExists = await isIdDuplicate(id);
            if (idExists) {
                alert("This ID is already in use. Please enter a different ID.");
                return;
            }

            // Firebase Authentication으로 사용자 생성
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userInfo = await getUserInfo();

            // Firestore에 사용자 정보 저장
            await setDoc(doc(db, "users", user.uid), {
                id: id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                ipAddress: userInfo.ipAddress,
                deviceInfo: {
                    userAgent: userInfo.userAgent,
                    platform: userInfo.platform
                },
                createdAt: new Date().toISOString()
            });

            console.log("Successfully signed up!");
            window.location.reload();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('This email is already in use, please use another email.');
            } else {
                alert("An error has occurred. If the problem persists, please contact the customer service center:", error.message);
            }
        }
    });

    // 비밀번호 보기/숨기기 토글 함수
    function togglePasswordVisibility(inputId, toggleId) {
        const input = $(`#${inputId}`);
        const toggle = $(`#${toggleId}`);
    
        toggle.on('click', function() {
            if (input.attr('type') === 'password') {
                input.attr('type', 'text');
                toggle.removeClass('fa-eye-slash').addClass('fa-eye');
            } else {
                input.attr('type', 'password');
                toggle.removeClass('fa-eye').addClass('fa-eye-slash');
            }
        });
    }

    // 비밀번호 필드에 대한 토글 기능 적용
    togglePasswordVisibility('password', 'password-toggle');
    togglePasswordVisibility('confirm-password', 'confirm-password-toggle');
    togglePasswordVisibility('login-password', 'login-password-toggle');

    // 로그인 버튼 클릭 이벤트
    $('#login').on('click', async function (e) {
        e.preventDefault();

        const email = $('#login-email').val();
        const password = $('#login-password').val();

        try {
            await signInWithEmailAndPassword(auth, email, password);

            console.log("Successfully logged in!");
            window.location.href = 'login/en.html';  // 로그인 후 이동할 페이지
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                alert("Password does not match.");
            } else {
                alert("An error has occurred. If the problem persists, please contact the customer service center:", error.message);
            }
        }
    });
});