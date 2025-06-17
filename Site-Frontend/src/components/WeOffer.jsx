import React from "react";
import { FiTruck, FiCreditCard, FiTag } from "react-icons/fi";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const offers = [
  {
    id: 1,
    title: "FREE SHIPPING",
    description: "On All Orders",
    icon: <FiTruck className="w-8 h-8" />,
    image:
      "https://nailknack.com/cdn/shop/files/Free_Shipping.webp?v=1718628887&width=165",
  },
  {
    id: 2,
    title: "COD AVAILABLE",
    description: "Cash on Delivery",
    icon: <FiCreditCard className="w-8 h-8" />,
    image:
      "https://nailknack.com/cdn/shop/files/COD_Available.webp?v=1718629373&width=165",
  },
  {
    id: 3,
    title: "FLASH SALE @ RS. 300",
    description: "Limited Time Offer",
    icon: <FiTag className="w-8 h-8" />,
    image:
      "https://nailknack.com/cdn/shop/files/Flash_Sale_Rs_500_Only.webp?v=1718629489&width=165",
  },
];

function Weoffer() {
  useScrollAnimation();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {offers.map((offer) => (
          <div
            key={offer.id}
            data-card
            className="flex flex-col items-center text-center bg-[#F5E6DA] p-6 rounded-lg shadow-lg transition-transform hover:scale-105"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 bg-gray-100">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-2 text-gray-800">
              <h3 className="font-bold text-lg mb-1">{offer.title}</h3>
              <p className="text-gray-600 text-sm">{offer.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Weoffer;
