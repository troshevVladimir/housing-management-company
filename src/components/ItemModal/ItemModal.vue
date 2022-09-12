<template>
  <div
    class="modal fade d-block show"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">{{params.title}}</h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="close"
          ></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';
import { ModalProps } from './types'

export default defineComponent({
	name: 'item-modal',
	props: {
		params: {
			type: Object as PropType<ModalProps>,
			required: true,
		},
	},
	methods: {
		close() {
			this.$emit('close')
		}
	}
})
</script>

<style>
</style>