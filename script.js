// Show all products by default
filterSelection("all");

function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c === "all") c = ""; // Show all if "all" is selected
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show"); // Remove "show" class from all
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show"); // Add "show" class to matched
    }
}

function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) === -1) {
            element.className += " " + arr2[i];
        }
    }
}

function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

// Add "active" class to the current button
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}



function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }




  console.log("JavaScript file loaded");

  // Initialize cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Add to Cart Function
  function addToCart(name, price, image) {
      console.log("Adding to cart:", name, price, image);
  
      // Check if the item already exists in the cart
      let existingItem = cart.find(item => item.name === name);
      if (existingItem) {
          existingItem.quantity += 1; // Increment quantity
      } else {
          cart.push({ name, price, image, quantity: 1 });
      }
  
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log("Cart updated:", cart);
  }
  
  // Update Cart UI (Cart Page)
  function updateCartUI() {
      const cartContentEl = document.getElementById("cart-items");
      const totalPriceEl = document.getElementById("total-price");
  
      if (cartContentEl) {
          cartContentEl.innerHTML = ""; // Clear existing content
          let total = 0;
  
          cart.forEach((item, index) => {
              cartContentEl.innerHTML += `
                  <div class="cart-item">
                      <img src="${item.image}" alt="${item.name}" class="cart-img">
                      <div>
                          <p>${item.name}</p>
                          <p>$${item.price} x ${item.quantity}</p>
                      </div>
                      <button onclick="removeItem(${index})">Remove</button>
                  </div>
              `;
              total += item.price * item.quantity;
          });
  
          if (totalPriceEl) {
              totalPriceEl.textContent = `Total: $${total.toFixed(2)}`;
          }
      }
  }
  
  // Remove Item
  function removeItem(index) {
      console.log("Removing item at index:", index);
      cart.splice(index, 1); // Remove item
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartUI(); // Refresh cart display
  }
  
  // Add Event Listeners (Product Page)
  const addToCartButtons = document.querySelectorAll(".cart-button");
  
  addToCartButtons.forEach(button => {
      button.addEventListener("click", () => {
          const productContainer = button.closest(".product-section");
          const name = productContainer.querySelector(".product-name").textContent;
          const price = parseFloat(productContainer.querySelector(".current-price").textContent.replace('$', ''));
          const image = productContainer.querySelector(".main-image img").src;
  
          addToCart(name, price, image);
      });
  });
  
  // Run only on Cart Page
  if (document.getElementById("cart-items")) {
      updateCartUI();
  }
  