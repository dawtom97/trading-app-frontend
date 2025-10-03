"use client";

import { usePaymentMutation } from "@/features/stripeApi/stripeApi";
import React from "react";
import {loadStripe} from "@stripe/stripe-js"

const PaymentPage = () => {
  const [payment] = usePaymentMutation();

  const handlePayment = async () => {
    const payload = {
      price: 200,
      quantity: 1,
    };

    const {data} = await payment(payload);

    const stripePromise = loadStripe("pk_test_51S2wHsJKWBj0i4mGZ0qpRDb9cWXmo8cfr1x3ZRO0VL4KYTjRHasunYqvUp6Eiw1TgctQB4vmZ0IJRrJweJfq4Iaa00KOyyclfB")

    const stripe = await stripePromise
    await stripe?.redirectToCheckout({sessionId: String(data?.data?.id)})
  };

  return <div>
    <h2>Zapłać teraz</h2>
    <button onClick={handlePayment}>Zapłac</button>
  </div>;
};

export default PaymentPage;
