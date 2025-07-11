import { cart } from "../../data/cart.js";
import { getDeliveryoption } from "../../data/deliveryoptions.js";
import { addOrder } from "../../data/orders.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryoption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });
  // console.log(formatCurrency(productPriceCents))
  // console.log(formatCurrency(shippingPriceCents))

  const totalBeforeTaxcents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxcents * 0.1;
  const totalCents = totalBeforeTaxcents + taxCents;

  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  const renderPaymentSummaryHTML = `
         <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${cartQuantity}):</div>
          <div class="payment-summary-money">$${formatCurrency(
            productPriceCents
          )}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${formatCurrency(
            shippingPriceCents
          )}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${formatCurrency(
            totalBeforeTaxcents
          )}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${formatCurrency(
            totalCents
          )}</div>
        </div>

        <button class="place-order-button button-primary js-place-order">
          Place your order
        </button>
    `;

  document.querySelector(".js-payment-summary").innerHTML =
    renderPaymentSummaryHTML;
  
  document.querySelector('.js-place-order').addEventListener('click', async () => {
    try {
       const response = await fetch('https://supersimplebackend.dev/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cart: cart
      })
    });

    const order = await response.json();
    addOrder(order);
    } catch (error) {
      console.log('Unexpected error: Try again later');
      
    }
   
    window.location.href = 'orders.html'
    
  })
}
