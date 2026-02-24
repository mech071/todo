import { useState, useEffect } from 'react';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const addTodo = () => {
    if (newTodo.trim() === "" || selectedDate === "") return;

    setTodos(prev => [
      ...prev,
      {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        important: false,
        date: selectedDate
      }
    ]);

    setNewTodo("");
    setSelectedDate("");
  };
  const toggleComp = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };
  const toggleImp = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, important: !todo.important }
          : todo
      )
    );
  };
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    return window.innerWidth >= 768;
  });
  const [currentSection, setCurrentSection] = useState("All Tasks");
  const filteredTodos = todos.filter((todo) => {
    const today = new Date();
    const taskDate = todo.date ? new Date(todo.date) : null;

    if (currentSection === "Completed") return todo.completed;
    if (currentSection === "Important") return todo.important;
    if (currentSection === "Pending") return !todo.completed;

    if (currentSection === "Today" && taskDate) {
      return (
        taskDate.getDate() === today.getDate() &&
        taskDate.getMonth() === today.getMonth() &&
        taskDate.getFullYear() === today.getFullYear()
      );
    }

    if (currentSection === "This Week") {
      const today = new Date();
      const taskDate = new Date(todo.date);
      const day = today.getDay();
      const diffToMonday = day === 0 ? -6 : 1 - day;
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() + diffToMonday);
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      return taskDate >= startOfWeek && taskDate <= endOfWeek;
    }

    return true;
  });

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  return (
    <>

      <div className={theme === "dark" ? "dark" : ""}>
        <div className="min-h-screen text-stone-600 font-bold font-['Alata'] dark:text-white">
          <Navbar toggleTheme={toggleTheme} theme={theme} toggleSidebar={() => setSidebarOpen(prev => !prev)} />
          <div className="flex md:flex-1">
            {sidebarOpen && (
              <div className={`fixed md:static top-[72px] left-0 h-full w-64 md:w-1/5 bg-zinc-100 dark:bg-slate-800
    border-r border-zinc-200 dark:border-zinc-800
    transform transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
    z-50`}>
                <Sidebar setCurrentSection={setCurrentSection} currentSection={currentSection} newTodo={newTodo}
                  setNewTodo={setNewTodo} addTodo={addTodo} selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate} />
              </div>
            )}

            <div className="h-[calc(100vh-72px)] flex-1 border-r bg-zinc-200 dark:bg-slate-900 border-zinc-400 dark:border-zinc-700 p-6">
              <Dashboard currentSection={currentSection} todos={filteredTodos}
                toggleComp={toggleComp}
                toggleImp={toggleImp}
                deleteTodo={deleteTodo}
                addTodo={addTodo}
                newTodo={newTodo}
                setNewTodo={setNewTodo}
              />
            </div>
          </div>

        </div>
      </div>

    </>
  );
}

export default App
