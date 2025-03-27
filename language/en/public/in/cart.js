// 장바구니 데이터를 저장할 배열
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// 장바구니 아이콘의 숫자를 업데이트하는 함수
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    cartCount.textContent = cart.length;
}

// 장바구니 아이템을 HTML로 렌더링하는 함수
function updateCartItems() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <span>${item.title} - ${item.price}</span>
            <button class="removeItem" data-index="${index}">삭제</button>
        `;
        cartItems.appendChild(itemElement);
    });
}

// 장바구니 총액을 계산하고 표시하는 함수
function updateCartTotal() {
    const cartTotal = document.getElementById('cartTotal');
    const total = cart.reduce((sum, item) => {
        const price = item.price.replace(/[^0-9]/g, '');
        return sum + parseInt(price);
    }, 0);
    cartTotal.textContent = `총액: ₩${total.toLocaleString()}`;
}

// 장바구니에서 아이템을 제거하는 함수
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartItems();
    updateCartTotal();
}

// 장바구니에 아이템을 추가하는 함수
function addToCart(title, price) {
    cart.push({ title, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartItems();
    updateCartTotal();
}

// 페이지 로드 시 실행되는 초기화 함수
document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cartIcon');
    const cartModal = document.getElementById('cartModal');
    const closeBtn = document.getElementsByClassName('close')[0];

    updateCartCount();
    updateCartItems();
    updateCartTotal();

    // 장바구니 아이콘 클릭 시 모달 표시
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        cartModal.style.display = 'block';
    });

    // 모달 닫기 버튼 클릭 시 모달 숨김
    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // 모달 외부 클릭 시 모달 숨김
    window.addEventListener('click', (e) => {
        if (e.target == cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // 장바구니 아이템 삭제 버튼 클릭 이벤트
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('removeItem')) {
            const index = e.target.getAttribute('data-index');
            removeFromCart(index);
        }
    });

    // 상품 선택 버튼 클릭 이벤트
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('addToCart')) {
            const title = e.target.getAttribute('data-title');
            const price = e.target.getAttribute('data-price');
            addToCart(title, price);
        }
    });

    // 구매하기 버튼 클릭 이벤트
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
        // 결제 모달 표시 (payment.js에서 처리)
        showPaymentModal();
    });
});