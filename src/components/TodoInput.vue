<template>
  <div class="container" id="input-wraper">
      <h1>TODOS</h1>
      <div class="input-control">
        <input type="text" v-model="txt" @keyup.enter="onSubmit" @keyup.esc="onClear">
      </div>
      <ul>
        <li v-for="todo in todos" v-on:click="onComplete(todo)">
            <span class="text-line-throught" v-if="todo.status === 1">{{todo.text}}</span>
            <span v-else>{{todo.text}}</span>
            <button v-on:click="onDelete(todo)">X</button>
            <div class="clear-float"></div>
        </li>
      </ul>
      <div></div>
  </div>
</template>

<script>
import * as Utinities from "./utilities";

export default {
  name: "TodoInput",
  data: function() {
    return {
      txt: "",
      todos: Utinities.getNotes(),
      nextID: Utinities.getNextId()
    };
  },
  methods: {
    onSubmit() {
      if (this.txt.trim() !== "") {
        this.todos.push({
          id: this.nextID,
          text: this.txt,
          status: 0
        });

        this.todos = this.todos.sort((b, a) => a.id - b.id);

        Utinities.setNotes(this.todos);
        this.nextID++;
        this.txt = "";
      } else {
        this.txt = "";
      }
    },

    onClear() {
      this.txt = "";
    },

    onComplete(todo) {
      let todos = Utinities.getNotes();
      if (todos.length > 0) {
        let index = todos.findIndex(function(element) {
          return element.id === todo.id;
        });
        todo.status = todo.status === 0 ? 1 : 0;
        todos[index] = todo;
        this.todos = todos;
        Utinities.setNotes(todos);
      }
    },

    onDelete(todo) {
      let todos = Utinities.getNotes();
      if (todos.length > 0) {
        let index = todos.findIndex(function(element) {
          return element.id === todo.id;
        });
        todos.splice(index, 1);
        this.todos = todos;
        Utinities.setNotes(todos);
      }
    }
  }
};
</script>

<style>
.container {
  width: 600px;
  margin: auto;
}

body {
  font-family: "Courier New", Courier, monospace;
  font-size: 16px;
}

#input-wraper .input-control {
  width: 100%;
  margin-bottom: 20px;
}

#input-wraper input {
  width: 500px;
  padding: 10px;
  border: 1px solid #9c9c9c;
  color: black;
  border-radius: 10px;
  font-size: inherit;
}

.text-line-throught {
  text-decoration: line-through;
}

ul {
  padding: 10px;
  margin: 0;
}

li {
  list-style: none;
  display: block;
  padding: 10px;
  border-style: solid;
  border-width: 1px 1px 0px 1px;
  border-color: #e5e5e5;
}

li:first-child {
  border-radius: 5px 5px 0 0;
}

li:last-child {
  border-width: 1px 1px 1px 1px;
  border-radius: 0 0 5px 5px;
}

li:hover {
  background: #e5e5e5;
}

li button {
  float: right;
  user-select: none;
  border: 1px solid green;
  background: green;
  color: white;
  border-radius: 3px;
}

li button:hover {
  border: 1px solid red;
  background: red;
  color: white;
}

li span {
  float: left;
  user-select: none;
  display: block;
  overflow: hidden;
  text-align: left;
  max-width: 400px;
}

.clear-float {
  clear: both;
}
</style>
