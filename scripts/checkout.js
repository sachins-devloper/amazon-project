import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import "../data/cart-class.js";
// import "../data/backend-practice.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";

Promise.all([
  new Promise((resolve, reject) => {
    loadProducts(() => {
      resolve('value from LoadProduct');
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve('value from LoadCart');
    });
  }),
]).then((values) => {
  console.log(values)
  renderOrderSummary();
  renderPaymentSummary();
});

/*
new Promise((resolve, reject) => {
  loadProducts(() => {
    resolve();
  });
})
  .then(() => {
    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });

// loadProducts(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
// });

*/
