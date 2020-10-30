<template lang="pug">
q-page
  section.content.flex.flex-center
    .row.q-col-gutter-md
      .col-12.col-sm-6
        q-card
          q-card-section.text-center
            img.q-mt-lg(src='~assets/logo-title.png')
            p.text-subtitle2.q-mt-lg A handsfree creative coding platform.<br>Build apps, make art, create bots, and more!
            p.text-subtitle1 beta coming on 11/8
            p
              small (but feel free to explore anyways)
            p
              small <a href="https://github.com/midiblocks/midiblocks">GitHub</a> &middot; <a href="https://twitter.com/midiblocks">Twitter</a> &middot; <a href="https://www.youtube.com/channel/UCDzb8yXGOm6ZYd0Jf_FYKWA">YouTube</a>
      .col-12.col-sm-6
        q-card
          q-card-section.text-center
            q-video(:ratio='16/9' src='//www.youtube.com/embed/bcDOv09-5RI')
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
