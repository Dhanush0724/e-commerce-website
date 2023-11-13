let itemCount = 1;

// Get all elements with class "increment" and "decrement"
const incrementButtons = document.querySelectorAll('.increment');
const decrementButtons = document.querySelectorAll('.decrement');

// Add event listeners to increment and decrement buttons
incrementButtons.forEach((button) => {
  button.addEventListener('click', increment);
});

decrementButtons.forEach((button) => {
  button.addEventListener('click', decrement);
});

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
