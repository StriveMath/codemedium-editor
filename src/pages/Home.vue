<template lang="pug">
q-page
  section.content.flex.flex-center
    .row.q-col-gutter-md
      .col-12.col-sm-6
        q-card
          q-card-section.text-center
            img.q-mt-lg.max-width-100(src='~assets/logo-title.png')
            p.text-subtitle2.q-mt-lg.text-info A platform for doing things handsfree
            div.text-subtitle1 
              strong check back
              span  on around <span class="text-negative">11/8</span> for beta!
          
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
            p.q-mt-lg <span class="text-negative">Midiblocks</span> are little apps that help you do different things with <span class="text-info">gestures</span>. By default, you get a <span class="text-negative">Face Pointer</span> that you can control with <span class="text-info">your face</span>.
            p <small>(and soon other methods too)</small>
            q-video(:ratio='16/9' src='//www.youtube.com/embed/8FQGv_j_lZo')
            //- q-video(:ratio='16/9' src='//www.youtube.com/embed/bcDOv09-5RI')
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
