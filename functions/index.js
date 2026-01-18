const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors")({ origin: true });

setGlobalOptions({ maxInstances: 1 });

exports.hello = onRequest((req, res) => {
  logger.info("Hello endpoint called");

  res.status(200).json({
    ok: true,
    message: "Hello from Firebase Functions 🚀",
    method: req.method,
    time: new Date().toISOString(),
  });
});

/**
 * Helper: create Razorpay instance using injected secrets
 * (Secrets are only available at runtime in the deployed environment)
 */
function getRazorpay() {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    // Do NOT log secrets. Just log missing info.
    throw new Error("Missing Razorpay secrets. Ensure Gen2 secrets are set and attached.");
  }

  return {
    client: new Razorpay({ key_id, key_secret }),
    key_secret,
    key_id,
  };
}

/**
 * ✅ 1) Create Order
 * Request body: { amount: number (paise), currency?: "INR", receipt?: string }
 * Returns Razorpay order object (id, amount, currency, etc.)
 */
exports.createOrder = onRequest(
  {
    // IMPORTANT: attach secrets to this function
    secrets: ["RAZORPAY_KEY_ID", "RAZORPAY_KEY_SECRET"],
    // Optional hardening:
    // region: "asia-south1",
    // timeoutSeconds: 30,
    // memory: "256MiB",
  },
  (req, res) => {
    cors(req, res, async () => {
      try {
        if (req.method !== "POST") {
          return res.status(405).json({ message: "Method Not Allowed" });
        }

        const { amount, currency = "INR", receipt } = req.body || {};

        // amount must be integer paise
        const amountNum = Number(amount);
        if (!Number.isFinite(amountNum) || amountNum <= 0) {
          return res.status(400).json({ message: "Invalid amount (must be paise > 0)" });
        }

        const { client } = getRazorpay();

        const order = await client.orders.create({
          amount: Math.round(amountNum),
          currency,
          receipt: receipt || `rcpt_${Date.now()}`,
        });

        return res.status(200).json(order);
      } catch (err) {
        logger.error("createOrder error", err);
        return res.status(500).json({ message: "Failed to create order" });
      }
    });
  }
);

/**
 * ✅ 2) Verify Payment (signature check)
 * Request body from Razorpay handler:
 * { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 *
 * Returns: { success: boolean }
 */
exports.verifyPayment = onRequest(
  {
    secrets: ["RAZORPAY_KEY_ID", "RAZORPAY_KEY_SECRET"],
    // region: "asia-south1",
  },
  (req, res) => {
    cors(req, res, () => {
      try {
        if (req.method !== "POST") {
          return res.status(405).json({ message: "Method Not Allowed" });
        }

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
          return res.status(400).json({ success: false, message: "Missing payment fields" });
        }

        const { key_secret } = getRazorpay();

        const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expected = crypto
          .createHmac("sha256", key_secret)
          .update(payload)
          .digest("hex");

        const success = expected === razorpay_signature;

        return res.status(200).json({ success });
      } catch (err) {
        logger.error("verifyPayment error", err);
        return res.status(500).json({ success: false });
      }
    });
  }
);


