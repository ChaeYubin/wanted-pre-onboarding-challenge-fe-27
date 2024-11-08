// import { create } from 'zustand';

// import { TodoItem } from '@/types/todo';

// interface TodoStore {
//     editingTodo: TodoItem;
//     actions: {
//         editSelectedTodo: (title: string, content: string) => void;
//     }
// }

// const useTodoStore = create<TodoStore>((set) => ({
//     selectedTodo: {id: '', title: '', content: '', createdAt: '', updatedAt: ''},

//   actions: {
//     editSelectedTodo: (title: string, content: string) => {
//         set((state) => ({selectedTodo: {...state.selectedTodo, title, content}}));
//     }
//   },
// }));
