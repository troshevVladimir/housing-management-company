import UIButton from './index.vue';

export default {
  title: 'UIButton',
  component: UIButton,
  // args: {
  //   kind: 'secondary',
  // },
  argTypes: {
    kind: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
    size: {
      options: ['small', 'default'],
      control: { type: 'radio' },
    },
    external: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
  parameters: {
    backgrounds: {
      values: [
        { name: 'main', value: '#eee' },
        { name: 'dark', value: '#523737' },
      ],
    },
  },
  decorators: [() => ({ template: '<div style="display: flex;"><story /><span>Текст рядом с кнопкой</span></div>' })],
};

const Template = (args) => ({
  components: { UIButton },
  setup() {
    return { args };
  },
  template: `
  <body
    style="
    --main-color: #bb5454;
    --main-dark-color: #813838;
    --secondary-color: #9aac6b;
    --secondary-dark-color: #6a754c;
    --text-light-color: #ebebeb;
    --text-color: #111;
    --bg-color: #eee;
    --bg-dark-color: #eee;
    "
  >
    <UIButton v-bind="args"><template #before>${args.before}</template> ${args.default} <template #after>${args.after}</template></UIButton>
  </body>
  `,
});

export const Primary = Template.bind({});
Primary.args = {
  kind: 'primary',
  default: 'asdasd',
  before: '>',
  after: '&times;',
};
