export default function AddToCartButton({
  hasSizesOrExtras,
  onClick,
  basePrice,
}) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="mt-4 bg-primary text-white rounded-full px-8 py-2"
      >
        {hasSizesOrExtras > 0 ? (
          <span>Add to Cart (from ${basePrice}) </span>
        ) : (
          <span>Add to Cart ${basePrice}</span>
        )}
      </button>
    </>
  );
}
