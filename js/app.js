
/// Add to Cart
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ name, price, image });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart!`);
  updateCartCount();
}


function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const countDesktop = document.getElementById('cart-count');
  const countMobile = document.getElementById('cart-count-mobile');

  if (countDesktop) countDesktop.textContent = cart.length;
  if (countMobile) countMobile.textContent = cart.length;
}


function loadCartItems() {
  const container = document.getElementById('cartItems');
  if (container) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    container.innerHTML = '';

    cart.forEach((item, index) => {
      let div = document.createElement('div');
      div.className = 'flex items-center justify-between border p-3 bg-white rounded';
      div.innerHTML = `
        <div class="flex items-center">
          <img src="${item.image}" class="w-16 h-16 object-cover rounded mr-3">
          <span class="text-lg">${item.name} (₹${item.price})</span>
        </div>
        <button onclick="removeItem(${index})" class="text-red-600 text-xl">❌</button>
      `;
      container.appendChild(div);
      total += item.price;
    });

    document.getElementById('cartTotal').textContent = `Total: ₹${total}`;
  }
}

// Remove Item from Cart
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  loadCartItems();
}

// Handle Order Form Submission
function handleOrderForm() {
  const form = document.getElementById('orderForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const mobile = document.getElementById('mobile').value;
      const address = document.getElementById('address').value;
      const city = document.getElementById('city').value;

      if (!name || !mobile || !address || !city) {
        alert('Please fill all fields.');
        return;
      }

      localStorage.setItem('customerDetails', JSON.stringify({ name, mobile, address, city }));
      window.location.href = 'order-summary.html';
    });
  }
}

// // Load Order Summary Page
// function loadOrderSummary() {
//   const summary = document.getElementById('orderSummary');
//   if (summary) {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     let customer = JSON.parse(localStorage.getItem('customerDetails')) || {};
//     let total = 0;
//     summary.innerHTML = '';

//     cart.forEach(item => {
//       let p = document.createElement('p');
//       p.textContent = `${item.name} - ₹${item.price}`;
//       summary.appendChild(p);
//       total += item.price;
//     });

//     document.getElementById('totalAmount').textContent = `Total: ₹${total}`;
//     document.getElementById('customerDetails').innerHTML = `
//       <p><strong>Name:</strong> ${customer.name}</p>
//       <p><strong>Mobile:</strong> ${customer.mobile}</p>
//       <p><strong>Address:</strong> ${customer.address}</p>
//       <p><strong>City:</strong> ${customer.city}</p>
//     `;


function loadOrderSummary() {
  const summary = document.getElementById('orderSummary');
  const customer = JSON.parse(localStorage.getItem('customerDetails')) || {};
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (!summary || !customer || cart.length === 0) return;

  // 1️⃣ Display Customer Info
  const customerDiv = document.getElementById('customerDetails');
  if (customerDiv) {
    customerDiv.innerHTML = `
      <p><strong>Name:</strong> ${customer.name}</p>
      <p><strong>Mobile:</strong> ${customer.mobile}</p>
      <p><strong>Address:</strong> ${customer.address}</p>
      <p><strong>City:</strong> ${customer.city}</p>
    `;
  }

  // 2️⃣ Display Cart Items
  let subtotal = 0;
  summary.innerHTML = '';
  cart.forEach(item => {
    subtotal += item.price;
    summary.innerHTML += `
      <div class="flex items-center gap-4 border p-3 rounded shadow-sm">
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded object-cover">
        <div>
          <h4 class="font-semibold text-lg">${item.name}</h4>
          <p class="text-gray-600">₹${item.price}</p>
        </div>
      </div>
    `;
  });

  // 3️⃣ Calculate & Display Price Breakdown
  const deliveryCharge = 40;
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const discount = 20;
  const grandTotal = subtotal + deliveryCharge + tax - discount;

  document.getElementById('subtotalAmount').textContent = subtotal;
  document.getElementById('deliveryCharge').textContent = deliveryCharge;
  document.getElementById('taxAmount').textContent = tax;
  document.getElementById('discountAmount').textContent = discount;
  document.getElementById('totalAmount').textContent = grandTotal;

  // 🧹 Clear cart and customer after display
  localStorage.removeItem('cart');
  localStorage.removeItem('customerDetails');
  updateCartCount();
}






  

 


















// Signup
function signupUser() {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  if (!name || !email || !password) {
    alert("Please fill all fields.");
    return;
  }

  localStorage.setItem("pizzaUser", JSON.stringify({ name, email, password }));
  alert("Signup successful! Please login now.");
  window.location.href = "login.html";
}

