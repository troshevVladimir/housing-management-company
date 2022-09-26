<template>
  <section class="tabs">
    <ui-tabs title='tabs'>
      <ui-tab name='tab1' class="tab">
        <template #label>
          <h3 class="label">adfasdf</h3>
        </template>
        <template #content>
          <p>adfaasdasdsdf</p>
        </template>
      </ui-tab>
      <ui-tab name='tab1' class="tab">
        <template #label>
          <h3 class="label">adfasdf</h3>
        </template>
        <template #content>
          <p>adfaasdasdsdf</p>
        </template>
      </ui-tab>
    </ui-tabs>
  </section>
</template>

<script>
import UITabs from "@/components/ui/UITabs.vue";
export default {
  components: { UITabs },
};
</script>

<style lang="scss" scoped>
.tabs {
  &:deep(.label) {
    font-size: 16px;
    display: flex;
    align-items: center;
    font-weight: 600;
    color: var(--text-color);
  }
}

.tab {
  margin-bottom: 4px;

  &:deep(p) {
    margin-bottom: 0;
  }

  &:deep(h3) {
    margin-bottom: 0;
  }
}
</style>
