<template>
  <li class="todo-item">
    <div class="todo-item__title">
      <span>{{name}}</span>
    </div>
    <div class="todo-item__tasks">
      <todo-item-task
        v-for="task in cropTask"
        :key='task.id'
        :title="task.title"
        :completed="task.completed"
        :id="task.id"
      ></todo-item-task>
      <span v-if="cropTask.length < tasks.length">...</span>
    </div>

    <div class="todo-item__actions">
      <UIButton
        kind='danger'
        size="small"
        @click='deleteTodoItem'
        class="todo-item__delete"
      >&times;</UIButton>
      <UIButton
        kind='success'
        size='small'
        :router-link-to='{name: "todo-edit",params: { id: id}}'
      >Радактировать</UIButton>
      <!-- <router-link :to='{name: "edit",params: { id: id}}'>Радактировать</router-link> -->
  </div>
  </li>
</template>

<script>
import TodoItemTask from './TodoItemTask.vue';

export default {
  name: 'todo-item',
  components: {
    TodoItemTask,
  },
  methods: {
    deleteTodoItem() {
      this.$emit('delete', this.id);
    },
    editTodoItem() {
      this.$emit('edit', this.id);
    },
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    tasks: {
      type: Array,
      required: true,
    },
  },
  computed: {
    cropTask() {
      return this.tasks.slice(0, 3);
    },
  },
};
</script>

<style lang='scss'>
.todo-item {
  border: 1px solid #666;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: start;

  &__title {
    max-width: 200px;
  }

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: start;

    & > * {
      margin-bottom: 30px;
    }
  }

  & > * {
    margin-right: 40px;
  }

  &__tasks {
    flex: 1 1 auto;
  }

  &__actions {
    align-self: center;

    @media screen and (max-width: 900px) {
      align-self: start;

      & > * {
        margin-bottom: 30px;
      }
    }

    & > :first-child {
      margin-right: 20px;
    }
  }
}
</style>
