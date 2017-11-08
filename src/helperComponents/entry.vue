<template>
   <div id='entry'>
      <div class="entry-content" v-if="loaded">
            <slot name="entry-slot"></slot>
      </div>
   </div>
</template>

<script>

export default {
   name: 'entry',
   data () {
      return {
            loaded: false
      }
   },
   created() {
      document.onreadystatechange = () => {  
            if (document.readyState === "complete") {
                  this.loaded = !this.loaded;
            }
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
   width: 100%;
   height: 100%;
   padding: 80px 130px;
   z-index: 3;
   overflow: hidden;
   display: flex;
   align-items: center;
   justify-content: center;
   @include transition(all 1s ease);

   &:before{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: rgba(255,255,255,0.9) url('../assets/imgs/umbrella.jpg') no-repeat center center / cover;

      @include animation(entry-b4,0.5s cubic-bezier(0.3,-0.3,0,1.3) forwards);

            @include keyframes (entry-b4) {
                  100%{ @include filter(blur(1px) grayscale(0.3)); }
            }
   }

   & .entry-content {
      @include border(20px solid #f5f5f5);
      width: 0%;
      height: 0%;
      display: flex;
      align-items: center;
      justify-content: center;
      @include box-shadow(0px 1px 6px 0px #000);
      @include animation(entry,1.5s ease forwards 1s);
      @include opacity(0);

      & > h1{
            font-size: 10em;
            font-family: sans-serif,Arial;
            color: #f5f5f5;
            text-align: center;
            margin: 0 auto;
            @include filter(drop-shadow(0 0 4px rgba(0,0,0,0.8)));
            @include opacity(0);

            @include animation(entry-cont,1s cubic-bezier(0.3,-0.3,0,1.3) forwards 3s);

            @include keyframes (entry-cont) {
                  0%{ @include generic-transform( perspective(500px) rotate3d(-1,0,0,90deg) translate(0,100%) ); @include opacity(0);}
                  100%{ @include generic-transform(perspective(500px) rotate3d(0,0,0,0deg) translate(0,0)); @include opacity(1);}
            }
      }
   }

}
      // ============================
      .entry-component-enter-active{
            @include animation(entry,1.5s ease forwards 0.7s);
      }
      .entry-component-enter, .entry-component-leave-to {
            @include opacity(0);
      }
      .entry-component-leave-active{
            @include animation(entry,1.5s ease forwards reverse);
      }

      @include keyframes (entry) {
            0%{width:2px; height: 2px; @include translate(0,-5px); @include opacity(0);}
            5%{width:5px; height: 5px; @include translate(0,-3px); @include opacity(1);}
            50%{width:100%; height: 5px; @include translate(0,0); @include opacity(1);}
            100%{width:100%; height: 100%; @include translate(0,0); @include opacity(1);}
      }


</style>