import { ArrowDown, ArrowUp, HeartIcon, ShoppingBasket } from "lucide-react";
import { useGetCryptosQuery } from "../cryptoApi";
import { Crypto } from "../types/Crypto";
import { useAddFavouriteMutation } from "@/features/favourites/favouritesApi";
import { Button } from "@/components/ui/button";
import { useAddItemMutation } from "@/features/cart/cartApi";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface FavouriteProps {
  id: string;
  name: string;
}

interface CartItemProps {
  id: string | number;
  quote: {
    USD: {
      price: number;
    };
  };
}

export function MarketOverview() {
  const { data } = useGetCryptosQuery(null);
  const [addFavourite] = useAddFavouriteMutation();
  const [addToCart] = useAddItemMutation();
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = async (data: CartItemProps) => {
    const item = {
      product_id: data.id,
      quantity,
      price: data.quote.USD.price,
    };

    addToCart(item);
  };

  const handleAddToFavourite = async (data: FavouriteProps) => {
    const newFav = {
      api_id: data.id,
      name: data.name,
    };
    addFavourite(newFav);
  };

  return (
    <div className="max-h-[500px] overflow-y-scroll">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Markets Overview
      </h2>
      <div className="overflow-x-auto h-[calc(100%-2rem)]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="pb-2 text-left text-sm font-medium text-gray-500">
                Name
              </th>
              <th className="pb-2 text-right text-sm font-medium text-gray-500">
                Price
              </th>
              <th className="pb-2 text-right text-sm font-medium text-gray-500">
                24h Change
              </th>
              <th className="pb-2 text-right text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.crypto?.map((x: Crypto) => (
              <tr key={x.symbol} className="border-b border-gray-100 ">
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium">
                      {x.symbol.substring(0, 1)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{x.name}</div>
                      <div className="text-sm text-gray-500">{x.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-right font-medium text-gray-900">
                  ${x.quote.USD.price.toFixed(2)}
                </td>
                <td className="py-3 text-right">
                  <div
                    className={`flex items-center justify-end gap-1 ${
                      x?.quote?.USD?.percent_change_24h > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {x?.quote?.USD?.percent_change_24h > 0 ? (
                      <ArrowUp className="h-3 w-3" />
                    ) : (
                      <ArrowDown className="h-3 w-3" />
                    )}
                    <span>${x?.quote?.USD?.volume_change_24h.toFixed(2)}</span>
                  </div>
                </td>

                <td className=" py-3 text-right">
                  <Input type="number" value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))} />

                  <Button value="ghost" onClick={() => handleAddToFavourite(x)}>
                    <HeartIcon />
                  </Button>
                  <Button
                    className="ml-2"
                    value="ghost"
                    onClick={() => handleAddToCart(x)}
                  >
                    <ShoppingBasket />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
