const axios = require("axios");

const API_BASE_URL = "http://localhost:8000"; 

// async function testCategoryAPI() {
//   try {
//     // 1. Test creating a new category
//     console.log("Testing Category Creation...");
//     let createCategoryResponse = await axios.post(`${API_BASE_URL}/categories`, {
//       name: "Electronics",
//       description: "Devices and gadgets",
//     });
//     console.log("Create Category:", createCategoryResponse.data);

//     const categoryId = createCategoryResponse.data.category._id;

//     // 2. Test fetching all categories
//     console.log("Fetching all categories...");
//     let allCategoriesResponse = await axios.get(`${API_BASE_URL}/categories`);
//     console.log("All Categories:", allCategoriesResponse.data);

//     // 3. Test fetching a single category by ID
//     console.log("Fetching Category by ID...");
//     let categoryByIdResponse = await axios.get(`${API_BASE_URL}/categories/${categoryId}`);
//     console.log("Category by ID:", categoryByIdResponse.data);

//     // 4. Test updating a category by ID
//     console.log("Updating Category...");
//     let updateCategoryResponse = await axios.put(`${API_BASE_URL}/categories/${categoryId}`, {
//       name: "Updated Electronics",
//       description: "Updated description for Electronics",
//     });
//     console.log("Updated Category:", updateCategoryResponse.data);

//     // 5. Test trying to create a category with an existing name
//     console.log("Testing Duplicate Category Name...");
//     try {
//       let duplicateCategoryResponse = await axios.post(`${API_BASE_URL}/categories`, {
//         name: "Electronics",
//         description: "New description for Electronics",
//       });
//       console.log("Duplicate Category Creation Response:", duplicateCategoryResponse.data);
//     } catch (error) {
//       console.error("Duplicate Category Error:", error.response?.data || error.message);
//     }

//     // 6. Test deleting a category by ID
//     console.log("Deleting Category...");
//     let deleteCategoryResponse = await axios.delete(`${API_BASE_URL}/categories/${categoryId}`);
//     console.log("Delete Category:", deleteCategoryResponse.data);

//     console.log("Category API tests completed successfully!");
//   } catch (error) {
//     console.error("Error during Category API testing:", error.response?.data || error.message);
//   }
// }

// testCategoryAPI();

// async function testUserAPI() {
//   try {
//     // 1. Test creating a new user
//     console.log("Testing User Creation...");
//     let createUserResponse = await axios.post(`${API_BASE_URL}/users`, {
//       name: "John Doe",
//       email: "johndoe@example.com",
//       phone_number: "1234567890",
//       password: "securepassword",
//     });
//     console.log("Create User:", createUserResponse.data);

//     const userId = createUserResponse.data.user._id;

//     // 2. Test fetching all users
//     console.log("Fetching all users...");
//     let allUsersResponse = await axios.get(`${API_BASE_URL}/users`);
//     console.log("All Users:", allUsersResponse.data);

//     // 3. Test fetching a single user by ID
//     console.log("Fetching User by ID...");
//     let userByIdResponse = await axios.get(`${API_BASE_URL}/users/${userId}`);
//     console.log("User by ID:", userByIdResponse.data);

//     // 4. Test fetching a user by email
//     console.log("Fetching User by Email...");
//     let userByEmailResponse = await axios.get(`${API_BASE_URL}/users/email/johndoe@example.com`);
//     console.log("User by Email:", userByEmailResponse.data);

//     // 5. Test updating a user by ID
//     console.log("Updating User...");
//     let updateUserResponse = await axios.put(`${API_BASE_URL}/users/${userId}`, {
//       name: "Johnathan Doe",
//       email: "johnathan.doe@example.com",
//       phone_number: "0987654321",
//       password: "newsecurepassword",
//     });
//     console.log("Updated User:", updateUserResponse.data);

//     // 6. Test trying to create a user with an existing email
//     console.log("Testing Duplicate Email...");
//     try {
//       let duplicateUserResponse = await axios.post(`${API_BASE_URL}/users`, {
//         name: "Jane Doe",
//         email: "johnathan.doe@example.com", 
//         phone_number: "9876543210",
//         password: "securepassword",
//       });
//       console.log("Duplicate User Creation Response:", duplicateUserResponse.data);
//     } catch (error) {
//       console.error("Duplicate User Error:", error.response?.data || error.message);
//     }
//     console.log("Deleting User...");
//     let deleteUserResponse = await axios.delete(`${API_BASE_URL}/users/${userId}`);
//     console.log("Delete User:", deleteUserResponse.data);

//     console.log("User API tests completed successfully!");
//   } catch (error) {
//     console.error("Error during User API testing:", error.response?.data || error.message);
//   }
// }

// testUserAPI();

// itemid = '67580a67b1316f045ccbf1a0'
// userid = '67580a67b1316f045ccbf1b4'
// async function testFeedbackAPI() {
//     try {
//       // 1. Test Creating a New Feedback
//       console.log("Testing Feedback Creation...");
//       const createFeedbackResponse = await axios.post(`${API_BASE_URL}/feedback`, {
//         item: `${itemid}`,  
//         user: `${userid}`,  
//         rating: 4,
//         comment: "Great item, good value for the price!"
//       });
//       console.log("Create Feedback Response:", createFeedbackResponse.data);
  
//       const feedbackId = createFeedbackResponse.data.feedback._id;
  
