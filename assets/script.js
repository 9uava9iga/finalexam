let cart = [];
let currentProduct = null;
let isLoggedIn = false;

function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = (cartModal.style.display === 'block') ? 'none' : 'block';
    updateCart();
}

function toggleLogin() {
    const loginModal = document.getElementById('login-modal');
    loginModal.style.display = (loginModal.style.display === 'block') ? 'none' : 'block';
}

function showRegister() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

function showLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
}

function login(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // 檢查用戶是否已註冊（這裡應該連接到伺服器進行驗證）
    const user = JSON.parse(localStorage.getItem(email));

    if (user && user.password === password) {
        isLoggedIn = true;
        alert('登入成功');
        toggleLogin();
    } else {
        alert('電子郵件或密碼錯誤');
    }
}

function register(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    const user = { name, phone, address, email, password };
    localStorage.setItem(email, JSON.stringify(user));
    alert('註冊成功');
    showLogin();
}

function showQuantityModal(product, price) {
    currentProduct = { product, price };
    document.getElementById('product-info').innerText = `產品：${product}，價格：$${price}`;
    document.getElementById('quantity-modal').style.display = 'block';
}

function closeQuantityModal() {
    document.getElementById('quantity-modal').style.display = 'none';
}

function addToCartFromModal() {
    const quantity = parseInt(document.getElementById('quantity').value);
    cart.push({ ...currentProduct, quantity });
    closeQuantityModal();
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.innerText = `${item.product} - 數量：${item.quantity} - 價格：$${item.price * item.quantity}`;
        const removeButton = document.createElement('button');
        removeButton.innerText = '移除';
        removeButton.onclick = () => {
            cart.splice(index, 1);
            updateCart();
        };
        itemElement.appendChild(removeButton);
        cartItems.appendChild(itemElement);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').innerText = `總價：$${totalPrice}`;
}

function clearCart() {
    cart = [];
    updateCart();
}

function showCheckoutModal() {
    if (isLoggedIn) {
        document.getElementById('checkout-modal').style.display = 'block';
    } else {
        alert('請先登入');
        toggleLogin();
    }
}

function closeCheckoutModal() {
    document.getElementById('checkout-modal').style.display = 'none';
}

function checkout(event) {
    event.preventDefault();
    const name = document.getElementById('checkout-name').value;
    const phone = document.getElementById('checkout-phone').value;
    const address = document.getElementById('checkout-address').value;
    const paymentMethod = document.getElementById('payment-method').value;
    const creditCardNumber = document.getElementById('credit-card-number').value;

    if (paymentMethod === 'credit-card' && !creditCardNumber) {
        alert('請填寫信用卡卡號');
        return;
    }

    alert(`訂單已提交！
    姓名：${name}
    電話：${phone}
    地址：${address}
    支付方式：${paymentMethod === 'credit-card' ? '刷卡付款' : '貨到付款'}
    ${paymentMethod === 'credit-card' ? `信用卡卡號：${creditCardNumber}` : ''}`);

    cart = [];
    closeCheckoutModal();
    updateCart();
}

function toggleCreditCardInput() {
    const paymentMethod = document.getElementById('payment-method').value;
    const creditCardInfo = document.getElementById('credit-card-info');
    creditCardInfo.style.display = paymentMethod === 'credit-card' ? 'block' : 'none';
}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("topBtn").style.display = "block";
    } else {
        document.getElementById("topBtn").style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function prevSlide() {
    const carousel = document.querySelector('.carousel-inner');
    const active = carousel.querySelector('.carousel-item.active');
    active.classList.remove('active');
    if (active.previousElementSibling) {
        active.previousElementSibling.classList.add('active');
    } else {
        carousel.lastElementChild.classList.add('active');
    }
}

let slideIndex = 1;
let autoplay;
let slideInterval = setInterval(() => changeSlide(1), 2000);

    showSlides(slideIndex);
    function changeSlide(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let slides = document.getElementsByClassName("carousel")[0] .getElementsByTagName("img");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active-dot", "");
        }
        slides[slideIndex-1].style.display = "block";  
        dots[slideIndex-1].className += " active-dot";
    }
    