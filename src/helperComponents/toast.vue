<template>
  <transition :name="pos" mode="out-in">
    <div :class="mr" v-if="show" key="pos">
        <p><slot></slot></p>
    </div>
  </transition>
</template>

<script>
export default {
   name: 'my-toast',
   props: {
      position: { 
         type: String,
         default: 'top-center'
       },
       fontSize:{
          type: String,
          default: '1em'
       },
       time: {
          type: String,
          default: '7000'
       },
       success: {
         type: Boolean,
         default: false
       },
       warning: {
         type: Boolean,
         default: false
       },
       danger: {
         type: Boolean,
         default: false
       },
       info: {
         type: Boolean,
         default: false
       }


   },
   data () {
      return {
         mr: 'my-toast-'+(Math.random()*3).toString().slice(2,8),
         pos: '',
         dur: Number(this.time),
         show: true
      }
   },
   mounted () {

      this.$el.style.fontSize = this.fontSize;

      if (this.position == 'top-left') {
         this.pos = 'left-in';
         this.$el.style.alignSelf = 'flex-start';
         this.$el.style.top = '20px';
         this.$el.style.left = '20px';

         setTimeout( () => {
          this.show = !this.show;
         }, Number(this.time));

      }else if (this.position == 'top-right') {
         this.pos = 'right-in';
         this.$el.style.alignSelf = 'flex-end';
         this.$el.style.top = '20px';
         this.$el.style.right = '20px';
        //  if (!this.$el.classList.contains('right-in-enter-active')) {
        //        this.$el.classList.remove('right-out-enter-active');
        //        this.$el.classList.add('right-in-enter-active');
        //     }
            // else{
            //   this.$el.classList.remove('right-in-enter-active');
            //    this.$el.classList.add('right-out-enter-active');
            // }
         setTimeout( () => {
          //  this.pos = 'right-out';
          //  this.$el.className = 'my-toast-'+(Math.random()*3).toString().slice(2,8);
           this.show = !this.show;
            // if (!this.$el.classList.contains('right-out-enter-active')) {
            //    this.$el.classList.remove('right-in-enter-active');
            //    this.$el.classList.add('right-out-enter-active');
            // }
            // else{
            //    this.$el.classList.remove('right-out-enter-active');
            //    this.$el.classList.add('right-in-enter-active');
            // }
         }, Number(this.time));
      }else if (this.position == 'bottom-center') {
         this.pos = 'bottom-center-in';
         this.$el.style.alignSelf = 'center';
         this.$el.style.bottom = '20px';

         setTimeout( () => {
          this.show = !this.show;
         }, Number(this.time));

      } else if (this.position == 'bottom-left') {
         this.pos = 'left-in';
         this.$el.style.alignSelf = 'flex-start';
         this.$el.style.bottom = '20px';
         this.$el.style.left = '20px';
        //  if (!this.$el.classList.contains('left-in-enter-active')) {
        //        this.$el.classList.remove('left-out-enter-active');
        //        this.$el.classList.add('left-in-enter-active');
        //     }
            // else{
            //    this.$el.classList.remove('left-in-enter-active');
            //    this.$el.classList.add('left-out-enter-active');
            // }
         setTimeout( () => {
          //  this.pos = 'left-out';
          //  this.$el.className = 'my-toast-'+(Math.random()*3).toString().slice(2,8);
          this.show = !this.show;
            // if (!this.$el.classList.contains('left-out-enter-active')) {
            //    this.$el.classList.remove('left-in-enter-active');
            //    this.$el.classList.add('left-out-enter-active');
            // }
            // else{
            //    this.$el.classList.remove('left-out-enter-active');
            //    this.$el.classList.add('left-in-enter-active');
            // }
         }, Number(this.time));
      } else if (this.position == 'bottom-right') {
         this.pos = 'right-in';
         this.$el.style.alignSelf = 'flex-end';
         this.$el.style.bottom = '20px';
         this.$el.style.right = '20px';

         setTimeout( () => {
          this.show = !this.show;
         }, Number(this.time));

      } else {
         this.pos = 'top-center-in';
         this.$el.style.alignSelf = 'center';
         this.$el.style.top = '20px';

         setTimeout( () => {
          this.show = !this.show;
         }, Number(this.time));

      }
      // =======================================

      if (this.success) {
         this.$el.style.background = 'rgba(50, 205, 50,1)'; // limegreen
      }else if (this.warning) {
         this.$el.style.background = 'rgba(255, 140, 0,1)'; // darkorange
      }else if (this.danger) {
         this.$el.style.background = 'rgba(220, 20, 60,1)'; // crimson
      }else if (this.info) {
         this.$el.style.background = 'rgba(65, 105, 225,1)'; // royalblue 
      }else{
         this.$el.style.background = 'rgba(0,0,0,0.7)'; //
      }

   }
}
</script>

