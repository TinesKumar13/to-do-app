//Client-side modal
"use client";
import { useRouter } from "next/router";

function Modal({ index }) {
  const router = useRouter();
  const deleteTask = async (taskId) => {
    const response = await fetch("api/deleteTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskId),
    });
    if (!response.ok) {
      const error = await response.json();
      console.log(error);
    }

    const resp = await response.json();
    const status = resp.message;
    router.push("/");
    console.log(status);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900">
            Are you sure you want to delete the task ?
          </h3>
          <div className="flex justify-center mt-4 space-x-4">
            {/* Using useRouter to dismiss modal*/}
            <button
              onClick={() => deleteTask(index)}
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Yes
            </button>
            <button
              onClick={router.back}
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              style={{ backgroundColor: "#ED0800", color: "#FFFFFF" }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
