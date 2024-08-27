import axios from "axios";
import React, { useEffect, useState } from "react";

function HABIT() {
  const [habits, setHabits] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [habitIdToEdit, setHabitIdToEdit] = useState(null);
  const [habitIdToDeleted, setHabitIdToDeleted] = useState(null);
  const [isDeletedForm, setIsDeletedForm] = useState(false);
  const [habitIdTodone, setHabitIdTodone] = useState(null);
  const [doneForm, setdoneForm] = useState(false);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/habit");
      setHabits(response.data.Habits);
    } catch (err) {
      console.error("Error fetching habits:", err);
    }
  };
  if (habits.done) {
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (habitIdToEdit) {
        await axios.put(`http://localhost:3000/api/habit/${habitIdToEdit}`, {
          NameHabit: title,
          Habit_description: description,
          Categories: categories,
        });
      } else if (habitIdToDeleted) {
        await axios.put(
          `http://localhost:3000/api/habit/deleted/${habitIdToDeleted}`,
          {
            isDeleted: true,
          }
        );
        resetForm();
        fetchHabits();
        setIsDeletedForm(false);
      } else if (habitIdTodone) {
        await axios.put(
          `http://localhost:3000/api/habit/done/${habitIdTodone}`,
          {
            done: true,
          }
        );
        resetForm();
        fetchHabits();
        setdoneForm(false);
      } else {
        await axios.post("http://localhost:3000/api/habit", {
          NameHabit: title,
          Habit_description: description,
          Categories: categories,
        });
      }
      resetForm();
      fetchHabits();
    } catch (err) {
      console.error("Error saving habit:", err);
    }
  };

  const resetForm = () => {
    setIsFormVisible(false);
    setHabitIdToEdit(null);
    setTitle("");
    setDescription("");
  };

  const handleEditClick = (habit) => {
    setHabitIdToEdit(habit._id);
    setTitle(habit.NameHabit);
    setDescription(habit.Habit_description);
    setCategories(habit.Categories);
    setIsFormVisible(true);
  };

  const handleDeleteClick = (habit) => {
    setHabitIdToDeleted(habit._id);
    setIsDeletedForm(true);
  };
  const handledone = (habit) => {
    setHabitIdTodone(habit._id);
    setdoneForm(true);
  };

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => {
          resetForm();
          setIsFormVisible(true);
        }}
        className="w-full p-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
      >
        Add Habit
      </button>
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full relative">
            <button
              onClick={resetForm}
              className="absolute top-3 right-4 text-gray-600 text-2xl font-bold hover:text-gray-800 transition"
            >
              ×
            </button>
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold mb-6">
                {habitIdToEdit ? "Edit Habit" : "Add New Habit"}
              </h2>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Habit Title"
                required
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Habit Description"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="relative w-full mb-4">
                <select
                  onChange={(e) => setCategories(e.target.value)}
                  className="block w-full bg-white border border-gray-300 rounded-lg py-3 px-4 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Other">Select Category</option>
                  <option value="Health">Health</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Mindfulness">Mindfulness</option>
                  <option value="Other">Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z" />
                  </svg>
                </div>
              </div>
  
              <button
                type="submit"
                className="w-full p-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
              >
                {habitIdToEdit ? "Update Habit" : "Save Habit"}
              </button>
            </form>
          </div>
        </div>
      )}
  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {habits.length > 0 ? (
          habits.map((habit) => (
            <div
              key={habit._id}
              className="border border-gray-200 p-6 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <h3 className="font-semibold text-xl text-gray-800 mb-3">
                {habit.NameHabit}
              </h3>
              <p className="text-gray-700 mb-4">{habit.Habit_description}</p>
              <span className="inline-block bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full mb-3">
                {habit.Categories}
              </span>
  
              <div className="flex justify-between items-center">
                <span
                  className={`${
                    habit.done ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                  } inline-block text-sm font-semibold px-3 py-1 rounded-full`}
                >
                  {habit.done ? "Complete" : "Incomplete"}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditClick(habit)}
                    className="px-3 py-2 text-yellow-600 bg-yellow-100 rounded-full hover:bg-yellow-200 transition duration-300"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(habit)}
                    className="px-3 py-2 text-red-600 bg-red-100 rounded-full hover:bg-red-200 transition duration-300"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button
                    onClick={() => handledone(habit)}
                    className={`${
                      habit.done ? "hidden" : ""
                    } px-3 py-2 text-green-600 bg-green-100 rounded-full hover:bg-green-200 transition duration-300`}
                  >
                    <i className="fa-solid fa-check"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 mt-6">No habits currently.</p>
        )}
      </div>
  
      {isDeletedForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this habit?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setHabitIdToDeleted(null);
                  setIsDeletedForm(false);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {doneForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Confirm Completion</h2>
            <p>Are you sure you have completed this habit?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setHabitIdTodone(null);
                  setdoneForm(false);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
  
}

export default HABIT;
