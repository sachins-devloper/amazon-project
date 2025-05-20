export const cart = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1,
  },
  {
    id: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
    quantity: 2,
  },
  {
    id: "77a845b1-16ed-4eac-bdf9-5b591882113d",
    quantity: 2,
  },
];

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId == cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  // console.log(quantitySelector.value);

  const quantity = Number(quantitySelector.value);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      quantity,
    });
  }
}
