<template lang="pug">
div#left-side-menu.position-fixed.top-0.h-100(:class="{ 'open-mobile-menu': openMenu }")
  div.h-100.bg-cover(:style="{ backgroundImage: backgroundImage}" :class="menuClass")
    div.h-100.position-absolute(style="width:10px;right:-5px" :style="{ 'cursor': miniMenu?'e-resize':'w-resize' }" @click="miniMenuFunction" )
    div.pt-4.overflow-hidden(style="background-size:120%;")
      div.pl-4.pb-4
        slot(name="logo")
          p Logo Here
      div(:class="miniMenu ? 'pl-3': 'pl-4'")
        slot(name="user-avatar")
          p User Avatar Here
      div.wrap.menu-wrap.position-.mb-4()
        slot(name="menu")
          div.bg-secondary.position-absolute.menu-cursor(style="width: 5px;transition: 0.6s cubic-bezier(0.65, 1.5, 0.6, 0.95);right:0px" :style="{ top: `${cursorPosition  }px`, height: `${activeMenuHeight}px`,}")
          ul.list-unstyled.mb-0.pl-4
            li.left-side-menu-links(v-for="(menu, index) in accountMenus" :key="index" :style="{ 'padding-left': menu.indent, 'padding-top':menu.paddingTop, 'height': menu.isHeading || !menu.visible ? 'auto':'42px' }")
              h6.mb-2.text-truncate.font-weight-bolder.text-secondary.mt-5(v-if="menu.isHeading") {{menu.title}}
              b-collapse(v-else :visible="menu.visible")
                router-link.w-100.text-left.menu-link.d-flex.py-2( :to="menu.link" :class="{ 'py-3': menu.isHeading }")
                  eva-icon.mr-2(:name="menu.icon" animation="pulse" fill="limegreen" width="15")
                  span.text-truncate(v-if="menu.title") {{menu.title}}
                  div(v-else style="wdth:20px;height:20px")
                    b-spinner(small)
      div.wrap.menu-wrap.position-absolute.bottom-0.p-4.w-100()
        slot(name="footer")
          small.text-white-50 Copyright @ Regal tours
  div#left-side-menu-overlay.mobile-menu-overlay.w-100.h-100.position-fixed(style="top: 0; left: 0; z-index: -1;" @click="closeFunction")
</template>

<script>
export default {
  data() {
    return {
      mounted: false,
      cursorIndex: 0,
      cursorPosition: 0,
      show: false,
      collapseState: "w-resize"
    };
  },
  props: {
    menuClass: {
      type: String,
      default: ""
    },
    openMenu: {
      type: Boolean,
      default: null
    },
    miniMenu: {
      type: Boolean,
      default: null
    },
    miniMenuFunction: {
      type: Function,
      default: null
    },
    closeFunction: {
      type: Function,
      default: null
    },
    backgroundImage: {
      type: String,
      default: null
    },
    accountMenus: {
      type: Array,
      required: true,
      default: () => {
        return {};
      }
    }
  },
  mounted() {
    this.mounted = true;
    // const mainLink = this.$route.fullPath.split("/");
    this.accountMenus.forEach((menu, index) => {
      if (menu.name == this.$route.name) {
        const actiiveMenuElement = document
          .querySelectorAll(".left-side-menu-links")
          [index].getBoundingClientRect();
        const top = actiiveMenuElement.top;
        this.cursorPosition = top;
        this.cursorIndex = index;
      }
    });
  },
  computed: {
    activeMenuHeight() {
      if (this.mounted) {
        const menus = document.querySelectorAll(".left-side-menu-links");
        if (menus.length !== 0) return menus[this.cursorIndex].clientHeight;
      }
      return 42;
    }
  },
  watch: {
    $route(to) {
      this.accountMenus.forEach((menu, index) => {
        if (to.name == menu.name) {
          const actiiveMenuElement = document
            .querySelectorAll(".left-side-menu-links")
            [index].getBoundingClientRect();
          const top = actiiveMenuElement.top;
          this.cursorPosition = top;
          this.cursorIndex = index;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.open-mobile-menu {
  &#left-side-menu {
    left: 0;
  }
}

.left-side-menu-links span:not(.spinner-border):not(.b-avatar) {
  width: inherit;
  transition: all 0.3s ease-in-out;
}
#main-app {
  transition: all 0.3s ease-in-out;
}

#left-side-menu {
  z-index: 1090;
  left: -310px;
  width: 310px;
  transition: all 0.3s ease-in-out;
  .btn.active {
    color: var(--secondary);
  }

  // box-shadow: inset -5px -5px 7px 5px rgba(247, 251, 255, 0.6);
  .nav-link {
    color: var(--light);
    border-radius: 0;
    width: 100%;

    &:hover {
      color: var(--white);
    }
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) {
  #main-app {
    width: 100%;
  }
  #left-side-menu {
    left: -310px;
    width: 310px;
  }
}

/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media only screen and (min-width: 768px) {
  #main-app {
    width: 100%;
  }
  #left-side-menu {
    left: -310px;
    width: 310px;
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  #main-app {
    width: calc(100% - 200px);
    left: 200px;
    // padding-right: 50px;
  }
  .mini-left-side-menu {
    #main-app {
      width: calc(100% - 75px);
      left: 75px;
    }
  }
  #left-side-menu {
    width: 200px;
    left: 0px;
    top: 0;
    z-index: 9;
  }

  .mini-left-side-menu {
    #left-side-menu {
      width: 75px;
      left: 0px;
      top: 0;
      z-index: 9;
    }
    .left-side-menu-links span:not(.spinner-border):not(.b-avatar) {
      width: 0px;
    }
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  #main-app {
    width: calc(100% - 250px);
    left: 250px;
  }
  .mini-left-side-menu {
    #main-app {
      width: calc(100% - 75px);
      left: 75px;
    }
  }
  #left-side-menu {
    width: 250px;
    left: 0px;
    top: 0;
    z-index: 9;
  }

  .mini-left-side-menu {
    #left-side-menu {
      width: 75px;
      left: 0px;
      top: 0;
      z-index: 9;
    }
  }
}

.mobile-menu-overlay {
  transition: all 0.3s ease;
  display: none;
  opacity: 0;
  background-color: rgba($color: #000000, $alpha: 0.6);
}

.open-mobile-menu {
  #left-side-menu-overlay {
    display: block;
    opacity: 1;
  }
}

#left-side-menu {
  .btn:not(.exempt) {
    border-radius: 0px;
    // border: none;
  }
}

#avatar-holder > button {
  padding: 0px;
}

.menu-dot {
  opacity: 0;
}

.menu-link {
  color: #e7e7e7;
  // filter: grayscale(1);

  &:hover {
    color: var(--secondary);
  }

  &.router-link-active {
    filter: grayscale(0.7);
    background-image: linear-gradient(45deg, #dedede00, #dcdcdc40);
  }
  &.router-link-exact-active {
    &.menu-dot {
      opacity: 1;
    }
    color: var(--secondary);
    filter: unset;
  }
}
</style>
