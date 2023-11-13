function search() {
  const input = document.getElementById('search-input');
  const filter = input.value.toUpperCase();
  const results = document.getElementById('search-results');
  const items = results.getElementsByTagName('li');

  for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const text = item.textContent || item.innerText;
      if (text.toUpperCase().indexOf(filter) > -1) {
          item.classList.add('show');
      } else {
          item.classList.remove('show');
      }
  }
}
var slideIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1}
  x[slideIndex-1].style.display = "block";
  setTimeout(carousel, 2000); 
}
///cart adding incre and decre to cart 
let itemCount = 1;

function increment() {
  itemCount++;
  document.getElementById('item-count').value = itemCount;
}

function decrement() {
  if (itemCount > 1) {
    itemCount--;
    document.getElementById('item-count').value = itemCount;
  }
}




const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const item = document.querySelector('#item').value;
  const quantity = document.querySelector('#quantity').value;
  addToCart(item, quantity);
});

function addToCart(item, quantity) {
  // Add the item to the cart
  // You can use an array or an object to store the cart items
}



let cart = [];

  // Add items to cart
  function addToCart(item, quantity) {
    // Create a new cart item object
    const newItem = { item: item, quantity: quantity };

    // Add the new item to the cart
    cart.push(newItem);

    // Update the cart display
    updateCartDisplay();
  }

  // Update the cart display
  function updateCartDisplay() {
    const cartItemsElement = document.querySelector('#cart-items');
    cartItemsElement.innerHTML = '';

    // Loop through the cart items and display them
    cart.forEach(item => {
      const itemElement = document.createElement('li');
      itemElement.textContent = `${item.quantity} x ${item.item}`;
      cartItemsElement.appendChild(itemElement);
    });
  }