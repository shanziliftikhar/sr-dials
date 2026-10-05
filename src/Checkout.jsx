import { useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { useCart } from "./context/CartContext";

const FORMSPREE = "https://formspree.io/f/xljdqqzg";
const EMAILJS_SERVICE = "service_6la6a27";
const EMAILJS_TEMPLATE = "template_ndaqsxp";
const EMAILJS_KEY = "Jmo0xcRTi2jX0zCzA";

export default function Checkout() {
  const { cart, total, dispatch } = useCart();
  const [form, setForm] = useState({
    name: "", phone: "", email: "", address: "", city: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [orderId, setOrderId] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const id = "SR" + Date.now().toString().slice(-8);
    const itemsText = cart
      .map((i) => `${i.name} x${i.qty} = Rs.${i.price * i.qty}`)
      .join("\n");
    const itemsHtml = cart
      .map((i) => `${i.name} x${i.qty} = Rs.${(i.price * i.qty).toLocaleString()}`)
      .join("<br>");

    try {
      // 1) send the order to YOU
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          orderId: id, ...form, items: itemsText, total, payment: "Cash on Delivery",
        }),
      });
      if (!res.ok) throw new Error("order failed");

      // 2) send the confirmation email to the CUSTOMER
      //    if this fails, the order is still placed
      try {
        await emailjs.send(
          EMAILJS_SERVICE,
          EMAILJS_TEMPLATE,
          {
            to_email: form.email,
            customer_name: form.name,
            order_id: id,
            items: itemsHtml,
            total: total.toLocaleString(),
            address: form.address,
            city: form.city,
          },
          { publicKey: EMAILJS_KEY }
        );
        setEmailSent(true);
      } catch (mailErr) {
        console.error("Email failed:", mailErr);
        alert("Email error: " + (mailErr?.text || mailErr?.message || JSON.stringify(mailErr)));
      }

      setOrderId(id);
      dispatch({ type: "CLEAR" });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done")
    return (
      <div>
        <h1>Thank you! 🎉</h1>
        <p>Your order <b>{orderId}</b> has been confirmed.</p>
        {emailSent && (
          <>
            <p>A confirmation email has been sent to {form.email}.</p>
            <p>If you don't see it, please check your Spam folder.</p>
          </>
        )}
        <p>Delivery in 4-5 working days.</p>
        <br />
        <Link to="/">Continue shopping</Link>
      </div>
    );

  if (cart.length === 0) return <p>Your cart is empty.</p>;

  return (
    <form className="form" onSubmit={submit}>
      <h1>Checkout</h1>
      <input name="name" placeholder="Full name" required onChange={change} />
      <input name="phone" placeholder="Phone number" required onChange={change} />
      <input name="email" type="email" placeholder="Email (for order confirmation)" required onChange={change} />
      <textarea name="address" placeholder="Full address" required onChange={change} />
      <input name="city" placeholder="City" required onChange={change} />
      <h3>Total: Rs. {total.toLocaleString()} (Cash on Delivery)</h3>
      <button disabled={status === "sending"}>
        {status === "sending" ? "Placing order..." : "Place Order"}
      </button>
      {status === "error" && <p className="error">Something went wrong. Try again.</p>}
    </form>
  );
}
