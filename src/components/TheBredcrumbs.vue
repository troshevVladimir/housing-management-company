<template>
  <div class="bredcrumbs">
    <div class="container">
      <div class="row">
        <div class="col-d-12 col-t-8 col-m-4">
          <ul class="bread-crumbs">
            <li
              property="itemListElement"
              typeof="ListItem"
              class="bread-crumb"
            >
              <NuxtLink property="item" typeof="WebPage" to="/" exact>
                <span property="name">Главная</span>
              </NuxtLink>
              <meta property="position" content="1" />
            </li>
            <li
              v-for="(crumb, index) in crumbs"
              :key="index"
              class="bread-crumb"
              property="itemListElement"
              typeof="ListItem"
            >
              <NuxtLink property="item" typeof="WebPage" :to="crumb.path" exact>
                <span property="name">{{
                  $route.fullPath === crumb.path && title !== null
                    ? title
                    : crumb.title
                }}</span>
              </NuxtLink>
              <meta property="position" :content="index + 2" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      links: []
    }
  },
  computed: {
    crumbs() {
      const fullPath = this.$route.fullPath
      const params = fullPath.startsWith('/')
        ? fullPath.substring(1).split('/')
        : fullPath.split('/')
      const crumbs = []
      let path = ''
      params.forEach((param, index) => {
        path = `${path}/${param}`
        const match = this.$router.match(path)
        if (match.name !== null) {
          crumbs.push({
            title: params[index],
            ...match,
          })
        }
      })
      return crumbs
    },
  },

}
</script>

<style lang="scss">
  .bread-crumbs {
    margin-top: 144px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;

    .bread-crumb {
      margin-left: 12px;
      display: flex;

      a {
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #858585;
      }

      .nuxt-link-active {
        color: #000;
      }

      &::after {
        margin-left: 12px;
        content: '/';
        display: block;
      }
    }
  }
</style>