export default async function handler(req, res) {

  const { orderId, contact } = req.body;

  const SHOP = "yourstore.myshopify.com";
  const TOKEN = "your_access_token";

  try {
    const response = await fetch(
      `https://${SHOP}/admin/api/2023-10/orders.json?name=${orderId}`,
      {
        headers: {
          "X-Shopify-Access-Token": TOKEN
        }
      }
    );

    const data = await response.json();

    if (!data.orders || data.orders.length === 0) {
      return res.json({ success: false, message: "Order not found" });
    }

    const order = data.orders[0];

    if (order.email === contact || order.phone === contact) {
      return res.json({ success: true });
    }

    return res.json({ success: false, message: "Details not match" });

  } catch (error) {
    return res.json({ success: false, message: "Server error" });
  }
}