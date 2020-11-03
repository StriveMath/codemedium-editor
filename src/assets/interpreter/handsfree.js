class Handsfree {
  /**
   * Calls a callback on `document` when an event is triggered
   *
   * @param {String} eventName The `handsfree-${eventName}` to listen to
   * @param {Function} callback The callback to call
   */
  on (eventName, callback) {
    addEventListener(`handsfree-${eventName}`, callback)
  }

  /**
   * The main "Game Loop"
   */
  loop (data) {
    // Run on frames
    Object.keys(this.plugin).forEach((name) => {
      this.plugin[name].enabled &&
        this.plugin[name].onFrame &&
        this.plugin[name].onFrame(data)
    })
  }

  /**
   * Adds a callback (we call it a plugin) to be called after every tracked frame
   *
   * @param {String} name The plugin name
   * @param {Object|Function} config The config object, or a callback to run on every fram
   * @returns {Plugin} The plugin object
   */
  use(name, config) {
    // Make sure we have an options object
    if (typeof config === 'function') {
      config = {
        onFrame: config
      }
    }

    config = Object.assign(
      {
        // Stores the plugins name for internal use
        name,
        // Whether the plugin is enabled by default
        enabled: true,
        // A set of default config values the user can override during instanciation
        config: {},
        // (instance) => Called on every frame
        onFrame: null,
        // (instance) => Called when the plugin is first used
        onUse: null,
        // (instance) => Called when the plugin is enabled
        onEnable: null,
        // (instance) => Called when the plugin is disabled
        onDisable: null
      },
      config
    )

    // // Create the plugin
    this.plugin[name] = new Plugin(config, this)
    this.plugin[name].enabled &&
      this.plugin[name].onUse &&
      this.plugin[name].onUse()

    return this.plugin[name]
  }
}

handsfree = new Handsfree() 

/**
 * Plugin class
 */
class Plugin {
  constructor(plugin, handsfree) {
    // Props
    this.plugin = plugin
    this.handsfree = handsfree

    // Copy properties and methods from plugin into class
    Object.keys(plugin).forEach((prop) => {
      this[prop] = plugin[prop]
    })

    // handsfree.config.plugin[name] overwrites plugin.config
    let handsfreePluginConfig = handsfree.config.plugin[plugin.name]
    if (typeof handsfreePluginConfig === 'boolean') {
      handsfreePluginConfig = { enabled: handsfreePluginConfig }
    }

    // Disable plugins via new Handsfree(config)
    if (typeof handsfreePluginConfig === 'object') {
      Object.assign(this.config, handsfreePluginConfig)
      if (typeof handsfreePluginConfig.enabled === 'boolean') {
        this.enabled = handsfreePluginConfig.enabled
      }
    }
  }

  /**
   * Toggle plugins
   */
  enable() {
    !this.enabled && this.onEnable && this.onEnable(this.handsfree)
    this.enabled = true
  }
  disable() {
    this.enabled && this.onDisable && this.onDisable(this.handsfree)
    this.enabled = false
  }
}