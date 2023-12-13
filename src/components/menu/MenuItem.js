import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import MenuItemTile from "@/components/menu/MenuItemTile";
import Image from "next/image";
import toast from "react-hot-toast";

export default function MenuItem(menuItem) {
  const { image, name, description, basePrice, sizes, extraIngredientPrices } =
    menuItem;
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtra, setSelectedExtras] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useContext(CartContext);

  function handleAddToCart() {
    const hasOptions = sizes.length > 0 && extraIngredientPrices.length > 0;

    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }

    addToCart(menuItem, selectedSize, selectedExtra);

    setShowPopup(false);
    toast.success("Added to cart!");
  }

  function handleExtra(e, extra) {
    const checked = e.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extra]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((ex) => ex.name !== extra.name);
      });
    }
  }

  let selectedPrice = basePrice;

  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }

  if (selectedExtra?.length > 0) {
    for (const extra of selectedExtra) {
      selectedPrice += extra.price;
    }
  }

  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80  flex items-center justify-center"
        >
          <div
            className="bg-white p-2 rounded-lg max-w-md my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: "calc(100vh - 100px)" }}
            >
              <Image
                src={image}
                alt={name}
                width={300}
                height={200}
                className="mx-auto"
              />
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">
                {description}
              </p>
              {sizes?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700 mb-1">
                    Pick Your Size
                  </h3>
                  {sizes.map((size) => (
                    <div key={size.id} className="py-2">
                      <label className="p-3 border rounded-md flex items-center gap-2 mb-1">
                        <input
                          type="radio"
                          name={size}
                          onClick={() => setSelectedSize(size)}
                          checked={selectedSize?.name === size.name}
                        />{" "}
                        {size.name} ${basePrice + size.price}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              {extraIngredientPrices?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700 mb-1">
                    Additional Ingredients
                  </h3>
                  {extraIngredientPrices.map((extra) => (
                    <div key={extra.id} className="py-2">
                      <label className="p-3 border rounded-md flex items-center gap-2 mb-1">
                        <input
                          type="checkbox"
                          name={extra.name}
                          onClick={(e) => handleExtra(e, extra)}
                        />{" "}
                        {extra.name} +$
                        {extra.price}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              <button
                className="primary sticky bottom-2"
                type="button"
                onClick={handleAddToCart}
              >
                Add to Cart ${selectedPrice}
              </button>
              <button className="mt-2" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCart} {...menuItem} />
    </>
  );
}
