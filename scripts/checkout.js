import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import "../data/cart-class.js";
// import "../data/backend-practice.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

async function loadPage() {

  try {
    await new Promise((resolve) => {
      loadProducts(() => {
        resolve();
      });
    });
    await new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  } catch (error) {
    console.log(error); 
  }
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();

/*
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
]).then((value) => {
  console.log(value)
  renderOrderSummary();
  renderPaymentSummary();
});
*/

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
