// ================================
// PRODUCTS DATA
// ================================

const products = [

{
id:1,
name:"Nike Air Max",
category:"Running",
price:5999,
image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff"
},

{
id:2,
name:"Nike Pegasus",
category:"Running",
price:7499,
image:"https://images.unsplash.com/photo-1549298916-b41d501d3772"
},

{
id:3,
name:"Nike Revolution",
category:"Running",
price:4999,
image:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
},

{
id:4,
name:"Nike Jordan",
category:"Lifestyle",
price:8999,
image:"https://images.unsplash.com/photo-1514989940723-e8e51635b782"
},

{
id:5,
name:"Nike Blazer",
category:"Lifestyle",
price:6999,
image:"https://images.unsplash.com/photo-1460353581641-37baddab0fa2"
},

{
id:6,
name:"Nike Dunk",
category:"Lifestyle",
price:7999,
image:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77"
},

{
id:7,
name:"Nike Metcon",
category:"Training",
price:8599,
image:"https://images.unsplash.com/photo-1543508282-6319a3e2621f"
},

{
id:8,
name:"Nike Free Run",
category:"Training",
price:6599,
image:"https://images.unsplash.com/photo-1608231387042-66d1773070a5"
}
];

// ================================
// LOCAL STORAGE
// ================================

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];

// ================================
// DOM ELEMENTS
// ================================

const productsGrid =
document.getElementById("productsGrid");

const cartItems =
document.getElementById("cartItems");

const wishlistItems =
document.getElementById("wishlistItems");

const cartCount =
document.getElementById("cartCount");

const wishlistCount =
document.getElementById("wishlistCount");

const subtotalEl =
document.getElementById("subtotal");

const gstEl =
document.getElementById("gst");

const grandTotalEl =
document.getElementById("grandTotal");

const search =
document.getElementById("search");

const categoryFilter =
document.getElementById("categoryFilter");

const sortPrice =
document.getElementById("sortPrice");

// ================================
// DISPLAY PRODUCTS
// ================================

function displayProducts(productArray){

productsGrid.innerHTML = "";

productArray.forEach(product=>{

productsGrid.innerHTML += `

<div class="product-card">

<img src="${product.image}">

<div class="product-info">

<h3>${product.name}</h3>

<p>${product.category}</p>

<p class="price">
₹${product.price}
</p>

<div class="card-buttons">

<button
class="add-cart"
onclick="addToCart(${product.id})">

Add Cart

</button>

<button
class="add-wishlist"
onclick="addToWishlist(${product.id})">

❤ Wishlist

</button>

</div>

</div>

</div>

`;

});

}

displayProducts(products);

// ================================
// ADD TO CART
// ================================

function addToCart(id){

const product =
products.find(item=>item.id===id);

const existing =
cart.find(item=>item.id===id);

if(existing){

existing.quantity++;

}else{

cart.push({
...product,
quantity:1
});

}

saveCart();

}

// ================================
// ADD TO WISHLIST
// ================================

function addToWishlist(id){

const product =
products.find(item=>item.id===id);

const exists =
wishlist.find(item=>item.id===id);

if(!exists){

wishlist.push(product);

}

saveWishlist();

}

// ================================
// SAVE FUNCTIONS
// ================================

function saveCart(){

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

updateCart();

}

function saveWishlist(){

localStorage.setItem(
"wishlist",
JSON.stringify(wishlist)
);

updateWishlist();

}

// ================================
// UPDATE CART
// ================================

function updateCart(){

cartItems.innerHTML="";

let subtotal=0;

cart.forEach((item,index)=>{

subtotal +=
item.price * item.quantity;

cartItems.innerHTML += `

<div class="cart-item">

<div>

<h4>${item.name}</h4>

<p>
₹${item.price}
</p>

<div class="quantity-box">

<button
class="qty-btn"
onclick="decreaseQty(${index})">

-

</button>

<span class="qty-number">

${item.quantity}

</span>

<button
class="qty-btn"
onclick="increaseQty(${index})">

+

</button>

</div>

</div>

<button
class="remove-btn"
onclick="removeCartItem(${index})">

Remove

</button>

</div>

`;

});

const gst =
Math.round(subtotal * 0.18);

const shipping =
subtotal > 0 ? 199 : 0;

const grandTotal =
subtotal + gst + shipping;

subtotalEl.textContent =
subtotal;

gstEl.textContent =
gst;

grandTotalEl.textContent =
grandTotal;

cartCount.textContent =
cart.length;

}

