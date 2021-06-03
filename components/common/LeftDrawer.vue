<template class="">
  <div class="drawer">
    <transition name="slide-fade">
      <aside v-show="drawer">
        <slot name="aside"></slot>
      </aside>
    </transition>
    <main :class="{ 'border-left': drawer }">
      <nav>
        <transition name="roll-fade">
          <v-btn
            v-show="drawer"
            class="drawer"
            fab
            dark
            small
            color="blue"
            @click="drawer = !drawer"
          >
            <v-icon class="arrow-left"> mdi-arrow-left </v-icon>
          </v-btn>
        </transition>
        <transition name="roll-fade">
          <v-btn
            v-show="!drawer"
            class="drawer"
            fab
            dark
            small
            color="blue"
            @click="drawer = !drawer"
          >
            <v-icon class="menu"> mdi-menu </v-icon>
          </v-btn>
        </transition>
      </nav>
      <slot name="content"> </slot>
    </main>
  </div>
</template>
<script>
export default {
  data: () => ({
    drawer: false,
  }),
}
</script>
<style lang="scss">
.drawer main img {
  max-width: 100%;
}
</style>
<style lang="scss" scoped>
.drawer {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  min-width: 0;

  & > aside {
    width: 275px;
    padding: 30px 0;
    height: calc(100vh - 94px);
    overflow-y: auto;
    @supports (position: sticky) {
      position: sticky;
      top: 0px;
    }
  }
  & > main {
    position: relative;
    flex: 1 0 0;
    max-width: 100%;
    min-width: 0;
    padding: 30px 15px 0 15px;
    & > nav {
      position: fixed;
      top: 64px;
      transform: translateX(-15px);
      height: 42px;
      & .drawer {
        position: absolute;
        top: 5px;
        left: 20px;
      }
    }
  }
  .border-left {
    border-left: 1px solid #e0e0e0;
  }
}
.slide-fade-enter-active,
.slide-fade-leave-active,
.roll-fade-enter-active,
.roll-fade-leave-active {
  transition: all 0.3s ease-out;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-275px);
  opacity: 0;
}
.roll-fade-enter,
.roll-fade-leave-to {
  transform: rotate(180deg) scale(0.5);
  opacity: 0;
}
</style>