<style lang='scss' scoped>
@import "../assets/styles/variables";
@import "../assets/styles/mixins";

[id^=my-toast],[class^=my-toast]{
   min-height: 25px;
   display: flex;
   justify-content: center;
   align-items: center;
   align-self: center;
   flex: 0 0 30%;
   flex-wrap: wrap;
   flex-direction: column;
   position: fixed;
   color: #fff;
   padding: 5px 15px;
   z-index: 5;
   background: rgba(0, 0, 0, 0.7);
   @include border-radius(50px);
   @include box-shadow(0 0 3px 0px rgba(0,0,0,0.7));
   animation-delay: 4s;
  //  @include opacity(0);

  @include animation(init,1s cubic-bezier(0.68,-0.55,.27,1.55) forwards);

   @include keyframes (init) {
         from { @include scale(0); @include opacity(0); }
         to { @include scale(1); @include opacity(1); }
      }

   // ====================== top-center
   &.top-center-in-enter-active{
      @include animation(top-center-in,1s cubic-bezier(0.68,-0.55,.27,1.55) forwards);
   }
   &.top-center-in-leave-active{
      @include animation(top-center-out,1s cubic-bezier(0.68,-0.55,.27,1.55) forwards);
   }

   @include keyframes (top-center-in) {
         from { @include translate(0,-100vh); @include opacity(0); }
         to { @include translate(0,0); @include opacity(1); }
      }

      @include keyframes (top-center-out) {
         from { @include translate(0,0); @include opacity(1); }
         to { @include translate(0,-100vh); @include opacity(0); }
      }
   // ====================== left
   &.left-in-enter-active{
      @include animation(left-in,1s cubic-bezier(0.68,-0.55,.27,1.55) forwards);
   }
   &.left-in-leave-active{
      @include animation(left-out,1s cubic-bezier(0.68,-0.55,.27,1.55) forwards);
   }

      @include keyframes (left-in) {
         from { @include translate(-100vw,0); @include opacity(0); }
         to { @include translate(0,0); @include opacity(1); }
      }

      @include keyframes (left-out) {
         from { @include translate(0,0); @include opacity(1); }
         to { @include translate(-100vw,0); @include opacity(0); }
      }
   // ====================== right
   &.right-in-enter-active{
      @include animation(right-in,1s cubic-bezier(0.68,-0.55,.27,1.55) forwards);
   }

   &.right-in-leave-active{
      @include animation(right-out,1s cubic-bezier(0.68,-0.55,.27,1.55) forwards);
   }

   @include keyframes (right-in) {
        from { @include translate(-100vw,0); @include opacity(0); }
        to { @include translate(0,0); @include opacity(1); }
    }

      @include keyframes (right-out) {
         from { @include translate(0,0); @include opacity(1); }
         to { @include translate(100vw,0); @include opacity(0); }
      }
   // ====================== bottom-center
   &.bottom-center-in-enter-active{
      @include animation(bottom-center-in,1s cubic-bezier(0.68,-0.55,.27,1.55) forwards);
   }

   &.bottom-center-in-leave-active{
      @include animation(bottom-center-out,1s cubic-bezier(0.68,-0.55,.27,1.55) forwards);
   }

   @include keyframes (bottom-center-in) {
         from { @include translate(0,100vh); @include opacity(0); }
         to { @include translate(0,0); @include opacity(1); }
      }

      @include keyframes (bottom-center-out) {
         from { @include translate(0,0); @include opacity(1); }
         to { @include translate(0,100vh); @include opacity(0); }
      }

   // =================================

   & > *{
      margin: 0 auto;
      text-align: center;
      white-space: pre;
   }

}
</style>