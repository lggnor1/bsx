// 페이지 로딩 애니메이션
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const contentWrapper = document.querySelector('.content-wrapper');

    setTimeout(() => {
        loadingScreen.classList.add('hide');
        contentWrapper.classList.add('show');
    }, 50); // 0.05초 후에 로딩 화면이 사라지고 콘텐츠가 나타납니다
});

// 브라우저 언어 감지 함수
function detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('ko')) {
        return 'ko';
    } else {
        return 'en';  // 기본값은 영어
    }
}

// 베이스 URL 설정
const baseUrl = '/'; // 호스팅할 때는 / 만

// 언어에 따른 페이지 리다이렉트 함수
function redirectToLanguagePage(lang) {
    const currentPath = window.location.pathname;
    
    // 이미 language 디렉토리에 있는지 확인
    if (currentPath.includes('language/${lang}')) {
        // language 디렉토리에 이미 있다면, 해당 디렉토리 내에서 언어만 변경
        window.location.href = `${baseUrl}language/${lang}/home.html`;
    } else {
        // language 디렉토리에 없다면, language 디렉토리로 이동
        window.location.href = `${baseUrl}language/${lang}/home.html`;
    }
}

// 현재 페이지의 언어 확인 함수
function getCurrentLanguage() {
    const path = window.location.pathname;
    if (path.includes('language/ko/home.html')) {
        return 'ko';
    } else if (path.includes('language/en/home.html')) {
        return 'en';
    }
    return 'lang'; // 기본값
}

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
        redirectToLanguagePage(detectedLang); // 감지된 언어로 리다이렉트
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
