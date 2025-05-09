// Key for localStorage
const CART_KEY = 'aglow_cart_qty';
const UNIT_PRICE = 249.0;

// Utility functions
function getCartQty() {
    return parseInt(localStorage.getItem(CART_KEY)) || 1;
}
function setCartQty(qty) {
    localStorage.setItem(CART_KEY, qty);
}

// Update cart badge in navbar
function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) badge.textContent = getCartQty();
}

// Update price in main section and dialog
function updatePrices(qty) {
    // Main section
    const mainTotal = document.getElementById('main-total-price');
    if (mainTotal) {
        mainTotal.textContent = `$${(UNIT_PRICE * qty).toFixed(2)}`;
    }
    // Dialog
    const dialogTotal = document.getElementById('cart-dialog-total-price');
    if (dialogTotal) {
        dialogTotal.textContent = `$${(UNIT_PRICE * qty).toFixed(2)}`;
    }
}

// Dialog elements
const cartDialog = document.getElementById('cart-dialog');
const addToCartBtn = document.getElementById('add-to-cart-btn');
const cartDialogClose = document.getElementById('cart-dialog-close');
const cartDialogQtyInput = document.getElementById('cart-dialog-qty-input');
const cartDialogIncrease = document.getElementById('cart-dialog-increase');
const cartDialogDecrease = document.getElementById('cart-dialog-decrease');
const cartDialogSave = document.getElementById('cart-dialog-save');
const mainQtyInput = document.getElementById('qty');
const mainIncrease = document.getElementById('main-increase');
const mainDecrease = document.getElementById('main-decrease');

// Open dialog
function openCartDialog() {
    cartDialog.classList.add('open');
    const qty = getCartQty();
    cartDialogQtyInput.value = qty;
    updatePrices(qty);
}

// Close dialog
function closeCartDialog() {
    cartDialog.classList.remove('open');
}

// Add to Cart button click
if (addToCartBtn) {
    addToCartBtn.addEventListener('click', openCartDialog);
}
if (cartDialogClose) {
    cartDialogClose.addEventListener('click', closeCartDialog);
}

// Quantity controls in dialog
if (cartDialogIncrease) {
    cartDialogIncrease.addEventListener('click', () => {
        let qty = parseInt(cartDialogQtyInput.value) || 1;
        if (qty < 10) qty++;
        cartDialogQtyInput.value = qty;
        updatePrices(qty);
    });
}
if (cartDialogDecrease) {
    cartDialogDecrease.addEventListener('click', () => {
        let qty = parseInt(cartDialogQtyInput.value) || 1;
        if (qty > 1) qty--;
        cartDialogQtyInput.value = qty;
        updatePrices(qty);
    });
}

// Save button in dialog
if (cartDialogSave) {
    cartDialogSave.addEventListener('click', () => {
        let qty = parseInt(cartDialogQtyInput.value) || 1;
        qty = Math.max(1, Math.min(10, qty));
        setCartQty(qty);
        updateCartBadge();
        // Sync main section
        if (mainQtyInput) mainQtyInput.value = qty;
        updatePrices(qty);
        closeCartDialog();
    });
}

// Ensure input is always between 1 and 10 (even if user tries to edit via keyboard)
if (cartDialogQtyInput) {
    cartDialogQtyInput.addEventListener('input', () => {
        let qty = parseInt(cartDialogQtyInput.value) || 1;
        if (qty < 1) qty = 1;
        if (qty > 10) qty = 10;
        cartDialogQtyInput.value = qty;
        updatePrices(qty);
    });
}

// Main section quantity controls
if (mainIncrease) {
    mainIncrease.addEventListener('click', () => {
        let qty = parseInt(mainQtyInput.value) || 1;
        if (qty < 10) qty++;
        mainQtyInput.value = qty;
        setCartQty(qty);
        updateCartBadge();
        updatePrices(qty);
    });
}
if (mainDecrease) {
    mainDecrease.addEventListener('click', () => {
        let qty = parseInt(mainQtyInput.value) || 1;
        if (qty > 1) qty--;
        mainQtyInput.value = qty;
        setCartQty(qty);
        updateCartBadge();
        updatePrices(qty);
    });
}

// On page load, update badge and prices
document.addEventListener('DOMContentLoaded', () => {
    const qty = getCartQty();
    updateCartBadge();
    if (cartDialogQtyInput) {
        cartDialogQtyInput.value = qty;
        cartDialogQtyInput.setAttribute('title', 'Cart quantity (1-10)');
    }
    if (mainQtyInput) mainQtyInput.value = qty;
    updatePrices(qty);
});
