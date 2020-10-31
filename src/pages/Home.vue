<template lang="pug">
q-page
  section.content.flex.flex-center
    .row.q-col-gutter-lg
      .col-12.col-sm-6
        q-card
          q-card-section.text-center
            img.q-mt-lg.max-width-100(src='~assets/logo-title.png')
            p.text-subtitle2.q-mt-lg A platform for <span class="text-negative">doing</span> things <span class="text-info">handsfree</span>
            div.text-subtitle1 
              strong 📅 This project is a work in progress.
              div Please check back on around <span class="text-negative">11/8</span> for beta!
          
          q-card-section
            q-card.bg-inactive
              q-card-section
                p
                ul.text-left.text-subtitle2
                  li Map <span class="text-info">face gestures</span> to the <span class="text-negative">mouse</span> and <span class="text-negative">keyboard</span>
                  li Play <span class="text-negative">Steam games</span> and more <span class="text-info">handsfree</span>
                  li Create <span class="text-info">gesture-driven automations</span> for <span class="text-negative">desktop</span>, <span class="text-negative">devices</span>, <span class="text-negative">robots</span>, and <span class="text-negative">more</span>
                  li <span class="text-info">Voice</span>, <span class="text-info">hand tracking</span>, <span class="text-info">pose estimation</span>, and <span class="text-info">mind control</span> coming soon!

          q-card-section
            p.text-center
              small <a href="https://github.com/midiblocks/midiblocks">GitHub</a> &middot; <a href="https://twitter.com/midiblocks">Twitter</a> &middot; <a href="https://www.youtube.com/channel/UCDzb8yXGOm6ZYd0Jf_FYKWA">YouTube</a> &middot; <a href="https://www.reddit.com/r/SideProject/comments/jipnqe/midiblocks_a_web_based_handsfree_visual_coding/">About</a>
      .col-12.col-sm-6
        q-card
          q-card-section.text-subtitle1
            p <span class="text-negative">Midiblocks</span> are little apps that help you do different things with <span class="text-info">gestures</span>. By default, you get a <span class="text-negative">Face Pointer</span> that you can control with <span class="text-info">your face </span> <small>(and soon other methods too)</small>.
            p But that's just to get you started! You can add more functionality with the handsfree visual code in the <router-link :to='{name: "Studio"}'>Midiblocks Studio</router-link>.
            //- q-video(:ratio='16/9' src='//www.youtube.com/embed/8FQGv_j_lZo')
            q-video(:ratio='16/9' src='//www.youtube.com/embed/bcDOv09-5RI')

  section.content.q-mt-xl
    .row.q-col-gutter-lg.justify-center
      .col-12.col-sm-6
        q-card
          q-card-section.text-subtitle1
            h2 Face Pointers
            p A <span class="text-negative">Face Pointer</span> is a pointer that is controlled with <span class="text-info">head movements</span> and <span class="text-info">face gestures</span> through a <span class="text-negative">webcam</span>. By default, the <span class="text-negative">Face Pointer</span> that comes with <span class="text-negative">Midiblocks</span> has the following features:
            ul.tight
              li (<span class="text-negative">Web only</span>) <span class="text-info">Move</span> the <span class="text-negative">Face Pointer</span> above or below a scroll area to scroll in that direction (see below)
              li <span class="text-negative">Click</span> by <span class="text-info">smiling</span> or <span class="text-info">smirking to either side</span>
            p <span class="text-negative">Midiblocks </span> <span class="text-info">Face Pointer</span> is powered by our gesture library, <router-link :to='{name: "DocsHandsfreeLanding"}'>Handsfree.js</router-link>
            q-img(:ratio='16/9' src='https://media0.giphy.com/media/Iv2aSMS0QTy2P5JNCX/giphy.gif')
</template>

<script>
import {set} from 'lodash'

export default {
  name: 'PageHome',

  mounted () {
    set(window, 'app.$page', this)
  }
}
</script>
