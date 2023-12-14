import { cartProductPrice } from "../AppContext";
import Trash from "../icons/Trash";
import Image from "next/image";

export default function CartProduct({ product, onRemove }) {
  return (
    <div
      key={product.id}
      className="flex gap-4 mb-2 border-b py-2 items-center"
    >
      <div className="w-24">
        <Image
          src={product.image}
          alt={product.name}
          width={240}
          height={240}
        />
      </div>
      <div className="grow">
        <h3>{product.name}</h3>
        {product.size && (
          <div className="text-sm text-gray-500 font-semibold">
            Size: <span>{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className="mt-2 text-sm">
            Add-Ons:
            {product.extras.map((extra) => (
              <div key={extra._id} className="text-gray-500">
                {extra.name} ${extra.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold">${cartProductPrice(product)}</div>
      {!!onRemove && (
        <div className="ml-2">
          <button className="p-2" type="button" onClick={() => onRemove(index)}>
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
}
