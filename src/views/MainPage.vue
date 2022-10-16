<template>
  <section class="accordions">
    <h2>Acordion</h2>
    <ui-accordions title="Title">
      <ui-accordion name="tab1" class="accordion">
        <template #label>
          <h3 class="label">adfasdf</h3>
        </template>
        <template #content>
          <p>adfaasdasdsdf</p>
          <p>adfaasdasdsdf</p>
          <p>adfaasdasdsdf</p>
          <p>adfaasdasdsdf</p>
        </template>
      </ui-accordion>
      <ui-accordion name="tab1" class="accordion">
        <template #label>
          <h3 class="label">adfasdf</h3>
        </template>
        <template #content>
          <p>adfaasdasdsdf</p>
          <p>adfaasdasdsdf</p>
          <p>adfaasdasdsdf</p>
          <p>adfaasdasdsdf</p>
        </template>
      </ui-accordion>
    </ui-accordions>
  </section>

  <section class="inputs">
    <h2>Inputs</h2>
    <ui-input
      label="input text"
      tag="input"
      type="text"
      name="my-name"
    ></ui-input>
    <ui-input
      label="input checkbox"
      tag="input"
      type="checkbox"
      name="agreement"
    ></ui-input>
    <ui-input label="input select" type="select" name="contry"></ui-input>
  </section>

  <section class="buttons">
    <h2>Buttons</h2>

    <ui-button kind="danger">Button</ui-button>
    <ui-button kind="success">Button</ui-button>
    <ui-button kind="">Button</ui-button>

    <ui-button size="small" kind="danger">Button</ui-button>
    <ui-button size="small" kind="success">Button</ui-button>
    <ui-button size="small" kind="">Button</ui-button>

    <ui-button disabled kind="danger">Button</ui-button>

    <ui-button router-link-to="http://localhost:8090/#tab1">Link</ui-button>
  </section>

  <section class="tabs">
    <h2>Tabs</h2>
    <ui-tabs>
      <ui-tab id="0" title="Tab 1">Tab 1</ui-tab>
      <ui-tab id="1" title="Tab 2">Tab 2</ui-tab>
    </ui-tabs>
  </section>
</template>

<script>
</script>

<style lang="scss" scoped>
  section {
    margin-bottom: 30px;
    max-width: 600px;
  }

  .accordion {
    &:deep(.label) {
      font-size: 16px;
      display: flex;
      align-items: center;
      font-weight: 600;
      color: var(--text-color);
    }
  }

  .accordion {
    margin-bottom: 4px;

    &:deep(p) {
      margin-bottom: 0;
    }

    &:deep(h3) {
      margin-bottom: 0;
    }
  }
</style>
