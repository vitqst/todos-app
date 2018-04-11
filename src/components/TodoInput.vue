<template>
  <div class="container" id="input-wraper">
      <h1>TODO APP</h1>
      <div class="input-control">
        <input type="text" v-model="txt" @keyup.enter="onSubmit" @keyup.esc="onClear">
      </div>
      <ul>
        <li :key="todo.id" v-for="todo in todos" v-on:click="onComplete(todo)" :class="{'completed': todo.status}" :title="todo.text">
            <span v-bind:class="{'text-line-throught': todo.status}">{{todo.text}}</span>
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
      todos: Utinities.sortNotes(Utinities.getNotes()),
      nextID: Utinities.getNextId()
    };
  },
  methods: {
    onSubmit() {
      if (this.txt.trim() !== "") {
        let time = Date.now();
        this.todos.push({
          id: this.nextID,
          text: this.txt,
          timestamp: time,
          timestamp_human: new Date(time),
          status: false
        });

        this.todos = Utinities.sortNotes(this.todos);
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
        todo.status = todo.status === true ? false : true;
        todos[index] = todo;
        this.todos = todos;

        this.todos = Utinities.sortNotes(this.todos);
        Utinities.setNotes(this.todos);
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

        this.todos = Utinities.sortNotes(this.todos);
        Utinities.setNotes(this.todos);
      }
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Quicksand");

.container {
  width: 600px;
  margin: auto;
}

body,
span,
input {
  font-size: 18px;
  font-family: "Quicksand", sans-serif;
  color: #373635;
}

h1 {
  font-family: "Quicksand", sans-serif;
  user-select: none;
}

#input-wraper .input-control {
  width: 100%;
  margin-bottom: 20px;
}

#input-wraper input {
  width: 500px;
  padding: 10px;
  border: 1px solid #bbbbbb;
  border-radius: 5px;
  font-size: inherit;
}

ul {
  padding: 10px;
  margin: 0;
}

li {
  list-style: none;
  display: block;
  padding: 0 0 0 15px;
  margin-bottom: 5px;
  border-style: solid;
  border-width: 1px 0px 1px 5px;
  border-color: #373635;
}

li.completed {
  border-color: #bbbbbb;
}

li.completed:hover {
  background: none;
}

li:hover {
  background: #eceff1;
  cursor: pointer;
}

li button {
  float: right;
  user-select: none;
  border: 1px solid #373635;
  background: #373635;
  color: white;
  border-radius: 0;
  height: 35px;
  width: 35px;
}

li.completed button {
  background: #bbbbbb;
  border-color: #bbbbbb;
}

li.completed span {
  color: #bbbbbb;
}

li button:hover {
  border: 1px solid #d32f2f;
  background: #d32f2f;
  cursor: pointer;
}

li span {
  float: left;
  user-select: none;
  display: block;
  overflow: hidden;
  text-align: left;
  max-width: 500px;
  line-height: 35px;
}

.text-line-throught {
  text-decoration: line-through;
}

.clear-float {
  clear: both;
}
</style>
