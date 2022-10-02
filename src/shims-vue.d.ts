declare module "*.vue" {
    import { defineComponent } from "vue";
    const Component: ReturnType<typeof defineComponent>;
    export default Component;
}

declare module 'jsonwebtoken';
declare module 'lodash';
declare module 'bcrypt';
declare module 'v-click-outside';