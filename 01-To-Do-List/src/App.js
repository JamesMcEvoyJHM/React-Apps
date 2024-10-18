import { useState } from "react";

const initialTasks = [
  {
    id: 1,
    name: "Study React",
    completed: false,
  },
  {
    id: 2,
    name: "Look At Cat Pictures",
    completed: true,
  },
  {
    id: 3,
    name: "Eat Good Food",
    completed: true,
  },
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [completedTasks, setCompletedTasks] = useState(2);

  const day = new Date();
  const month = day.toLocaleString("default", { month: "long" });

  function handleAddTask(newTask) {
    setTasks((tasks) => [...tasks, newTask]);
  }

  function handleDeleteTask(id) {
    setCompletedTasks(() =>
      tasks.filter((task) => task.id === id)[0]?.completed
        ? completedTasks - 1
        : completedTasks
    );
    setTasks(() => tasks.filter((task) => task.id !== id));
  }

  function handleDeleteAll() {
    setTasks(() => []);
    setCompletedTasks(0);
  }

  function handleCompletedTasks(taskId, checkState) {
    tasks[taskId - 1].completed = checkState;
    setTasks([...tasks]);
    setCompletedTasks(() => tasks.filter((task) => task.completed).length);
  }

  return (
    <div className="app">
      <div className="container">
        <div className="main-heading">
          <h1>
            {day.getDate()}th {month}'s Daily Tasks
          </h1>
          <hr />
        </div>
        <div className="grid">
          <TaskHolder
            onCompletedTasks={handleCompletedTasks}
            tasks={tasks}
            onDeleteTask={handleDeleteTask}
            onDeleteAll={handleDeleteAll}
          />
          <hr className="separator" />
          <TaskMaker
            completedTasks={completedTasks}
            onAddTask={handleAddTask}
            tasks={tasks}
          />
        </div>
      </div>
    </div>
  );
}

function TaskHolder({ onCompletedTasks, tasks, onDeleteTask, onDeleteAll }) {
  return (
    <div className="task-holder">
      <div className="title">
        <h2>Today's Tasks</h2>
        <h3 onClick={onDeleteAll}>Reset Tasks</h3>
      </div>
      <hr />
      {tasks.map((task) => (
        <Task
          key={task.id}
          name={task.name}
          completed={task.completed}
          onCompletedTasks={onCompletedTasks}
          onDeleteTask={onDeleteTask}
          id={task.id}
        />
      ))}
    </div>
  );
}

function TaskMaker({ completedTasks, onAddTask, tasks }) {
  const [taskValue, setTaskValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!taskValue) return;

    const newTask = {
      id: tasks.length + 1,
      name: taskValue,
      completed: false,
    };

    onAddTask(newTask);

    setTaskValue("");
  }

  function handleTitle() {
    if (tasks.length === 0) {
      return "Add A Task To Get Started";
    } else if (completedTasks === tasks.length) {
      return "Well done completing all your tasks!";
    } else if (completedTasks > 0) {
      return `You’ve Completed ${completedTasks} Tasks Today, Keep It Up!`;
    } else if (completedTasks === 0) {
      return "Lets get started with some tasks!";
    }
  }

  return (
    <div className="task-maker">
      <div className="title">
        <h2>{handleTitle()}</h2>
        <h3>
          The best time to plant a tree was 20 years ago. The second best time
          is now.
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Add A Task</label>
        <textarea
          onChange={(e) => setTaskValue(e.target.value)}
          value={taskValue}
        ></textarea>
        <button>
          Add Task
          <span>
            <svg
              width="17"
              height="18"
              viewBox="0 0 17 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.956155 8.3239C0.582753 8.3239 0.280052 8.6266 0.280052 9C0.280052 9.3734 0.582753 9.6761 0.956155 9.6761L7.90113 9.6761L7.90113 16.4371C7.90113 16.8105 8.20384 17.1132 8.57724 17.1132C8.95064 17.1132 9.25334 16.8105 9.25334 16.4371L9.25334 9.6761L15.8304 9.6761C16.2038 9.6761 16.5065 9.3734 16.5065 9C16.5065 8.6266 16.2038 8.3239 15.8304 8.3239L9.25334 8.3239L9.25334 1.56283C9.25334 1.18943 8.95064 0.886724 8.57724 0.886724C8.20384 0.886724 7.90113 1.18943 7.90113 1.56283L7.90113 8.3239L0.956155 8.3239Z"
                fill="white"
              />
            </svg>
          </span>
        </button>
      </form>
    </div>
  );
}

function Task({ name, id, completed, onCompletedTasks, onDeleteTask }) {
  function handleDelete(e) {
    e.preventDefault();
    onDeleteTask(id);
  }

  function handleCheck() {
    // find id
    const taskId = id;
    // boolean for check opposite
    const checkState = !completed;

    onCompletedTasks(taskId, checkState);
  }

  return (
    <div className="task">
      <div className="content">
        <div>
          <input
            type="checkbox"
            className="checkbox"
            onChange={handleCheck}
            checked={completed}
          />
          <svg
            className="checkmark"
            width="24"
            height="17"
            viewBox="0 0 24 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.4471 0.468067C24.4904 1.53547 23.8535 2.00704 23.2015 2.67408L9.84788 16.3352C9.19585 17.0023 8.13695 17.0023 7.48492 16.3352L0.808119 9.50466C0.156087 8.83761 -0.561212 8.15578 0.674905 7.22851C1.81576 6.3727 2.51905 7.27311 3.17108 7.94016L8.66901 13.6332L20.8437 1.17967C21.4958 0.51262 22.3484 -0.655971 23.4471 0.468067Z"
              fill="#72A603"
            />
          </svg>
          <p className={completed ? "completed" : ""}>{name}</p>
        </div>
        <svg
          onClick={handleDelete}
          className="delete"
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1.2749"
            width="21.6353"
            height="1.80294"
            rx="0.901472"
            transform="rotate(45 1.2749 0)"
            fill="#4D4D4D"
          />
          <rect
            x="16.7468"
            y="1.4483"
            width="21.6353"
            height="1.80294"
            rx="0.901472"
            transform="rotate(135 16.7468 1.4483)"
            fill="#4D4D4D"
          />
        </svg>
      </div>
      <hr />
    </div>
  );
}
