import UICheckBox from './index.vue';

export default {
  title: 'UICheckBox',
  component: UICheckBox,
};

const Template = (args) => ({
  components: { UICheckBox },
  setup() {
    return { args };
  },
  template: '<UICheckBox v-bind="args"/>',
});

export const Checkbox = Template.bind({});

Checkbox.args = {
  value: true
};