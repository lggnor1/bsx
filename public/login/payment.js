// 결제 모달 표시 함수
function showPaymentModal() {
    const paymentModal = document.getElementById('paymentModal');
    paymentModal.style.display = 'block';
}

// 결제 방법에 따른 상세 정보 표시 함수
function showPaymentDetails(method) {
    const paymentDetails = document.getElementById('paymentDetails');
    let detailsHTML = '';

    switch(method) {
        case 'paypalBtn':
            detailsHTML = `
                <h3>PayPal 결제</h3>
                <p>PayPal 계정으로 안전하게 결제하세요.</p>
                <button onclick="processPayment('PayPal')">PayPal로 결제하기</button>
            `;
            break;
        case 'cardBtn':
            detailsHTML = `
                <h3>신용카드 결제</h3>
                <form id="cardForm">
                    <input type="text" placeholder="카드 번호" required>
                    <input type="text" placeholder="만료일 (MM/YY)" required>
                    <input type="text" placeholder="CVV" required>
                    <button type="submit">결제하기</button>
                </form>
            `;
            break;
        case 'kakaoPayBtn':
            detailsHTML = `
                <h3>카카오페이 결제</h3>
                <p>카카오페이로 간편하게 결제하세요.</p>
                <button onclick="processPayment('KakaoPay')">카카오페이로 결제하기</button>
            `;
            break;
        case 'bankTransferBtn':
            detailsHTML = `
                <h3>계좌이체</h3>
                <p>아래 계좌로 입금해 주세요:</p>
                <p>은행명: 토스뱅크</p>
                <p>계좌번호: 1908-8805-9285</p>
                <p>예금주: 이기성성</p>
                <button onclick="processPayment('BankTransfer')">입금 완료</button>
            `;
            break;
    }

    paymentDetails.innerHTML = detailsHTML;

    if (method === 'cardBtn') {
        document.getElementById('cardForm').addEventListener('submit', (e) => {
            e.preventDefault();
            processPayment('CreditCard');
        });
    }
}

// 결제 처리 함수 (실제 결제 처리는 구현되어 있지 않음)
function processPayment(method) {
    alert(`${method} 결제가 완료되었습니다!`);
    // 장바구니 비우기
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartItems();
    updateCartTotal();
    document.getElementById('paymentModal').style.display = 'none';
}

// 페이지 로드 시 실행되는 초기화 함수
document.addEventListener('DOMContentLoaded', () => {
    const paymentModal = document.getElementById('paymentModal');
    const closeBtns = document.getElementsByClassName('close');

    // 결제 방법 버튼 클릭 이벤트
    const paymentMethods = document.getElementById('paymentMethods');
    paymentMethods.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const method = e.target.id;
            showPaymentDetails(method);
        }
    });

    // 모든 닫기 버튼에 이벤트 리스너 추가
    Array.from(closeBtns).forEach(btn => {
        btn.addEventListener('click', () => {
            paymentModal.style.display = 'none';
        });
    });

    // 모달 외부 클릭 시 모달 숨김
    window.addEventListener('click', (e) => {
        if (e.target == paymentModal) {
            paymentModal.style.display = 'none';
        }
    });
});