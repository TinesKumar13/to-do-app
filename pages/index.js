import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { constants, ethers } from "ethers";
import * as Constants from "../Utils/config";
import Link from "next/link";
import Modal from "@/components/Modal";
import ModalUpdate from "@/components/ModalUpdate";
import { useRouter } from "next/router";

function App() {
  const router = useRouter();
  const searchParams = router.query;
  const show = searchParams ? searchParams.show : null;
  const showUpdate = searchParams ? searchParams.showUpdate : null;
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState();
  const [updatingDescription, setUpdatingDescription] = useState("");

  useEffect(() => {
    const connectToMetamask = async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          console.log(await signer.getAddress());
          const contractInstance = new ethers.Contract(
            Constants.contractAddress,
            Constants.contractAbi,
            signer
          );
          var tasks = await contractInstance.getAllTasks();
          setTasks(tasks);
          console.log(tasks);
        } else {
          console.log("Metamask needed to be installed!");
        }
      } catch (error) {
        console.error(error);
      }
    };
    connectToMetamask();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/addTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(error);
    }

    const resp = await response.json();
    const status = resp.message;
    console.log(status);
    setTask("");
  };

  const handleChange = async (event) => {
    setTask(event.target.value);
  };

  const changeTaskStatus = async (taskId) => {
    const response = await fetch("api/changeStatus", {
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
    console.log(status);
  };

  const handleDeletePopUp = (taskId) => {
    router.push("/?show=true");
    setTaskId(taskId);
  };

  const handleUpdatePopUp = (taskId, updatingDescription) => {
    router.push("/?showUpdate=true");
    setTaskId(taskId);
    setUpdatingDescription(updatingDescription);
  };

  return (
    <div>
      <div className={styles.container}>
        Welcome to the Decentralized ToDo App
      </div>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="task"
            placeholder="Add task here..."
            onChange={handleChange}
            value={task}
          />
          <input type="submit" value="Add Task" />
        </form>
      </div>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Task Description</th>
              <th>Task Status</th>
              <th>Mark as Finised</th>
              <th>Update Task Description</th>
              <th>Delete Task</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{task.desc}</td>
                <td>{task.status === 0 ? "Pending" : "Finished"}</td>
                <td>
                  {task.status === 0 ? (
                    <button
                      className={styles.button}
                      style={{ backgroundColor: "#33b249", color: "#FFFFFF" }}
                      onClick={() => changeTaskStatus(index)}
                    >
                      Mark as complete
                    </button>
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  <button
                    className={styles.button}
                    style={{ backgroundColor: "#4681f4", color: "#FFFFFF" }}
                    onClick={() => handleUpdatePopUp(index, task.desc)}
                  >
                    Update Task Description
                  </button>
                </td>
                <td>
                  <button
                    className={styles.button}
                    style={{ backgroundColor: "#ED0800", color: "#FFFFFF" }}
                    onClick={() => handleDeletePopUp(index)}
                  >
                    Delete Task
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {show && <Modal index={taskId} />}
        {showUpdate && (
          <ModalUpdate
            index={taskId}
            existingDescription={updatingDescription}
          />
        )}
      </div>
    </div>
  );
}

export default App;
