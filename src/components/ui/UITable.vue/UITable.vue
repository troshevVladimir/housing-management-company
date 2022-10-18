<script>
import UITableHeader from './TableHeader.vue'
import { h } from 'vue'

const tr = h('tr', {}, [])

const tbody = h('tbody', {}, tr)

export default {
  components: {
    UITableHeader,
  },
  render() {
    return h('table', {}, [h(UITableHeader), tbody])
  },
}
</script>
