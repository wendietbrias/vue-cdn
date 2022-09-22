const { createApp } = Vue;

createApp({
  data() {
    return {
      todos: JSON.parse(localStorage.getItem("todos")) || [],
      todo: "",
      btnName: "Add",
      id: null,
    };
  },
  methods: {
    saveToLocal() {
      return localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    todoHandler() {
      if (this.btnName === "Add") {
        this.todos = [
          ...this.todos,
          {
            id: Math.floor(Math.random() * 10000) + 1,
            title: this.todo,
            createdAt: new Date().toDateString(),
          },
        ];
        this.todo = "";
      } else {
        const updated = this.todos.map((todo) =>
          todo.id === this.id ? { ...todo, title: this.todo } : todo
        );
        this.todos = updated;
      }

      this.btnName = "Add";
      this.id = null;
      return this.saveToLocal();
    },
    deleteTodo(id = null) {
      // console.log(id);
      const deleteTodo = this.todos.filter((todo) =>
        todo.id !== id ? todo : ""
      );
      this.todos = deleteTodo;
      this.saveToLocal();
      return this.todos;
    },
    updateTodo(id) {
      const findTodo = this.todos.find((item) => item.id === id);
      this.todo = findTodo.title;
      this.btnName = "Update";
      this.id = findTodo.id;
    },
  },
}).mount("#app");
