//Client-side modal
"use client";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Home.module.css";

function ModalUpdate({ index, existingDescription }) {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const updateTask = async (taskId, description) => {
    const descriptionData = {
      taskId: taskId,
      description: description,
    };

    const response = await fetch("api/updateTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(descriptionData),
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

  const handleChange = async (event) => {
    setDescription(event.target.value);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900">
            Update Description
          </h3>
          <form className={styles.form}>
            <input
              type="text"
              name="task"
              placeholder={existingDescription}
              onChange={handleChange}
              value={description}
            />
          </form>
          <div className="flex justify-center mt-4 space-x-4">
            {/* Using useRouter to dismiss modal*/}
            <button
              onClick={() => updateTask(index, description)}
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Update
            </button>
            <button
              onClick={router.back}
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              style={{ backgroundColor: "#ED0800", color: "#FFFFFF" }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalUpdate;
