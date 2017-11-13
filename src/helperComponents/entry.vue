<template>
   <div id="entry">
      <img ref="entry_img" src="../assets/imgs/umbrella.jpg" alt="weatherUmbrella"/>
      <transition name="entry-cont" mode="out-in">
            <div class="entry-content" v-show="loaded" :notEnter="notEnter">
                  <transition name="entry-child" mode="out-in">
                        <!--<slot name="entry-slot"></slot>-->
                        <h1 v-show="loaded">Weather</h1>
                  </transition>
            </div>
      </transition>
   </div>
</template>

<script>

export default {
   name: 'entry',
   props: {
      enter: {
            type: Boolean
      }
   },
   data () {
      return {
            loaded: false
      }
   },
   computed: {
         notEnter: function () {
                  return this.enter == false ? this.loaded = false : this.loaded;
         }
   },
   mounted () {
      this.$refs.entry_img.onload = () => { 
            this.loaded = !this.loaded;
      }
   },
   
};
</script>

<style lang='scss' scoped>
@import "../assets/styles/variables";
@import "../assets/styles/mixins";

#entry{
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   width: 100vw;
   height: 100vh;
   padding: 100px 150px;
   z-index: 3;
   overflow: hidden;
   display: flex;
   align-items: center;
   justify-content: center;
   @include transition(all 1s ease);

   & img{
         position: absolute;
         top: 0;
         left: 0;
         right: 0;
         bottom: 0;
         width: 100%;
         max-width: 100%;
         height: 100%;
         background-color: rgba(255,255,255,0.9);
         @include transition(all 0.7s ease);

         @include animation(entry-img,0.5s cubic-bezier(0.3,-0.3,0,1.3) forwards);

            @include keyframes (entry-img) {
                  100%{ @include filter(blur(1px) grayscale(0.3)); }
            }
   }

   & .entry-content {
      @include border(20px solid #f5f5f5);
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      @include box-shadow(0px 1px 6px 0px #000);
      z-index: 3;

      & > h1{
            font-size: 10em;
            font-family: sans-serif,Arial;
            color: #f5f5f5;
            text-align: center;
            margin: 0 auto;
            @include filter(drop-shadow(0 0 4px rgba(0,0,0,0.8)));
            z-index: 4;

      }
   }

}

// ============================
.entry-cont-enter, .entry-cont-leave-to {
      @include opacity(0);
}
.entry-cont-enter-active{
      @include animation(entry-contnt,1.5s ease forwards);
}
.entry-cont-leave-active{
      @include animation(entry-contnt,1.5s ease forwards reverse);
}

@include keyframes (entry-contnt) {
      0%{width:2px; height: 2px; @include translate(0,-5px); @include opacity(0);}
      5%{width:5px; height: 5px; @include translate(0,-3px); @include opacity(1);}
      50%{width:100%; height: 5px; @include translate(0,0); @include opacity(1);}
      100%{width:100%; height: 100%; @include translate(0,0); @include opacity(1);}
}

// ----------------------------------------//
.entry-child-enter, .entry-child-leave-to {
      @include opacity(0);
}
.entry-child-enter-active{
      @include animation(entry-child,2s cubic-bezier(0.3,-0.3,0,1.3) forwards);
}
.entry-child-leave-active{
      @include animation(entry-child,2s cubic-bezier(0.3,-0.3,0,1.3) forwards reverse);
}

@include keyframes (entry-child) {
      0%,70%{ @include generic-transform( perspective(500px) rotate3d(-1,0,0,90deg) translate(0,100%) ); @include opacity(0);}
      100%{ @include generic-transform(perspective(500px) rotate3d(0,0,0,0deg) translate(0,0)); @include opacity(1);}
}


</style>