<template lang="pug">
q-page
  section.content.flex.flex-center
    //- Hero
    .row.q-col-gutter-lg
      .col-12.col-md-6
        q-card
          q-card-section.text-center
            img.q-mt-lg.max-width-100(src='~assets/logo-title.png')
            p.text-subtitle2.q-mt-lg A platform for <span class="text-negative">doing</span> things <span class="text-info">handsfree</span>
            div.text-subtitle1 
              strong.text-negative 📅 This project is a work in progress 📅
              div <a href="http://eepurl.com/hhD7S1" target="_blank">Check back</a> on around <span class="text-negative">11/8</span> for beta!
          
          q-card-section
            q-card.bg-inactive
              q-card-section
                p
                ul.spaced.text-left.text-subtitle2
                  li Map <span class="text-info">face gestures</span> to the <span class="text-negative">mouse</span> and <span class="text-negative">keyboard</span>
                  li Play <span class="text-negative">Steam games</span> and more <span class="text-info">handsfree</span>
                  li Create <span class="text-info">gesture-driven automations</span> for <span class="text-negative">desktop</span>, <span class="text-negative">devices</span>, <span class="text-negative">robots</span>, and <span class="text-negative">more</span>
                  li <span class="text-info">Voice</span>, <span class="text-info">hand tracking</span>, <span class="text-info">pose estimation</span>, and <span class="text-info">mind control</span> coming soon!

          q-card-section
            p.text-center
              small <a href="https://github.com/midiblocks/midiblocks">GitHub</a> &middot; <a href="https://twitter.com/midiblocks">Twitter</a> &middot; <a href="https://www.youtube.com/channel/UCDzb8yXGOm6ZYd0Jf_FYKWA">YouTube</a> &middot; <a href="https://www.reddit.com/r/SideProject/comments/jipnqe/midiblocks_a_web_based_handsfree_visual_coding/">About</a>
      .col-12.col-md-6
        q-card
          q-card-section.text-subtitle1
            q-img.q-mb-md(:ratio='16/9' src='https://media0.giphy.com/media/tfd78t11fomshP1eq6/giphy.gif')
            p <span class="text-negative">Midiblocks</span> are little apps assembled with blocks that help you do different things on your devices through <span class="text-info">face gestures</span>.
            p During <span class='text-negative'>Beta</span> a few starter <span class='text-negative'>Midiblocks</span> will be available to use right away to help you do things like <span class='text-info'>controlling</span> a <span class='text-negative'>pointer</span>, <span class='text-info'>copy+pasting </span> <span class='text-negative'>text</span> and <span class='text-negative'>media</span></span>, <span class='text-info'>mapping gestures</span> to <span class='text-negative'>virtual game controllers</span>, and more through <span class='text-info'>face gestures</span>!
            p But that's just to get you started! You can add more functionality with the handsfree visual code editor in the <router-link :to='{name: "Studio"}'>Midiblocks Studio</router-link> (tutorials coming soon).

  //- About Face Pointers
  section.content.q-mt-xl
    .row.q-col-gutter-lg.justify-center
      .col-12.col-md-6
        q-card
          q-card-section.text-subtitle1
            h2 About <span class='text-negative'>Face Pointers</span>
            q-img.q-mb-md(:ratio='16/9' src='https://media0.giphy.com/media/Iv2aSMS0QTy2P5JNCX/giphy.gif')
            p A <span class="text-negative">Face Pointer</span> is a pointer that is controlled with <span class="text-info">head movements</span> and <span class="text-info">face gestures</span> through a <span class="text-negative">webcam</span>. By default, the <span class="text-negative">Face Pointer</span> that comes with <span class="text-negative">Midiblocks</span> has the following features:
            ul.spaced
              li (<span class="text-negative">Web only</span>) <span class="text-info">Move</span> the <span class="text-negative">Face Pointer</span> above or below a scroll area to scroll in that direction (see below)
              li <span class="text-negative">Click</span> by <span class="text-info">smiling</span> or <span class="text-info">smirking to either side</span>
            p <span class="text-negative">Midiblock's </span> <span class="text-info">Face Pointer</span> is powered by my gesture library, <router-link :to='{name: "DocsHandsfreeLanding"}'>Handsfree.js</router-link>
          q-card-actions
            q-btn.bg-secondary.full-width(:disabled='settings.isFacePointerActive' @click='$store.dispatch("toggleHandsfree")')
              span.q-mr-sm Try it
              <strong><small>(requires GPU)</small></strong>

  //- Mapping Face Gestures
  section.content.q-mt-xl
    .row.q-col-gutter-lg.justify-center
      .col-12
        q-card
          q-card-section.text-subtitle1
            h2 Mapping <span class='text-info'>face gestures</span> to the <span class='text-negative'>keyboard</span> and <span class='text-negative'>mouse</span>
            .row.q-col-gutter-lg
              .col-12.col-md-6
                q-card.bg-inactive
                  q-card-section
                    h3 Try it!
                    p <span class='text-info'>Snap</span> these <span class='text-negative'>two blocks</span> together to create a small <span class='text-negative'>Midiblock</span> that <span class='text-info'>responds</span> to the <span class='text-info'>selected event</span> by emitting the <span class='text-negative'>selected key</span>.
                    p <span class='text-negative'>Midiblocks</span> can be composed of two blocks or dozens or even hundreds of blocks. <span class='text-negative'>The Library</span> contains a <router-link :to='{name: "Library"}'>growing set of Midiblocks</router-link> and the <span class='text-negative'>Blocks</span> that compose them, and you can  <router-link :to='{name: "Factory"}'>create new ones</router-link> using JavaScript!
              .col-12.col-md-6
                q-card.bg-inactive
                  q-card-section(style='height: 300px')
                    Workspace.full-height(:toolbox='toolbox' :autoload='workspaces.simpleDemo' :blocks='[]' :options='workspaces.options')

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
                    h3 Recent updates
                    q-img.q-mb-md(:ratio='16/9' src='https://media0.giphy.com/media/YATR9GZSSHKeNw3fht/giphy.gif')
                    p more info coming soon!
</template>

<script>
import {set} from 'lodash'
import {mapState} from 'vuex'
import Workspace from '../components/Workspace'
import toolbox from '../assets/toolboxes/studio'
import getToolbox from '../mixins/getToolbox'

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
      hasSubmittedNewsletter: false,

      toolbox: this.getToolbox(toolbox),
      
      workspaces: {
        options: {
          zoomToFit: true,
          hideToolbox: true,
          trashcan: false,
          zoom: {
            controls: false
          }
        },
        simpleDemo: '<xml xmlns="https://developers.google.com/blockly/xml"><block type="handsfree_gesture" id="QoTbk/,sPtuU1-TT0k2m" x="225" y="125"><field name="gesture">right_eyebrow</field></block><block type="keyboardtapkey" id="S9]!S21$c%0~kooT[$Pn" disabled="true" x="577" y="129"><field name="key">space</field></block></xml>'
      }
    }
  },

  mounted () {
    set(window, 'app.$page', this)
  },

  methods: {
    onNewsletterSubmit (ev) {
      this.hasSubmittedNewsletter = true
      this.$q.notify({
        type: 'positive',
        message: '🎉 Thank you for signing up to the Newsletter!',
        timeout: 5000
      })

      ev.target.submit()
    }
  }
}
</script>
