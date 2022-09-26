<template>
  <div class="modal">
    <UIButton
      v-if="!confirm"
      size='small'
      class="modal__closer"
      @click="emitClose"
    >&times;</UIButton>

    <slot />

    <div class="modal__controls" v-if="confirm">
      <UIButton kind='success' class="modal__button" @click="emitSave">Подтвердить</UIButton>
      <UIButton kind='danger' class="modal__button" @click="emitClose">Отмена</UIButton>
    </div>

    <div class="modal__controls" v-else>
    <UIButton
      kind='success'
      class="modal__button"
      @click="emitSave"
    >Сохранить</UIButton>

    <UIButton
      kind='danger'
      class="modal__button"
      @click="emitClose"
    >Закрыть</UIButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal-window',
  props: {
    confirm: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    emitClose() {
      this.$emit('close');
    },

    emitSave() {
      this.$emit('save');
    },
  },
};
</script>

<style lang='scss'>
.modal {
  min-width: 300px;
  max-width: 600px;
  padding: 40px;
  padding-top: 60px;
  height: auto;
  border: 1px solid #666;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 10px 5px 5px #666;
  display: flex;
  flex-direction: column;
  flex-grow: 0;

  @media screen and (max-width: 600px) {
    width: 80vw;
    min-width: 0;
    padding: 20px;
  }

  &__controls {
    display: flex;
    margin-top: 20px;
  }

  &__button {
    &:not(:last-child) {
      margin-right: 20px;
    }
  }

  &__closer {
    position: absolute;
    top: 20px;
    right: 20px;
    display: inline-block;
    align-self: end;
    margin-bottom: 20px;
  }
}
</style>
