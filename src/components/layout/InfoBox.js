export default function InfoBox({ children }) {
  return (
    <div className="text-center bg-blue-100 px-4 py-2 rounded-md my-2 border border-blue-300">
      {children}
    </div>
  );
}
