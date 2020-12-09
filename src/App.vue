<template lang="pug">
component(:is="layout" )
    router-view
</template>

<script>
export default {
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>

<style lang="scss"></style>
