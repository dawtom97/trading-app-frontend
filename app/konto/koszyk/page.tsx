"use client";

import React from "react";
import { useGetCartQuery } from "@/features/cart/cartApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export interface CartItem {
  product_id: number;
  quantity: number;
  price: number;
}

export interface Cart {
  _id: { $oid: string };
  user_id: string;
  updated_at: { $date: string };
  total_price: number;
  items: CartItem[];
}

export interface CartResponse {
  message: string;
  status: string;
  code: number;
  isLoading: boolean;
  isError: boolean;
  data: {
    cart: Cart
  };
  
  error: null | string;
}

const UserCart = () => {
  const { data: cartData, isLoading, isError } = useGetCartQuery<CartResponse>();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Ładowanie koszyka...</span>
      </div>
    );
  }

  if (isError || !cartData?.data?.cart) {
    return (
      <div className="text-center text-red-500">
        Nie udało się pobrać koszyka.
      </div>
    );
  }

  const cart = cartData.data.cart;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>🛒 Twój koszyk</CardTitle>
        <p className="text-sm text-muted-foreground">
          Ostatnia aktualizacja:{" "}
          {new Date(cart.updated_at.$date).toLocaleString()}
        </p>
      </CardHeader>

      <CardContent>
        {cart.items.length === 0 ? (
          <div className="text-center text-muted-foreground py-10">
            Koszyk jest pusty
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID produktu</TableHead>
                  <TableHead>Ilość</TableHead>
                  <TableHead>Cena</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item: CartItem) => (
                  <TableRow key={item.product_id}>
                    <TableCell>{item.product_id}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      {(item.price * item.quantity).toLocaleString("pl-PL", {
                        style: "currency",
                        currency: "PLN",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">Suma:</p>
              <p className="text-xl font-bold text-primary">
                {cart.total_price.toLocaleString("pl-PL", {
                  style: "currency",
                  currency: "PLN",
                })}
              </p>
            </div>

            <Button className="w-full mt-4">Przejdź do płatności</Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UserCart;
