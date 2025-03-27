let currentCardIndex = 0;
const cards = [
    {
        title: '기본 플랜',
        price: '무료',
        features: [
            '불필요한 파일 삭제',
            '실시간 성능 모니터링 대시보드',
            '자체 광고'
        ]
    },
    {
        title: '광고 제거 플랜',
        price: '월 ₩2000',
        features: [
            '모든 기본 플랜 기능 포함(자체 광고 제외)',
            '자체 광고 제거(웹사이트 포함)',
        ]
    },
    {
        title: 
        // '스탠다드 플랜',
        '제작중',
        price: 
        // '월 ₩5000, 년 ₩54000',
        '제작중',
        features: [
            // '모든 광고 제거 플랜 기능 포함',
            // '실시간 성능 모니터링 대시보드',
            // 'CPU/RAM 사용량 모니터링 및 알림',
            // '자동 업데이트',
            // 'config',
            // '기본 시스템 최적화',
            // '실행 프로그램 목록 및 사용 시간',
            // '다중 장치 동기화'
            '제작중'
        ]
    },
    // {
    //     title: 
    //     '프로 플랜',
    //     //'제작중',
    //     price: 
    //     '월 ₩10000, 년 ₩102000',
    //     //'제작중',
    //     features: [
    //         // '모든 스탠다드 플랜 기능',
    //         // '고급 시스템 최적화',
    //         // '팝업 광고(백신 등) 차단 & 알림',
    //         // '시스템 리소스 제한 관리',
    //         // 'Beta 접근 권한',
    //         // '디스코드 "프로" 역할',
    //         // '우선 지원 및 전용 고객 서비스'
    //         // '제작중',
    //     ]
    // },

    // 제작중
    // {
    //     title: 
    //     // '프리미엄 플랜',
    //     //'제작중',
    //     price:
    //     // '월 ₩15000, 년 ₩153000',
    //     // '제작중',
    //     features: [
    //         // '모든 프로 플랜 기능',
    //         // '맞춤형 성능 보고서 제공',
    //         // '고금 보안 기능',
    //         // '스케줄러 기능',
    //         // '게임 모드',
    //         // '시스템 복원 기능'
    //         // '제작중',
            
    //     ]
    // }
];

const cardElement = document.getElementById('card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateCard(direction) {
    const oldCard = cardElement.cloneNode(true);
    oldCard.classList.add('old-card');
    cardElement.parentNode.insertBefore(oldCard, cardElement);

    const card = cards[currentCardIndex];
    cardElement.innerHTML = `
        <h2>${card.title}</h2>
        <p>${card.price}</p>
        <ul>
            ${card.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        <button><a href="../public/ko.html" style="text-decoration: none;">선택하기</a></button>
    `;

    cardElement.style.transform = `translateX(${direction === 'next' ? '100%' : '-100%'})`;
    cardElement.style.opacity = '0';

    setTimeout(() => {
        cardElement.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        cardElement.style.transform = 'translateX(0)';
        cardElement.style.opacity = '1';
        oldCard.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        oldCard.style.transform = `translateX(${direction === 'next' ? '-100%' : '100%'})`;
        oldCard.style.opacity = '0';
    }, 50);

    setTimeout(() => {
        oldCard.remove();
        cardElement.style.transition = '';
    }, 550);
}

prevBtn.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
    updateCard('prev');
});

nextBtn.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex + 1) % cards.length;
    updateCard('next');
});

updateCard('next'); // 첫 카드로 초기화

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
const baseUrl = '/bs/web/ex/'; // 실제 프로젝트의 루트 URL로 변경해주세요

// 언어에 따른 페이지 리다이렉트 함수
function redirectToLanguagePage(lang) {
    const currentPath = window.location.pathname;
    
    // 이미 language 디렉토리에 있는지 확인
    if (currentPath.includes('language')) {
        // language 디렉토리에 이미 있다면, 해당 디렉토리 내에서 언어만 변경
        window.location.href = `${baseUrl}language/${lang}.html`;
    } else {
        // language 디렉토리에 없다면, language 디렉토리로 이동
        window.location.href = `${baseUrl}language/${lang}.html`;
    }
}

// 현재 페이지의 언어 확인 함수
function getCurrentLanguage() {
    const path = window.location.pathname;
    if (path.includes('language/ko.html')) {
        return 'ko';
    } else if (path.includes('language/en.html')) {
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