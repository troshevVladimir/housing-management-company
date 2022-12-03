<template>
  <div class="content-container">
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
          <p>adfaasdasdsdf</p>
          <p>adfaasdasdsdf</p>
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

  <div class="buttons content-container">
    <h2>Buttons</h2>

    <ui-button>Primary</ui-button>
    <ui-button disabled>Disabled</ui-button>
    <ui-button kind="secondary">Secondary</ui-button>
    <ui-button kind="secondary" disabled>Disabled</ui-button>
    <hr />
    <ui-button size="small">Small</ui-button>
    <ui-button size="small" kind="secondary">Small</ui-button>
    <ui-button size="small" disabled>Small</ui-button>
    <hr />
    <ui-button router-link-to="http://localhost:8090/sadasds" external
      >Link</ui-button
    >
    <ui-button router-link-to="http://localhost:8090/sadasds" disabled
      >Link</ui-button
    >
  </div>

  <div class="tabs content-container">
    <h2>Tabs</h2>
    <ui-tabs>
      <ui-tab id="0" title="Tab 1">
        <p>adfaasdasdsdf</p>
        <p>adfaasdasdsdf</p>
        <p>adfaasdasdsdf</p>
        <p>adfaasdasdsdf</p>
      </ui-tab>
      <ui-tab id="1" title="Tab 2">Tab 2</ui-tab>
      <ui-tab id="2" title="Tab 3">
        Tab 312312312313 adfaasdasdsdf adfaasdasdsdf adfaasdasdsdf
      </ui-tab>
    </ui-tabs>
  </div>
  <div class="form content-container">
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

        <!-- <ui-checkbox
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
        <ui-file-input> </ui-file-input> -->
        <!-- <ui-data-picker></ui-data-picker> -->
        <!-- <ui-zip></ui-zip> -->
      </template>
    </ui-form>
  </div>
  <div class="content-container">
    <h2>Pagination</h2>
  </div>
  <div class="content-container">
    <h2>slider</h2>
    <slider-container>
      <slider-slide id="1"> asdasd </slider-slide>
      <slider-slide id="2"> 123123 </slider-slide>
      <slider-slide id="3"> SDADS </slider-slide>
    </slider-container>
  </div>
</template>

<script>
import SliderContainer from '@/components/SliderContainer.vue'
import SliderSlide from '@/components/SliderSlide.vue'

export default {
  components: { SliderContainer, SliderSlide },
}
</script>


<style lang="scss" scoped>
  .accordion {
    &:deep(.label) {
      font-size: 16px;
      display: flex;
      align-items: center;
      font-weight: 600;
      color: currentColor;
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
