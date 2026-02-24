import React from "react";
import { TiTick } from "react-icons/ti";
import { MdOutlineStarPurple500 } from "react-icons/md"
import { RxCross1 } from "react-icons/rx"

const Dashboard = ({
    currentSection,
    todos,
    toggleComp,
    toggleImp,
    deleteTodo
}) => {
    return (
        <div className="container flex flex-col">

            <div className="header p-5 h-22 bg-teal-500 dark:bg-teal-700 rounded-xl flex items-center text-slate-50 dark:text-white text-4xl tracking-wide">
                {currentSection}
            </div>

            <div className="mt-5 flex flex-col gap-3">
                {todos.length === 0 ? (
                    <div className="content flex items-center justify-center text-xl mt-5 tracking-wide">Nothing Here...</div>
                ) : (
                    todos.map((todo) => (
                        <div
                            key={todo.id}
                            className="text-zinc-800 text-2xl font-[Jost]"
                        >
                            <div className="p-3 bg-white dark:bg-slate-800 rounded-md flex justify-between items-center shadow-sm">
                                <span
                                    className={todo.completed ? "line-through opacity-60" : ""}
                                >
                                    {todo.text}
                                </span>
                                <div className="text-sm text-zinc-500">
                                    {new Date(todo.date).toLocaleDateString()}
                                </div>
                                <div className="flex gap-3 text-lg">
                                    <button
                                        onClick={() => toggleComp(todo.id)}
                                        className={` ${todo.completed ? "text-green-700" : "text-zinc-600"
                                            } hover:scale-110 transition`}
                                    >
                                        <TiTick />
                                    </button>

                                    <button
                                        onClick={() => toggleImp(todo.id)}
                                        className={` ${todo.important ? "text-yellow-500" : "text-zinc-600"
                                            } hover:scale-110 transition`}
                                    >
                                        <MdOutlineStarPurple500 />
                                    </button>

                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="font-extrabold text-red-800 hover:scale-110 transition"
                                    >
                                        <RxCross1 />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;