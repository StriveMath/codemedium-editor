<template lang="pug">
q-page
  //- Hero
  section.content.flex.flex-center
    .row.q-col-gutter-lg
      .col-12.col-md-6
        q-card
          q-card-section.text-center
            q-img.q-mb-md(:ratio='16/9' src='https://media0.giphy.com/media/YATR9GZSSHKeNw3fht/giphy.gif')
            p 🔔 <span class='text-ansi-bright-green'>This is still a prototype</span> 🔔
            p.text-subtitle1.text-left Map <span class='text-info'>Face Gestures</span> to a <span class='text-negative'>Mouse</span>, <span class='text-negative'>Keyboard</span>, <span class='text-negative'>Game Controller</span>, and <span class='text-negative'>more</span> and use your desktop and devices handsfree!
            div.q-mt-sm.text-center
              small <a href="https://github.com/midiblocks/midiblocks">GitHub</a> &middot; <a href="https://twitter.com/midiblocks">Twitter</a> &middot; <a href="https://www.youtube.com/channel/UCDzb8yXGOm6ZYd0Jf_FYKWA">YouTube</a> &middot; <a href="https://www.reddit.com/r/SideProject/comments/jipnqe/midiblocks_a_web_based_handsfree_visual_coding/">About</a>

      .col-12.col-md-6
        q-card
          q-card-section
            div(style='height: 250px')
              Workspace.full-height(ref='workspace' :toolbox='toolbox' :autoload='workspaces.simpleDemo' :blocks='[]' :options='workspaces.options' @change='workspaceEventHandler')
          q-card-section.text-subtitle1
            div <span class='text-negative'>Midiblocks</span> are groups of blocks that <span class='text-ansi-bright-green'>react</span> to <span class='text-info'>face gestures</span>. When you snap together the two blocks above, they form a <span class='text-negative'>Midiblock</span> that shows a "<span class='text-ansi-bright-green'>🔔 Hello World!</span>" message when you do the <span class='text-info'>selected gesture</span>.
          q-card-actions
            q-btn.bg-negative.full-width(v-if='settings.isFacePointerActive' @click='$store.dispatch("toggleHandsfree")') Stop webcam
            q-btn.bg-secondary.full-width(v-else @click='$store.dispatch("toggleHandsfree")') Try it! Enable Webcam and Go Handsfree
          div.text-center.q-pb-sm
            small <span class='text-info'>Gesture recognition</span> happens <span class='text-ansi-bright-green'>locally in your browser</span> (<span class='text-negative'>no data is ever sent anywhere</span>). <strong class="text-info">Graphics card required.</strong>

  //- Newsletter
  section.content.q-mt-xl
    .row.q-col-gutter-lg.justify-center
      .col-12.col-md-6
        q-card
          q-card-section.text-subtitle1
            h2 The <span class='text-negative'>Midiblocks </span> <span class='text-info'>Newsletter</span>
            p <span class='text-info'>Sign up</span> to get an email <span class='text-negative'>up to once a week</span> (but probably way less, especially in the beginning). These updates will include:
            ul
              li Updates to Midiblocks and Handsfree.js
              li Tips & Tricks for using Midiblocks and Handsfree.js
              li Upcoming plans and roadmap
              li Links to special newsletter-only videos, repositories, and more
          q-card-section
            div(v-if='hasSubmittedNewsletter')
              q-card.bg-positive
                q-card-section
                  div 🎉 Thank you for signing up to the Newsletter!
            q-form(v-else @submit='onNewsletterSubmit' action='https://midiblocks.us2.list-manage.com/subscribe/post?u=d46c4c0193c967959310937da&amp;id=868ba249fe' method='post' target='_blank')
              q-input(v-model='newsletterEmail' lazy-rules type='email' name='EMAIL' color='secondary' filled placeholder='Your email')
              q-input.hidden(name='b_d46c4c0193c967959310937da_868ba249fe')
              q-btn.q-mt-md.bg-secondary.full-width(type='submit') Sign up

  //- Going further
  section.content.q-mt-xl
    .row.q-col-gutter-lg.justify-center
      .col-12
        q-card
          q-card-section.text-subtitle1
            .row.q-col-gutter-lg
              .col-12.col-md-6
                q-card.bg-inactive
                  q-card-section
                    h3 More updates and documentation coming soon!
                    p Hi! My name is <span class='text-ansi-bright-green'>Oz Ramos</span> and I've been working towards releasing <span class='text-negative'>Midiblocks</span> and <span class='text-info'>Handsfree.js</span> since 2018 with the goal of eventually helping anyone who cannot use a <span class='text-negative'>computer</span> at all use it and by extension <span class='text-negative'>anything</span> connected to the it <span class='text-info'>handsfree</span> (initially with <span class='text-info'>face gestures</span>, but ultimately with <span class='text-info'>mind control</span>).
                    p Sign up to <a href="http://eepurl.com/hhD7S1">my newsletter</a> to stay updated on these efforts, it's going to be a lot of fun! Also, here are some more links you may enjoy:
                    ul
                      li
                        q-icon.q-mr-sm.text-ansi-bright-green(name='fab fa-twitter')
                        a(href='https://twitter.com/midiblocks') Twitter <small>@Midiblocks</small>
                        span  - Connect with me on Twitter
                      li
                        q-icon.q-mr-sm.text-ansi-bright-green(name='fab fa-github')
                        a(href='https://github.com/midiblocks') GitHub <small>@Midiblocks</small>
                        span  - View the sourcecode to all of my projects, fork them, contribute, or make them your own!
                      li
                        q-icon.q-mr-sm.text-ansi-bright-green(name='fab fa-youtube')
                        a(href='https://www.youtube.com/channel/UCDzb8yXGOm6ZYd0Jf_FYKWA') YouTube
                        span  - Watch demos, get quick tips & tricks, and watch me game and build things handsfree!
              .col-12.col-md-6
                q-card.bg-inactive
                  q-card-section
                    h3 Roadmap
                    q-img.q-mb-md(:ratio='16/9' src='https://media0.giphy.com/media/tfd78t11fomshP1eq6/giphy.gif')
                    ul
                      li Release beta (eta 11/8)
                      li Add Eye Tracking
                      li Add Handtracking
                      li Add Voice
                      li Add Mind Control
