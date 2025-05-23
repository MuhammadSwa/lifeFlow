// src/components/TodoStats.tsx
import { Component, Show } from "solid-js";
import { loadTodos, useFilteredTodos } from "../stores/todoStore";
import { store } from "../stores/todoStore";

export const TodoStats: Component = () => {
  const allTodos = loadTodos();
  const filteredTodos = useFilteredTodos();

  // Calculate counts
  const completedCount = () => filteredTodos().filter(todo => todo.completed).length;
  const activeCount = () => filteredTodos().filter(todo => !todo.completed).length;
  const totalFilteredCount = () => filteredTodos().length;
  const allTodosCount = () => allTodos().length;

  // Check if we're currently filtering
  const isFiltered = () => {
    return store.selectedProject !== undefined ||
      store.selectedArea !== undefined ||
      store.activeFilter.type !== 'ALL';
  };

  return (
    <Show when={allTodosCount() > 0}>
      <div class="flex justify-between items-center mb-4 px-2 text-sm">
        <div class="text-sm text-gray-600 dark:text-gray-400">
          <span><span class="font-medium">{totalFilteredCount()}</span>  {isFiltered() ? 'filtered' : 'total'} item{totalFilteredCount() !== 1 ? 's' : ''}</span>


          <Show when={isFiltered() && totalFilteredCount() !== allTodosCount()}>
            <span class="text-gray-400 ml-1">
              (out of {allTodosCount()})
            </span>
          </Show>
        </div>

        <Show when={store.activeFilter.type === "ALL"}>
          <div class="flex gap-3">

            <div class="text-sm flex gap-3">
              <span class="text-indigo-600 dark:text-indigo-400">{activeCount()} active</span>
            </div>
            <span class="text-gray-500">{completedCount()} completed</span>
          </div>
        </Show>
      </div>
    </Show>
  );
};

export default TodoStats;
