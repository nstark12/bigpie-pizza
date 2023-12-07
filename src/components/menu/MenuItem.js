export default function MenuItem() {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-md hover:shadow-black/25">
      <div className="text-center">
        <img
          src="/pizza.png"
          alt="pizza"
          className="max-h-24 max-w-auto block mx-auto"
        ></img>
      </div>
      <h4 className="font-semibold text-xl my-3">Pepperoni Pizza</h4>
      <p className="text-gray-500 text-sm">
        Pizza description awefoja;oiewfj;oaiejfo;iajef;oiawjef;oiawjef
      </p>
      <button className="mt-4 bg-primary text-white rounded-full px-8 py-2">
        Add to Cart $12
      </button>
    </div>
  );
}
