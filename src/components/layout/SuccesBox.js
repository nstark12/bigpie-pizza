export default function SuccessBox({ children }) {
  return (
    <div className="text-center bg-green-100 px-4 py-2 rounded-md my-2 border border-green-300">
      {children}
    </div>
  );
}
