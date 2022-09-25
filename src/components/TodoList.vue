<template >
  <div class="todo-list">
    <ul v-if="getAllTodos.length">
      <todo-item
        v-for="todo in getAllTodos"
        :key='todo.id'
        :id='todo.id'
        :name='todo.name'
        :tasks='todo.tasks'
        @delete="beginDelete"
      ></todo-item>
    </ul>
    <p v-else>Ещё не добавлено ниодной Todo</p>
    <UIButton
      kind='success'
      @click='modalShow = true'
      class="modal__button"
    >Добавить Todo</UIButton>
  </div>

  <MoldalWindow v-if="modalShow"
    @save="addNewTodoIntoStore"
    @close="closeModal"
  >
    <label class="todo-list__field" for="name">
      <p>Название</p>
      <input type="text" id="name" v-model="newTodo.name">
    </label>
    <label
      class="todo-list__field"
      :for="`field-${idx}`"
      v-for="(todo , idx) in newTodo.tasks"
      :key='idx'
    >
      <p>№{{idx + 1 }}</p>
      <div class="todo-list__input">
        <input type="text" v-model="newTodo.tasks[idx].title" :id="`field-${idx}`">
        <UIButton
          kind='danger'
          size='small'
          @click="deleteField(idx)"
        >&times;</UIButton></div>
    </label>
    <UIButton
      kind='success'
      size='small'
      @click="addNewField"
    >Добавить задачу</UIButton>
  </MoldalWindow>

  <MoldalWindow
    confirm
    v-if="applicantId && applicantAction"
    @save="execute"
    @close="cancel"
  >
    <h2>{{applicantText}}</h2>
  </MoldalWindow>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue';
import MoldalWindow from '@/components/ui/ModalWindow.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'todo-list',
  components: { TodoItem, MoldalWindow },
  data() {
    return {
      modalShow: false,
      applicantId: null,
      applicantAction: null,
      applicantText: null,
      newTodo: {
        name: '',
        tasks: [
          { title: '' },
        ],
      },
    };
  },
  methods: {
    ...mapMutations({
      addTodo: 'todoData/addTodo',
      deleteTodo: 'todoData/deleteTodo',
    }),
    beginDelete(id) {
      this.applicantId = id;
      this.applicantAction = this.deleteTodo;
      this.applicantText = `Удалить Todo ${this.getAllTodos[this.applicantId].name}`;
    },
    execute() {
      this.applicantAction(this.applicantId);
      this.cancel();
    },
    cancel() {
      this.applicantId = null;
      this.applicantAction = null;
    },
    closeModal() {
      this.modalShow = false;
      this.resetForm();
    },
    deleteField(id) {
      if (this.newTodo.tasks.length > 1) {
        this.newTodo.tasks.splice(id, 1);
      }
    },
    addNewField() {
      this.newTodo.tasks.push({ title: '' });
    },
    addNewTodoIntoStore() {
      this.addTodo(this.newTodo);
      this.closeModal();
    },
    resetForm() {
      this.newTodo = {
        name: '',
        tasks: [
          { title: '' },
        ],
      };
    },
  },
  computed: {
    ...mapGetters({
      getAllTodos: 'todoData/getAllTodos'
    }),
  },
};
</script>

<style lang='scss'>
.todo-list {
  padding: 20px;

  &__form {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  &__field {
    margin-bottom: 20px;
  }

  &__input {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
}
</style>
