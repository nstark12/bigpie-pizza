import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({ link, setLink }) {
  async function handleFileChange(e) {
    const files = e.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            setLink(link);
          });
        }
        throw new Error("Error");
      });
      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload complete!",
        error: "Upload error",
      });
    }
  }

  return (
    <>
      {link && (
        <Image
          className="rounded-full w-full h-full"
          src={link}
          alt={"avatar"}
          width={250}
          height={250}
        />
      )}
      {!link && (
        <div className=" text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="border border-gray-300 block rounded-lg px-2 py-1 mt-2 cursor-poitner text-center">
          Edit Image
        </span>
      </label>
    </>
  );
}
