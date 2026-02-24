import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

const Sidebar = ({ setCurrentSection, currentSection, newTodo, setNewTodo, addTodo, selectedDate, setSelectedDate }) => {
    const [input, setinput] = useState(false);

    const navItem =
        "pl-3 py-2 rounded-md cursor-pointer transition-colors duration-200";

    const activeStyle =
        "bg-teal-100 dark:bg-teal-800/70 border-l-4 border-teal-500 text-teal-600 dark:text-teal-400";

    const inactiveStyle =
        "hover:text-teal-500 hover:bg-zinc-300/50 dark:hover:bg-zinc-700/40 text-stone-600 dark:text-zinc-300";

    return (
        <div className="flex flex-col p-5 gap-10 font-['Alata'] animate-[fadeSlideIn_0.5s_ease-out]">
            <div>
                <div className="text-2xl font-bold">Home</div>
                <div className="h-0.5 bg-zinc-400 my-2"></div>

                <div className="flex flex-col gap-2 mt-3 text-lg font-normal">
                    <div
                        onClick={() => setCurrentSection("All Tasks")}
                        className={`${navItem} ${currentSection === "All Tasks" ? activeStyle : inactiveStyle}`}
                    >
                        All Tasks
                    </div>

                    <div
                        onClick={() => setCurrentSection("Today")}
                        className={`${navItem} ${currentSection === "Today" ? activeStyle : inactiveStyle}`}
                    >
                        Today
                    </div>

                    <div
                        onClick={() => setCurrentSection("This Week")}
                        className={`${navItem} ${currentSection === "This Week" ? activeStyle : inactiveStyle}`}
                    >
                        This Week
                    </div>

                    <div
                        onClick={() => setCurrentSection("Important")}
                        className={`${navItem} ${currentSection === "Important" ? activeStyle : inactiveStyle}`}
                    >
                        Important
                    </div>
                </div>
            </div>

            <div>
                <div className="text-2xl font-bold">Tasks</div>
                <div className="h-0.5 bg-zinc-400 my-2"></div>

                <div className={`mt-3 text-lg font-normal ${navItem} ${inactiveStyle}`}>
                    <div
                        onClick={() => setinput(true)}
                        className="flex items-center gap-2 mt-1 text-lg font-normal cursor-pointer transition-colors"
                    >
                        <AiOutlinePlusCircle className="text-2xl" />
                        <span>Add</span>
                    </div>

                    {input && (
                        <>
                            <div className="animate-[fadeSlideIn_0.3s_ease-out]">
                                <input
                                    type="text"
                                    className="mb-2 mt-4 p-1 w-4/5 h-8 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-stone-700 text-black dark:text-white dark:focus:ring-stone-400"
                                    value={newTodo}
                                    onChange={(e) => setNewTodo(e.target.value)}
                                    placeholder="Add a task..."
                                    autoFocus
                                    required
                                />
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="mb-2 p-2 w-4/5 rounded-md border bg-white dark:bg-slate-800"
                                />  
                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={() => {
                                            addTodo();
                                            setinput(false);
                                        }}
                                        className="px-3 py-1 bg-teal-600 text-white rounded-md cursor-pointer hover:shadow-sm hover:shadow-stone-700 dark:hover:shadow-zinc-400/50"
                                    >
                                        Add
                                    </button>

                                    <button
                                        onClick={() => setinput(false)}
                                        className="px-3 py-1 text-white bg-red-600 dark:bg-red-700 rounded-md cursor-pointer hover:shadow-sm hover:shadow-stone-700 dark:hover:shadow-zinc-400/50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;