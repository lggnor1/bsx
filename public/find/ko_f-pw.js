
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
        alert("이메일을 입력해주세요.");
        return;
    }

    // 이메일 형식이 올바른지 확인
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        alert("올바른 이메일 주소를 입력해주세요.");
        return;
    }

    // 비밀번호 재설정 이메일 전송
    sendPasswordResetEmail(auth, email)
    .then(() => {
        alert("이메일을 확인하여 비밀번호를 재설정하세요.");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`오류가 발생했습니다. 문제가 계속되면 고객 센터에 문의해 주세요: ${errorMessage}`);
    });
});


// 페이지 로딩 애니메이션
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const contentWrapper = document.querySelector('.content-wrapper');

    setTimeout(() => {
        loadingScreen.classList.add('hide');
        contentWrapper.classList.add('show');
    }, 50); // 0.05초 후에 로딩 화면이 사라지고 콘텐츠가 나타납니다
});

// 페이지 로드 시 실행되는 함수
function initializePage() {
    const currentLang = getCurrentLanguage();
    const languageSelect = document.getElementById('languageSelect');
    
    // 현재 언어에 맞게 드롭다운 값 설정
    languageSelect.value = currentLang;

    // 언어 선택 이벤트 리스너
    languageSelect.addEventListener('change', function() {
        if (this.value !== 'lang' && this.value !== currentLang) {
            redirectToLanguagePage(this.value);
        }
    });

    // 첫 페이지 로드 시 언어 리다이렉트 (필요한 경우)
    if (currentLang === 'lang') {
        const detectedLang = detectLanguage();
        redirectToLanguagePage(detectedLang);
    }

    // 로딩 애니메이션
    const loadingScreen = document.querySelector('.loading-screen');
    const contentWrapper = document.querySelector('.content-wrapper');

    setTimeout(() => {
        loadingScreen.classList.add('hide');
        contentWrapper.classList.add('show');
    }, 2000);
}

// 페이지 로드 시 초기화 함수 실행
window.addEventListener('load', initializePage);