// ================================
// UPDATE WISHLIST
// ================================

function updateWishlist(){

wishlistItems.innerHTML="";

wishlist.forEach((item,index)=>{

wishlistItems.innerHTML += `

<div class="wishlist-item">

<div>

<h4>${item.name}</h4>

<p>
₹${item.price}
</p>

</div>

<div>

<button
class="add-cart"
onclick="wishlistToCart(${index})">

Add Cart

</button>

<button
class="remove-btn"
onclick="removeWishlist(${index})">

X

</button>

</div>

</div>

`;

});

wishlistCount.textContent =
wishlist.length;

}

// ================================
// QUANTITY FUNCTIONS
// ================================

function increaseQty(index){

cart[index].quantity++;

saveCart();

}

function decreaseQty(index){

if(cart[index].quantity > 1){

cart[index].quantity--;

}else{

cart.splice(index,1);

}

saveCart();

}

// ================================
// REMOVE CART ITEM
// ================================

function removeCartItem(index){

cart.splice(index,1);

saveCart();

}

// ================================
// REMOVE WISHLIST
// ================================

function removeWishlist(index){

wishlist.splice(index,1);

saveWishlist();

}

// ================================
// WISHLIST TO CART
// ================================

function wishlistToCart(index){

const item =
wishlist[index];

addToCart(item.id);

wishlist.splice(index,1);

saveWishlist();

}

// ================================
// SIDEBARS
// ================================

const cartBtn =
document.getElementById("cartBtn");

const wishlistBtn =
document.getElementById("wishlistBtn");

const cartSidebar =
document.getElementById("cartSidebar");

const wishlistSidebar =
document.getElementById("wishlistSidebar");

cartBtn.addEventListener("click",()=>{

cartSidebar.classList.toggle("active");

wishlistSidebar.classList.remove("active");

});

wishlistBtn.addEventListener("click",()=>{

wishlistSidebar.classList.toggle("active");

cartSidebar.classList.remove("active");

});

// ================================
// SEARCH FILTER
// ================================

function filterProducts(){

let filtered =
[...products];

const searchValue =
search.value.toLowerCase();

const category =
categoryFilter.value;

const sort =
sortPrice.value;

filtered =
filtered.filter(item=>

item.name
.toLowerCase()
.includes(searchValue)

);

if(category !== "all"){

filtered =
filtered.filter(item=>

item.category===category

);

}

if(sort==="low"){

filtered.sort(
(a,b)=>a.price-b.price
);

}

if(sort==="high"){

filtered.sort(
(a,b)=>b.price-a.price
);

}

displayProducts(filtered);

}

search.addEventListener(
"keyup",
filterProducts
);

categoryFilter.addEventListener(
"change",
filterProducts
);

sortPrice.addEventListener(
"change",
filterProducts
);

// ================================
// COUPON
// ================================

const applyCoupon =
document.getElementById("applyCoupon");

let discount = 0;

applyCoupon.addEventListener(
"click",
()=>{

const coupon =
document
.getElementById("coupon")
.value
.toUpperCase();

if(coupon==="NIKE10"){

discount = 10;

alert(
"Coupon Applied Successfully"
);

}else{

alert(
"Invalid Coupon"
);

}

}
);

// ================================
// CHECKOUT
// ================================

const checkoutForm =
document.getElementById("checkoutForm");

const successPopup =
document.getElementById("successPopup");

checkoutForm.addEventListener(
"submit",
function(e){

e.preventDefault();

if(cart.length===0){

alert(
"Your Cart Is Empty"
);

return;

}

successPopup.style.display =
"flex";

cart=[];

localStorage.removeItem(
"cart"
);

updateCart();

checkoutForm.reset();

}
);

// ================================
// CLOSE POPUP
// ================================

document
.getElementById("closePopup")
.addEventListener(
"click",
()=>{

successPopup.style.display =
"none";

}
);

// ================================
// INITIAL LOAD
// ================================

updateCart();
updateWishlist();