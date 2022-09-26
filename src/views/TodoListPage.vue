<template>
  <TodoList></TodoList>
</template>

<script>
import TodoList from '@/components/TodoList.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'todo-list-page',
  components: { TodoList },
  data() {
    return {
      store: this.$store.state,
    };
  },
  methods: {
  },
  computed: {
    ...mapGetters({
      getAllTodos: 'todoData/getAllTodos'
    }),
  },
  mounted() {
  },
};
</script>
