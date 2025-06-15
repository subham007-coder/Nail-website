export default function ShopMegaMenu() {
  return (
    <div className="absolute left-0 right-0 top-full bg-white shadow-lg z-50">
      <div className="max-w-[1400px] mx-auto py-8 px-6">
        <div className="grid grid-cols-4 gap-2">
          {/* Column 1 */}
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-semibold mb-4">Shop All</h3>
              <h4 className="text-sm font-medium mb-3">Shop By Category</h4>
              <ul className="space-y-2">
                <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Best Sellers</li>
                <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">French nails</li>
                <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Casual Wear Nails</li>
                <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Toe Nails</li>
                <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Ombre Nails</li>
              </ul>
              <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">Shop By Texture</h4>
              <ul className="space-y-2">
                <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Matte Nails</li>
                <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Glossy Nails</li>
                <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Glitter Nails</li>
              </ul>
            </div>
            </div>
            
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-sm font-medium mb-3">Shop By Shape</h4>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Coffin Nails</li>
              <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Stiletto Nails</li>
              <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Square Nails</li>
              <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Round Nails</li>
              <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Almond Nails</li>
              <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Ballerina Nails</li>
            </ul>

            <h4 className="text-sm font-medium mb-3 mt-6">Shop By Color</h4>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Pink</li>
              <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Red</li>
              <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Pastel</li>
              <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Gold</li>
              <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Nude</li>
              <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Others</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-sm font-medium mb-3">Shop By Occasion</h4>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Casual Nails</li>
              <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Party Nails</li>
              <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Wedding Nails</li>
              <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Formal Nails</li>
              <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Holiday Nails</li>
            </ul>

            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">Shop By Length</h4>
              <ul className="space-y-2">
                <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Short Nails</li>
                <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Medium Nails</li>
                <li className="text-gray-600 text-sm hover:text-pink-600 cursor-pointer">Long Nails</li>
              </ul>
            </div>
          </div>

          {/* Column 4 - Featured Products */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <img
                src="https://nailknack.com/cdn/shop/files/Untitleddesign_2_e9e4b99a-57bf-447a-ae45-45ff5c2116aa.webp?v=1699184373&width=360"
                alt="Nude Plain Glossy Fake Nails Set"
                className="rounded-lg w-full aspect-[3/4] object-cover"
              />
              <p className="mt-2 text-sm">Nude Plain Glossy Fake Nails Set</p>
              <p className="text-pink-600 text-sm">
                ₹ 300.00 <span className="line-through text-gray-400 ml-1">₹ 699.00</span>
              </p>
            </div>
            <div>
              <img
                src="https://nailknack.com/cdn/shop/files/Untitleddesign_2_210a0583-5512-4813-a67d-f8f0ed094bfd.webp?v=1699191216&width=360"
                alt="Plain Chocolate Candy Presson Nails"
                className="rounded-lg w-full aspect-[3/4] object-cover"
              />
              <p className="mt-2 text-sm">Plain Chocolate Candy Presson Nails</p>
              <p className="text-pink-600 text-sm">
                ₹ 300.00 <span className="line-through text-gray-400 ml-1">₹ 699.00</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
