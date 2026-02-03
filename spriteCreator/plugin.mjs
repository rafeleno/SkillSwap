import chokidar from 'chokidar'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { generateSprite } from './generator.mjs'

export default class SvgSpritePlugin {
  constructor(options = {}) {
    this.options = {
      watch: true,
      svgDir: './src/assets/svg',
      spriteId: 'svg-sprite-container',
      ...options,
    }
    this.watcher = null
    this.currentSprite = null
    this.compiler = null
  }

  apply(compiler) {
    this.compiler = compiler

    compiler.hooks.beforeRun.tapPromise('SvgSpritePlugin', async () => {
      this.currentSprite = await generateSprite()
    })

    compiler.hooks.compilation.tap('SvgSpritePlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapPromise(
        'SvgSpritePlugin',
        async (data) => {
          if (!this.currentSprite) {
            this.currentSprite = await generateSprite()
          }
          data.html = this.injectSprite(data.html)
          return data
        },
      )
    })

    if (this.options.watch && compiler.options.mode === 'development') {
      this.setupWatcher()
    }
  }

  injectSprite(html) {
    const spriteContainer = `<div id="${this.options.spriteId}" style="display: none;">${this.currentSprite}</div>`

    if (html.includes(`id="${this.options.spriteId}"`)) {
      return html.replace(
        new RegExp(`<div id="${this.options.spriteId}".*?<\/div>`, 's'),
        spriteContainer,
      )
    }

    return html.replace('</body>', `${spriteContainer}</body>`)
  }

  async updateSprite() {
    try {
      this.currentSprite = await generateSprite()
      console.log('SVG sprite updated')
      this.triggerRebuild()
    }
    catch (error) {
      console.error('Error updating SVG sprite:', error)
    }
  }

  triggerRebuild() {
    if (!this.compiler)
      return

    if (this.compiler.watching) {
      this.compiler.watching.invalidate()
    }
  }

  setupWatcher() {
    this.watcher = chokidar.watch(this.options.svgDir, {
      persistent: true,
      ignoreInitial: true,
    })

    const handleChange = async () => {
      console.log('SVG files changed, updating sprite...')
      await this.updateSprite()
    }

    this.watcher
      .on('add', handleChange)
      .on('change', handleChange)
      .on('unlink', handleChange)
      .on('error', error => console.error('Watcher error:', error))
  }

  closeWatcher() {
    this.watcher?.close()
  }
}
