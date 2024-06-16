document.addEventListener('DOMContentLoaded', (event) => {
    // 星級評論
    const stars = document.querySelectorAll('.star');
    let selectedRating = 0;

    stars.forEach((star) => {
        star.addEventListener('click', () => {
            selectedRating = star.getAttribute('data-value');
            updateStarRating(selectedRating);
        });
    });

    function updateStarRating(rating) {
        stars.forEach((star) => {
            if (star.getAttribute('data-value') <= rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }

    // 加入購物車
    const addToCartButton = document.getElementById('add-to-cart');
    addToCartButton.addEventListener('click', () => {
        const quantity = document.getElementById('quantity').value;
        alert(`已加入 ${quantity} 件商品至購物車`);
    });

    // 提交評論
    const submitReviewButton = document.getElementById('submit-review');
    submitReviewButton.addEventListener('click', () => {
        const reviewText = document.getElementById('review-text').value;
        if (reviewText.trim() === '') {
            alert('請輸入評論內容');
            return;
        }
        addReview(reviewText);
        document.getElementById('review-text').value = '';
    });

    function addReview(reviewText) {
        const reviewList = document.getElementById('review-list');
        const newReview = document.createElement('div');
        newReview.classList.add('review');
        newReview.innerText = reviewText;
        reviewList.appendChild(newReview);
    }
});