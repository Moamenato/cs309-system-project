const axios = require("axios");
async function testOrderAPI() {
  // 1. Test creating a new order
  console.log("Testing Order Creation...");
  const createOrderResponse = await axios.post(
    "http://localhost:8000/relations",
    {
      category: "6765d962a6e0bad549e6e628",
      item: "675d7b77aabce948c9056bd2",
    }
  );
  console.log("Create Order Response:", createOrderResponse.data);

  // const orderId = createOrderResponse.data.order._id;
}

testOrderAPI();
