<template>
   <div id="my-toast">
      <p><slot></slot></p>
   </div>
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
       },


   },
   data () {
      return {
         show: true
      }
   },
   mounted () {
      this.$el.style.fontSize = this.fontSize;

      if (this.position == 'top-left') {
         this.$el.style.alignSelf = 'flex-start';
         this.$el.style.top = '20px';
         if (!this.$el.classList.contains('left-in')) {
               this.$el.classList.remove('left-out');
               this.$el.classList.add('left-in');
            }
         setTimeout( () => {
            if (!this.$el.classList.contains('left-out')) {
               this.$el.classList.remove('left-in');
               this.$el.classList.add('left-out');
            }
         }, Number(this.time));
      }else if (this.position == 'top-right') {
         this.$el.style.alignSelf = 'flex-end';
         this.$el.style.top = '20px';
         if (!this.$el.classList.contains('right-in')) {
               this.$el.classList.remove('right-out');
               this.$el.classList.add('right-in');
            }
         setTimeout( () => {
            if (!this.$el.classList.contains('right-out')) {
               this.$el.classList.remove('right-in');
               this.$el.classList.add('right-out');
            }
         }, Number(this.time));
      }else if (this.position == 'bottom-center') {
         this.$el.style.alignSelf = 'center';
         this.$el.style.bottom = '20px';
         if (!this.$el.classList.contains('bottom-center-in')) {
               this.$el.classList.remove('bottom-center-out');
               this.$el.classList.add('bottom-center-in');
            }
         setTimeout( () => {
            if (!this.$el.classList.contains('bottom-center-out')) {
               this.$el.classList.remove('bottom-center-in');
               this.$el.classList.add('bottom-center-out');
            }
         }, Number(this.time));
      } else if (this.position == 'bottom-left') {
         this.$el.style.alignSelf = 'flex-start';
         this.$el.style.bottom = '20px';
         if (!this.$el.classList.contains('left-in')) {
               this.$el.classList.remove('left-out');
               this.$el.classList.add('left-in');
            }
         setTimeout( () => {
            if (!this.$el.classList.contains('left-out')) {
               this.$el.classList.remove('left-in');
               this.$el.classList.add('left-out');
            }
         }, Number(this.time));
      } else if (this.position == 'bottom-right') {
         this.$el.style.alignSelf = 'flex-end';
         this.$el.style.bottom = '20px';
         if (!this.$el.classList.contains('right-in')) {
               this.$el.classList.remove('right-out');
               this.$el.classList.add('right-in');
            }
         setTimeout( () => {
            if (!this.$el.classList.contains('right-out')) {
               this.$el.classList.remove('right-in');
               this.$el.classList.add('right-out');
            }
         }, Number(this.time));
      } else {
         this.$el.style.alignSelf = 'center';
         this.$el.style.top = '20px';
         if (!this.$el.classList.contains('top-center-in')) {
               this.$el.classList.remove('top-center-out');
               this.$el.classList.add('top-center-in');
            }
         setTimeout( () => {
            if (!this.$el.classList.contains('top-center-out')) {
               this.$el.classList.remove('top-center-in');
               this.$el.classList.add('top-center-out');
            }
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

#my-toast{
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

   // ====================== top-center
   &.top-center-in{
      @include animation(top-center-in,1s cubic-bezier(0.68,-0.55,.27,1.55) forwards);

      @include keyframes (top-center-in) {
         from { @include translate(0,-100vh); @include opacity(0); }
         to { @include translate(0,0); @include opacity(1); }
      }
   }

   &.top-center-out {
      @include animation(top-center-out,1s cubic-bezier(0.68,-0.55,.27,1.55) forwards);

      @include keyframes (top-center-out) {
         from { @include translate(0,0); @include opacity(1); }
         to { @include translate(0,-100vh); @include opacity(0); }
      }
   }
   // ====================== left
   &.left-in{
      @include animation(left-in,1s cubic-bezier(0.68,-0.55,.27,1.55) forwards);

      @include keyframes (left-in) {
         from { @include translate(-100vw,0); @include opacity(0); }
         to { @include translate(0,0); @include opacity(1); }
      }
   }

   &.left-out {
      @include animation(left-out,1s cubic-bezier(0.68,-0.55,.27,1.55) forwards);

      @include keyframes (left-out) {
         from { @include translate(0,0); @include opacity(1); }
         to { @include translate(-100vw,0); @include opacity(0); }
      }
   }
   // ====================== right
   &.right-in{
      @include animation(right-in,1s cubic-bezier(0.68,-0.55,.27,1.55) forwards);

      @include keyframes (right-in) {
         from { @include translate(100vw,0); @include opacity(0); }
         to { @include translate(0,0); @include opacity(1); }
      }
   }

   &.right-out {
      @include animation(right-out,1s cubic-bezier(0.68,-0.55,.27,1.55) forwards);

      @include keyframes (right-out) {
         from { @include translate(0,0); @include opacity(1); }
         to { @include translate(100vw,0); @include opacity(0); }
      }
   }
   // ====================== bottom-center
   &.bottom-center-in{
      @include animation(bottom-center-in,1s cubic-bezier(0.68,-0.55,.27,1.55) forwards);

      @include keyframes (bottom-center-in) {
         from { @include translate(0,100vh); @include opacity(0); }
         to { @include translate(0,0); @include opacity(1); }
      }
   }

   &.bottom-center-out {
      @include animation(bottom-center-out,1s cubic-bezier(0.68,-0.55,.27,1.55) forwards);

      @include keyframes (bottom-center-out) {
         from { @include translate(0,0); @include opacity(1); }
         to { @include translate(0,100vh); @include opacity(0); }
      }
   }

   // =================================

   & > *{
      margin: 0 auto;
      text-align: center;
   }

}
</style>