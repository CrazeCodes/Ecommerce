const paypal = require("../../helpers/paypal");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    // Validate required fields
    if (!userId || !cartItems || !totalAmount || totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields or invalid amount",
      });
    }

    // Convert INR to USD (approximate rate: 1 USD = 83 INR)
    // You can update this rate or fetch it from an API for real-time rates
    const USD_TO_INR_RATE = 83;
    const convertToUSD = (inrAmount) => {
      if (!inrAmount || inrAmount <= 0) return "0.00";
      return (inrAmount / USD_TO_INR_RATE).toFixed(2);
    };

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: convertToUSD(item.price),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: convertToUSD(totalAmount),
          },
          description: "description",
        },
      ],
    };

    console.log("Creating PayPal payment with data:", {
      totalAmount: totalAmount,
      convertedAmount: convertToUSD(totalAmount),
      itemsCount: cartItems.length
    });

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log("PayPal payment creation error:", error);

        return res.status(500).json({
          success: false,
          message: "Error while creating paypal payment",
        });
      } else {
        const newlyCreatedOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });

        await newlyCreatedOrder.save();

        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        )?.href;

        if (!approvalURL) {
          console.log("No approval URL found in PayPal response:", paymentInfo);
          return res.status(500).json({
            success: false,
            message: "PayPal approval URL not found",
          });
        }

        console.log("PayPal payment created successfully, approval URL:", approvalURL);

        res.status(201).json({
          success: true,
          approvalURL,
          orderId: newlyCreatedOrder._id,
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order can not be found",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product ${product.title}`,
        });
      }

      product.totalStock -= item.quantity;

      await product.save();
    }

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

// Handle cancelled payments
const handleCancelledPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Update order status to cancelled
    order.paymentStatus = "cancelled";
    order.orderStatus = "cancelled";
    order.orderUpdateDate = new Date();

    await order.save();

    console.log(`Order ${orderId} marked as cancelled`);

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: order,
    });
  } catch (e) {
    console.log("Error cancelling order:", e);
    res.status(500).json({
      success: false,
      message: "Some error occurred while cancelling order",
    });
  }
};

// Test PayPal connection
const testPayPal = async (req, res) => {
  try {
    const testPayment = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "Test Item",
                sku: "test-123",
                price: "1.00",
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: "1.00",
          },
          description: "Test payment",
        },
      ],
    };

    paypal.payment.create(testPayment, (error, paymentInfo) => {
      if (error) {
        console.log("PayPal test error:", error);
        return res.status(500).json({
          success: false,
          message: "PayPal test failed",
          error: error.message,
        });
      } else {
        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        )?.href;
        
        res.status(200).json({
          success: true,
          message: "PayPal test successful",
          approvalURL,
        });
      }
    });
  } catch (e) {
    console.log("PayPal test exception:", e);
    res.status(500).json({
      success: false,
      message: "PayPal test failed",
      error: e.message,
    });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
  handleCancelledPayment,
  testPayPal,
};
