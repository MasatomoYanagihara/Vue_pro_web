Vue.createApp({
  data() {
    return {
      todoTitle: "",
      todoDescription: "",
      todoCategories: [],
      selectedCategory: "",
      todos: [],
      categories: [],
      hideDoneTodo: false,
      searchWord: "",
      order: "desc",
      categoryName: "",
    };
  },
  computed: {
    canCreateTodo() {
      return this.todoTitle !== "";
    },
    canCreateCategory() {
      return this.categoryName !== "" && !this.existsCategory;
    },
    existsCategory() {
      const categoryName = this.categoryName;

      return this.categories.indexOf(categoryName) !== -1;
    },
  },
  methods: {
    createTodo() {
      // 何も入力されていなかったらTodo作成しない
      if (!this.canCreateTodo) {
        return;
      }

      // todo追加処理
      this.todos.push({
        id: "todo-" + Date.now(),
        title: this.todoTitle,
        description: this.todoDescription,
        categories: this.todoCategories,
        dateTime: Date.now(),
        done: false,
      });

      // リセット
      this.todoTitle = "";
      this.todoDescription = "";
      this.todoCategories = [];
    },
    createCategory() {
      // 何も入力されていなかったらCategory作成しない
      if (!this.canCreateCategory) {
        return;
      }

      // カテゴリー追加処理
      this.categories.push(this.categoryName);

      // リセット
      this.categoryName = "";
    },
  },
  watch: {
    // 監視したいdataやcomputedのプロパティ名(変化後の値, 変化前の値)
    todoTitle(next, prev) {
      console.log("next: " + next);
      console.log("prev: " + prev);
    },
  },
}).mount("#app");
