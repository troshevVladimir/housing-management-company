<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <li class="todo-item-task">
    <label>
      <input
        type="checkbox"
        class="todo-item-task__checkbox"
        :checked='completed'
        @click.prevent
      >
      <span>{{title}}</span>
    </label>
  </li>
</template>

<script>
export default {
  name: 'todo-item-task',
  props: {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang='scss'>
.todo-item-task {
  &__checkbox {
    margin-right: 20px;
    margin-bottom: 5px;
  }
}
</style>
