<template>
  <div class="echarts">
    <Row>
      <Col span="12"> <engine ref="engine"></engine></Col>
      <Col span="12"> <pv ref="pv"></pv></Col>
    </Row>
  </div>
</template>
<script type="text/babel">

  import engine from './enginecount.vue';
  import pv from './pv.vue';

  export default {
    name: 'view',
    components: {
      engine,
      pv
    },
  };
</script>
