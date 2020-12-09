<template lang="pug">
b-container.private-layout.px-0.position-absolute.w-100.bg-blue-grey(fluid)
    LeftSideMenu(:accountMenus="accountMenus" :openMenu="false" :miniMenu="false" menuClass="bg-dark" :backgroundImage=" `url(${null})`" :closeFunction="()=>{}" :miniMenuFunction="()=>{}")
      template(v-slot:user-avatar)
        H1 Hello
    main#main-app.position-relative
        div.wrap-theapp(style="min-height:100vh")
            slot
</template>

<script>
import LeftSideMenu from "@/components/navs/LeftSideMenu";

export default {
  data() {
    return {
      accountMenus: []
    };
  },
  components: { LeftSideMenu }
};
</script>