// Login
function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const savedUser = JSON.parse(localStorage.getItem("pizzaUser"));

  if (savedUser && email === savedUser.email && password === savedUser.password) {
    localStorage.setItem("loggedInUser", JSON.stringify(savedUser));
    alert("Login successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid email or password.");
  }
}





function checkLoginStatus() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const headerArea = document.getElementById("userAreaHeader");
  const mobileArea = document.getElementById("userAreaMobile");
  const profileIcon = document.getElementById("userProfileIcon");
  const profileIconMobile = document.getElementById("userProfileIconMobile");

  let html = '';

  if (user) {
    // html = `<span class="mr-3">Hi, ${user.name}</span> <a href="#" onclick="logoutUser()" class="underline">Logout</a>`;
    
    // Show profile icons
    if (profileIcon) profileIcon.classList.remove("hidden");
    if (profileIconMobile) profileIconMobile.classList.remove("hidden");
    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");
    if (profileName) profileName.textContent = user.name;
    if (profileEmail) profileEmail.textContent = user.email;


    // 🧭 Load address when logged in
    getLocationAndAddress();
  } else {
    html = `
      <a href="login.html" class="underline mr-3">Login</a>
      <a href="signup.html" class="underline">Sign Up</a>
    `;
    
    // Hide profile icons
    if (profileIcon) profileIcon.classList.add("hidden");
    if (profileIconMobile) profileIconMobile.classList.add("hidden");
  }

  if (headerArea) headerArea.innerHTML = html;
  if (mobileArea) mobileArea.innerHTML = html;
}



// Logout
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  window.location.reload();
}

// Protect Restricted Pages
function protectPage() {
  if (!localStorage.getItem("loggedInUser")) {
    alert("Please login first.");
    window.location.href = "login.html";
  }
}

// Page Initialization
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  loadCartItems();
  handleOrderForm();
  loadOrderSummary();
  checkLoginStatus();
   loadProfilePicture();
  

  // Protect restricted pages
  const restrictedPages = ['cart.html', 'order-summary.html'];
  const currentPage = window.location.pathname.split("/").pop();
  if (restrictedPages.includes(currentPage)) {
    protectPage();
  }

  // 🍕 Mobile Menu Toggle
  const toggle = document.getElementById("menuToggle");
  const mobile = document.getElementById("mobileMenu");
  const closeBtn = document.getElementById("menuClose");

  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      mobile.classList.remove("hidden");
    });
  }

  if (closeBtn && mobile) {
    closeBtn.addEventListener("click", () => {
      mobile.classList.add("hidden");
    });
  }
});

// side panel
function openSidePanel() {
  document.getElementById('sidePanel').classList.remove('-translate-x-full');
  document.getElementById('overlay').classList.remove('hidden');
   loadStoredLocation(); // Load location when panel opens

  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user) {
    document.getElementById('profileName').textContent = user.name;
    document.getElementById('profileEmail').textContent = user.email;
  }
}

function closeSidePanel() {
  document.getElementById('sidePanel').classList.add('-translate-x-full');
  document.getElementById('overlay').classList.add('hidden');
}














function getLocationAndAddress() {
  const saved = localStorage.getItem("userAddress");
  if (saved) {
    document.getElementById("userAddress").textContent = saved;
    return;
  }

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await response.json();
          const address = data.display_name || "Location not found";
          document.getElementById("userAddress").textContent = address;
          localStorage.setItem("userAddress", address);
        } catch (err) {
          document.getElementById("userAddress").textContent = "Unable to detect location.";
        }
      },
      () => {
        document.getElementById("userAddress").textContent = "Permission denied.";
      }
    );
  } else {
    document.getElementById("userAddress").textContent = "Geolocation not supported.";
  }
}

// Toggle manual input
document.getElementById("setManualBtn").addEventListener("click", () => {
  document.getElementById("manualInput").classList.remove("hidden");
});

// Save manually entered address
function saveManualAddress() {
  const manualAddress = document.getElementById("manualAddress").value.trim();
  if (manualAddress) {
    localStorage.setItem("userAddress", manualAddress);
    document.getElementById("userAddress").textContent = manualAddress;
    document.getElementById("manualInput").classList.add("hidden");
  } else {
    alert("Please enter a valid address.");
  }
}


// Load profile picture from localStorage
function loadProfilePicture() {
  const profilePic = document.getElementById('profilePic');
  const savedPic = localStorage.getItem('profilePic');
  if (savedPic && profilePic) {
    profilePic.src = savedPic;
  }
}

// Handle image upload
const picInput = document.getElementById('picInput');
if (picInput) {
  picInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageDataUrl = e.target.result;
        localStorage.setItem('profilePic', imageDataUrl);
        document.getElementById('profilePic').src = imageDataUrl;
      };
      reader.readAsDataURL(file);
    }
  });
}