//       // 2. Test Fetching Feedback by ID
//       console.log("Fetching Feedback by ID...");
//       const feedbackByIdResponse = await axios.get(`${API_BASE_URL}/feedback/${feedbackId}`);
//       console.log("Feedback by ID:", feedbackByIdResponse.data);
  
//       // 3. Test Fetching All Feedbacks for a Specific Item
//       console.log("Fetching All Feedbacks for Item...");
//       const feedbacksForItemResponse = await axios.get(`${API_BASE_URL}/feedback/item/${itemid}`); 
//       console.log("Feedbacks for Item:", feedbacksForItemResponse.data);
  
//       // 4. Test Updating Feedback by ID
//       console.log("Updating Feedback...");
//       const updateFeedbackResponse = await axios.put(`${API_BASE_URL}/feedback/${feedbackId}`, {
//         rating: 5,
//         comment: "Excellent product, I am very satisfied with the purchase!"
//       });
//       console.log("Updated Feedback:", updateFeedbackResponse.data);
  
//       // 5. Test Deleting Feedback by ID
//       console.log("Deleting Feedback...");
//       const deleteFeedbackResponse = await axios.delete(`${API_BASE_URL}/feedback/${feedbackId}`);
//       console.log("Delete Feedback Response:", deleteFeedbackResponse.data);
  
//       console.log("Feedback API tests completed successfully!");
//     } catch (error) {
//       console.error("Error during Feedback API testing:", error.response?.data || error.message);
//     }
//   }
  
//   testFeedbackAPI();


// Static IDs for testing
const itemId1 = "67580a67b1316f045ccbf1a0";
const itemId2 = "67580a67b1316f045ccbf1a3";
const userId = "67580a67b1316f045ccbf1b4"; 

async function testCartAPI() {
  try {
    // 1. Test Creating or Updating a Cart
    console.log("Testing Cart Creation/Update...");
    const createOrUpdateCartResponse = await axios.post(`${API_BASE_URL}/cart/`, {
      user: userId,
      items: [
        { item: itemId1, quantity: 2 },
        { item: itemId2, quantity: 1 },
      ],
    });
    console.log("Cart Created/Updated Response:", createOrUpdateCartResponse.data);

    const cartId = createOrUpdateCartResponse.data.cart._id;
    console.log(cartId)
    // 2. Test Fetching the Cart by User ID
    console.log("Fetching Cart by User ID...");
    const cartByUserIdResponse = await axios.get(`${API_BASE_URL}/cart/${userId}`);
    console.log("Cart by User ID:", cartByUserIdResponse.data);

    // 4. Test Updating the Cart (Adding More Items)
    console.log("Updating Cart with New Items...");
    const updateCartResponse = await axios.put(`${API_BASE_URL}/cart/${cartId}`, {
      items: [
        { item: itemId1, quantity: 3 },
        { item: itemId2, quantity: 2 },
      ],
    });
    console.log("Updated Cart Response:", updateCartResponse.data);

    // // 5. Test Deleting the Cart
    // console.log("Deleting Cart...");
    // const deleteCartResponse = await axios.delete(`${API_BASE_URL}/cart/${cartId}`);
    // console.log("Delete Cart Response:", deleteCartResponse.data);

    // 6. Test Checkout Process
    console.log("Testing Checkout...");
    const checkoutResponse = await axios.post(`${API_BASE_URL}/cart/checkout/${userId}`);
    console.log("Checkout Response:", checkoutResponse.data);

    console.log("Cart API tests completed successfully!");
  } catch (error) {
    console.error("Error during Cart API testing:", error.response?.data || error.message);
  }
}

testCartAPI();


// const userId = "67580a67b1316f045ccbf1b4";
// const itemId = "67580a67b1316f045ccbf1a0";

// async function testOrderAPI() {
//   try {
//     // 1. Test creating a new order
//     console.log("Testing Order Creation...");
//     const createOrderResponse = await axios.post(`${API_BASE_URL}/orders/`, {
//       user: userId,
//       items: [
//         { item: itemId, quantity: 2, price: 100 },
//       ],
//     });
//     console.log("Create Order Response:", createOrderResponse.data);

//     const orderId = createOrderResponse.data.order._id;

//     // 2. Test fetching the order by ID
//     console.log("Fetching Order by ID...");
//     const orderByIdResponse = await axios.get(`${API_BASE_URL}/orders/${orderId}`);
//     console.log("Order by ID:", orderByIdResponse.data);

//     // 3. Test fetching all orders for a user
//     console.log("Fetching Orders for User...");
//     const ordersForUserResponse = await axios.get(`${API_BASE_URL}/orders/user/${userId}`);
//     console.log("Orders for User:", ordersForUserResponse.data);

//     // 4. Test updating the order status
//     console.log("Updating Order Status...");
//     const updateOrderResponse = await axios.put(`${API_BASE_URL}/orders/${orderId}`, {
//       status: "Completed",
//     });
//     console.log("Updated Order Status:", updateOrderResponse.data);

//     // 5. Test deleting the order
//     console.log("Deleting Order...");
//     const deleteOrderResponse = await axios.delete(`${API_BASE_URL}/orders/${orderId}`);
//     console.log("Delete Order Response:", deleteOrderResponse.data);

//     console.log("Order API tests completed successfully!");
//   } catch (error) {
//     console.error("Error during Order API testing:", error.response?.data || error.message);
//   }
// }

// testOrderAPI();
