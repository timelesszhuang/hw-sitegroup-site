<template>
  <Tabs value="newsarticle"  @on-click="getdata">
    <Tab-pane label="163新闻" name="newsarticle" >
      <Newsarticle></Newsarticle>
    </Tab-pane>
    <Tab-pane label="腾讯新闻" name="qqarticle">
      <Qqarticle ref="qqwenzhang" ></Qqarticle>
    </Tab-pane>
    <Tab-pane label="最新新闻" name="hotnews">
      <Hotnews ref="newswenzhang"></Hotnews>
    </Tab-pane>
  </Tabs>
</template>
<script>
  import http from '../../../assets/js/http.js'
  import Newsarticle from '../163article/index.vue'
  import Qqarticle   from '../qqarticle/index.vue'
  import Hotnews   from '../hotnews/hotnews.vue'
  export default {
    components: {Newsarticle, Qqarticle,Hotnews},
    methods: {
      getdata(name) {
        if (name == "qqarticle") {
          this.$refs.qqwenzhang.getData()
        } else if (name == "hotnews") {
          this.$refs.newswenzhang.getData()
        }
      }
    },
    mixins: [http]
  }
</script>
