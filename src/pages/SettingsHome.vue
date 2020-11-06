<template lang="pug">
q-page.full-height
  section.content
    h1 Settings

    .row.q-col-gutter-lg
      .col-12.col-md-6
        q-card.q-mb-lg
          q-card-section
            h2 Calibrate
            q-video(:ratio='16/9' src='https://www.youtube.com/embed/LihLtc0nmzk')
          q-card-section
            p Use the button below to active the Calibrator. Try and hold your pose such that your head is pointed towards the inner circle. Once calibration is complete, the Calibrator will disappear and you'll be good to go!
          q-card-actions
            q-space
            q-btn.bg-secondary(@click='calibrate') Start calibration

      .col-12.col-md-6
        q-card.q-mb-lg
          q-card-section
            h2 Misc
            q-toggle(color='positive' v-model='settings.isStatsVisible' label='Display performance monitor?')
</template>

<script>
import {mapState} from 'vuex'
import store from 'store'
import {set} from 'lodash'

export default {
  name: 'SettingsHome',

  computed: {
    ...mapState(['settings'])
  },

  mounted () {
    set(window, 'app.$page', this)
    document.addEventListener('handsfree-handsfreeCalibrationEnded', this.saveCalibration)
  },
  
  beforeDestroy () {
    document.removeEventListener('handsfree-handsfreeCalibrationEnded', this.saveCalibration)
  },

  watch: {
    settings: {
      deep: true,
      handler (settings) {
        store.set('settings.isStatsVisible', settings.isStatsVisible)
      }
    }
  },

  methods: {
    /**
     * Starts calibration
     * - Automatically starts Handsfree.js if not started
     */
    calibrate () {
      if (!this.$handsfree.isLooping) {
        this.$store.dispatch('toggleHandsfree', () => {
          this.$handsfree.weboji.calibrate()
        })
      } else {
        this.$handsfree.weboji.calibrate()
      }
    },

    onModelLoaded () {
      console.log('modelLoaded')
      this.$handsfree.weboji.calibrate()
    },

    /**
     * Saves the calibration setting
     */
    saveCalibration () {
      store.set('handsfree.calibration', this.$handsfree.plugin.facePointer.config)
    }
  }
}
</script>