</template>

<script>
import {set} from 'lodash'
import {mapState} from 'vuex'
import Workspace from '../components/Workspace'
import toolbox from '../assets/toolboxes/studio'
import getToolbox from '../mixins/getToolbox'
import store from 'store'
import Blockly from 'blockly'

export default {
  name: 'PageHome',

  mixins: [getToolbox],

  components: {
    Workspace
  },

  computed: {
    ...mapState(['settings'])
  },

  data () {
    return {
      newsletterEmail: '',
      hasSubmittedNewsletter: store.get('hasSubmittedNewsletter'),

      toolbox: this.getToolbox(toolbox),
      
      workspaces: {
        options: {
          zoomToFit: -2,
          hideToolbox: true,
          trashcan: false,
          zoom: {
            controls: false
          }
        },
        simpleDemo: "<xml xmlns=\"https://developers.google.com/blockly/xml\"><block type=\"12bffcf1-2bd3-4303-a009-f2831d502267\" id=\".@tNLD2pc,G0Sy.su9T?\" x=\"262\" y=\"113\"><field name=\"gesture\">smirk</field></block><block type=\"62746a3c-92de-439f-b74f-fe74130713d3\" id=\"{+r_gV$|q3-f[yV1:[mO\" disabled=\"false\" x=\"288\" y=\"244\"><field name=\"message\">Hello World!</field></block></xml>"
      }
    }
  },

  mounted () {
    set(window, 'app.$page', this)

    this.$refs.workspace.blockly.addChangeListener(Blockly.Events.disableOrphans)
    setTimeout(() => {
      this.$refs.workspace.restartCode()
    }, 0)

    document.addEventListener('handsfree-data', this.sendHandsfreeToInterpreter)
  },

  destroyed () {
    document.removeEventListener('handsfree-data', this.sendHandsfreeToInterpreter)
  },

  methods: {
    /**
     * Toasts a message
     */
    onNewsletterSubmit (ev) {
      this.hasSubmittedNewsletter = true
      store.set('hasSubmittedNewsletter', true)
      this.$q.notify({
        type: 'positive',
        message: '🎉 Thank you for signing up to the Newsletter!',
        timeout: 5000
      })

      ev.target.submit()
    },

    /**
     * Run the workspace
     */
    sendHandsfreeToInterpreter (data) {
      // @fixme do this in Handsfree.js
      data.detail.face = data.detail?.weboji
      delete data.detail.weboji

      this.$refs.workspace.interpreter.appendCode(`triggerEvent('frame', '${JSON.stringify(data.detail)}')`)
      this.$refs.workspace.interpreter.run()
    },

    workspaceEventHandler (ev) {
      switch (ev.type) {
        case Blockly.Events.BLOCK_CREATE:
        case Blockly.Events.BLOCK_DELETE:
        case Blockly.Events.BLOCK_CHANGE:
        case Blockly.Events.BLOCK_MOVE:
        case Blockly.Events.VAR_CREATE:
        case Blockly.Events.VAR_DELETE:
        case Blockly.Events.VAR_RENAME:
          setTimeout(() => {
            this.$refs.workspace.restartCode()
          })
        break
      }
    }
  }
}
</script>
