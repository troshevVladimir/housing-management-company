<template>
  <div>
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
  </div>

  <div class="inputs">
    <h2>Inputs</h2>
    <ui-input
      label="input text"
      tag="input"
      type="text"
      name="my-name"
      placeholder="Введите значение"
    ></ui-input>
  </div>

  <div class="buttons">
    <h2>Buttons</h2>

    <ui-button kind="danger">Button</ui-button>
    <ui-button kind="success">Button</ui-button>
    <ui-button kind="">Button</ui-button>

    <ui-button size="small" kind="danger">Button</ui-button>
    <ui-button size="small" kind="success">Button</ui-button>
    <ui-button size="small" kind="">Button</ui-button>

    <ui-button disabled kind="danger">Button</ui-button>

    <ui-button router-link-to="http://localhost:8090/#tab1">Link</ui-button>
  </div>

  <div class="tabs">
    <h2>Tabs</h2>
    <ui-tabs>
      <ui-tab id="0" title="Tab 1">Tab 1</ui-tab>
      <ui-tab id="1" title="Tab 2">Tab 2</ui-tab>
    </ui-tabs>
  </div>
  <div class="form">
    <h2>Form</h2>
    <ui-form>
      <template #default="{ validators }">
        <ui-input
          :validators="[validators.required, validators.length(5)]"
          name="name"
          placeholder="Введите Имя"
          label="Имя"
          value=""
          required
        />
        <ui-input
          :validators="[validators.required, validators.email]"
          name="surname"
          placeholder="Введите e-mail"
          label="e-mail"
          value=""
          required
        />

        <ui-checkbox
          name="agreement"
          :validators="[validators.required]"
          required
        >
          Согласны ли вы на обработку данных
        </ui-checkbox>

        <ui-checkbox-btn>asdasdads </ui-checkbox-btn>

        <ui-radio-btn
          name="name"
          :data="[
            {
              value: 'sd123',
              label: 'пункт 1',
              checked: false,
            },
            {
              value: 'asdasd',
              label: 'пункт 2',
              checked: true,
            },
          ]"
        ></ui-radio-btn>

        <ui-range></ui-range>

        <ui-select
          label="Страна проживания"
          :validators="[validators.required]"
          name="contry"
          placeholder="Выберите Страну"
          required
          :data="[
            {
              id: 0,
              value: 'ru',
              text: 'Russia',
              selected: false,
            },
            {
              id: 1,
              value: 'usa',
              text: 'USA',
              selected: false,
            },
            {
              id: 2,
              value: 'au',
              text: 'Australia',
              selected: false,
            },
          ]"
        >
          Select
        </ui-select>
      </template>
    </ui-form>
  </div>
  <div class="table">
    <h2>Table</h2>
    <ui-table />
  </div>
</template>


<style lang="scss" scoped>
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
