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
    hasTodos() {
      return this.todos.length > 0;
    },
  },
  watch: {
    todos: {
      handler(next) {
        // localStorageの値は文字列しか使用できないのでJSON.stringifyする
        window.localStorage.setItem("todos", JSON.stringify(next));
      },
      deep: true,
    },
    categories: {
      handler(next) {
        // localStorageの値は文字列しか使用できないのでJSON.stringifyする
        window.localStorage.setItem("categories", JSON.stringify(next));
      },
      deep: true,
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
  created() {
    const todos = window.localStorage.getItem("todos");
    const categories = window.localStorage.getItem("categories");

    if (todos) {
      // オブジェクトにしてtodosに格納
      this.todos = JSON.parse(todos);
    }

    if (categories) {
      // オブジェクトにしてcategoriesに格納
      this.categories = JSON.parse(categories);
    }
  },
}).mount("#app");
