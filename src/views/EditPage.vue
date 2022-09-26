<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <div class="edit-page">
    <h1>Редактирование ToDo</h1>
    <div class="edit-page__field" ref='field-name'>
      <div class="edit-page__field-info">
        <b class="todo-name">Название:</b>
        <p class="todo-name-value">{{todo.name}}</p>
        <input class="todo-input hide" type="text" v-model="todo.name">
      </div>

      <UIButton
        size='small'
        kind='success'
        class="edit-page__btn edit-page__btn--edit"
        @click="editName(todo.name)"
      >Редактировать</UIButton>
    </div>

    <div
      class="edit-page__field"
      :ref='`field-${idx}`'
      v-for="(todo, idx) in todo.tasks"
      :key="todo.id"
    >

      <div class="edit-page__field-info">
        <p class="todo-name">№{{idx + 1}}</p>
        <input class="todo-checkbox" type="checkbox" v-model="todo.completed">
        <p class="todo-name-value">{{todo.title}}</p>
        <input class="todo-input hide" type="text" v-model="todo.title">
      </div>

      <div class="edit-page__field-buttons">
        <UIButton
          size='small'
          kind='success'
          class="edit-page__btn edit-page__btn--delete"
          @click="deleteField(idx)"
        >&times;</UIButton>
        <UIButton
          size='small'
          kind='success'
          class="edit-page__btn edit-page__btn--edit"
          @click="editField(idx)"
        >Редактировать</UIButton>
      </div>
    </div>

    <div class="edit-page__actions">
      <UIButton
        kind='success'
        class="edit-page__btn"
        @click="addNewField"
      >Добавить задачу</UIButton>

      <UIButton
        kind='success'
        class="edit-page__btn"
        @click="save"
        :disabled='hasChanges'
      >Сохранить</UIButton>
      <UIButton
        kind='success'
        class="edit-page__btn"
        @click="exit"
      >Отмена</UIButton>
      <UIButton
        kind='success'
        class="edit-page__btn"
        @click="deleteCurrent"
      >Удалить</UIButton>
      <UIButton
        kind='success'
        class="edit-page__btn"
        :disabled='hasChanges'
        @click="discardChanges"
      >Откатить внесённые изменения</UIButton>
      <UIButton
        kind='success'
        class="edit-page__btn"
        :disabled='!discardedChanges'
        @click="revertDiscardingChanges"
      >Повторить</UIButton>
    </div>
  </div>

  <MoldalWindow
    confirm
    v-if="showConfirm"
    @save="execute"
    @close="cancel"
  >
    <h2>{{confirmText}}</h2>
  </MoldalWindow>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import MoldalWindow from '@/components/ui/ModalWindow.vue';
import { isEqual, cloneDeep } from 'lodash';

export default {
  name: 'edit-page',
  components: { MoldalWindow },
  data() {
    return {
      showConfirm: false,
      todo: {},
      currentId: this.$route.params.id,
      confirmAction: null,
      confirmText: null,
      initialTodo: null,
      discardedChanges: null,
      hasChanges: false,
      store: this.$store.state,
    };
  },
  computed: {
    ...mapGetters({
      getTodoById: 'todoData/getTodoById'
    }),
  },
  watch: {
    todo: {
      handler() {
        this.hasChanges = isEqual(this.todo, this.initialTodo);
      },
      deep: true,
    },
  },
  methods: {
    ...mapMutations({
      updateTodo: 'todoData/updateTodo',
      deleteTodo: 'todoData/deleteTodo'
    }),

    execute() {
      if (Array.isArray(this.confirmAction)) {
        this.confirmAction.forEach((func) => {
          func();
        });
      } else {
        this.confirmAction();
      }
      this.cancel();
    },
    deleteField(id) {
      if (this.todo.tasks.length > 1) {
        this.todo.tasks.splice(id, 1);
      }
    },
    editField(id) {
      const field = this.$refs[`field-${id}`][0];
      const value = field.querySelector('.todo-name-value');
      const input = field.querySelector('.todo-input');
      const editBtn = field.querySelector('.edit-page__btn--edit');
      value.classList.add('hide');
      input.classList.remove('hide');
      editBtn.classList.add('hide');
    },

    editName() {
      const field = this.$refs['field-name'];
      const value = field.querySelector('.todo-name-value');
      const input = field.querySelector('.todo-input');
      const editBtn = field.querySelector('.edit-page__btn--edit');
      value.classList.add('hide');
      input.classList.remove('hide');
      editBtn.classList.add('hide');
    },
    cancel() {
      this.confirmAction = null;
    },
    addNewField() {
      this.todo.tasks.push({ title: '' });
    },
    save() {
      const data = { todo: this.todo, id: this.currentId };
      this.updateTodo(data);
      this.goToList();
    },
    exit() {
      this.showConfirm = true;
      this.confirmText = 'Подтвердите завершение редактирования';
      this.confirmAction = this.goToList;
    },
    deleteCurrent() {
      this.showConfirm = true;
      this.confirmText = 'Подтвердите удаление текущего элемента';
      this.confirmAction = [this.deleteTodo.bind(this, this.currentId), this.goToList];
    },
    discardChanges() {
      this.discardedChanges = cloneDeep(this.todo);
      this.todo = cloneDeep(this.initialTodo);
    },
    revertDiscardingChanges() {
      this.todo = cloneDeep(this.discardedChanges);
      this.discardedChanges = null;
    },
    goToList() {
      this.$router.push({name: 'todo-list'});
    },
  },
  mounted() {
    this.todo = this.getTodoById(this.currentId);
    this.initialTodo = cloneDeep(this.todo);
  },
};

</script>

<style lang='scss'>
  .edit-page {
    $root: &;

    padding: 20px;
    margin-bottom: 30px;

    &__field {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #666;
      margin-bottom: 20px;
      padding: 20px;

      @media screen and (max-width: 600px) {
        flex-direction: column;
        align-items: start;
      }
    }

    .hide {
      display: none;
    }

    &__btn {
      :not(:first-child) {
        margin-left: 20px;
      }
    }

    &__field-info {
      display: flex;
      align-items: center;
      margin: 20px 0;
      flex: 1 1 auto;
      flex-wrap: wrap;
    }

    &__actions {
      display: flex;
      flex-wrap: wrap;

      #{$root}__btn {
        margin-right: 20px;
        margin-bottom: 10px;
      }

      @media screen and (max-width: 600px) {
        flex-direction: column;

        #{$root}__btn {
          margin-bottom: 20px;
          margin-right: 0;
        }
      }
    }

    .todo-input {
      margin-right: auto;
    }

    .todo-name-value {
      flex: 1 1 auto;
    }

    .todo-name {
      max-width: 120px;
      margin-right: 10px;
    }

    .todo-checkbox {
      margin-right: 20px;
    }
  }

</style>
