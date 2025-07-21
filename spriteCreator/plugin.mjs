import { spawn } from 'child_process';
import chokidar from 'chokidar';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default class SvgSpritePlugin {
    constructor(options = {}) {
        this.options = {
            inputDir: './src/assets/svg',
            outputFile: './dist/sprite.svg',
            watch: true,
            ...options
        };
        this.watcher = null;
    }

    apply(compiler) {
        this.generateSprite();

        if (this.options.watch && compiler.options.mode === 'development') {
            this.startWatching(compiler);
        }

        compiler.hooks.watchClose.tap('SvgSpritePlugin', () => {
            this.stopWatching();
        });
    }

    generateSprite() {
        const scriptPath = new URL(__dirname + '/generator.mjs', import.meta.url).pathname;
        const child = spawn('node', [scriptPath], {
            stdio: 'inherit',
            env: { ...process.env, SVG_SPRITE_ONCE: 'true' }
        });

        child.on('close', code => {
            if (code !== 0) {
                console.error(`SVG sprite generation failed with code ${code}`);
            }
        });
    }

    startWatching(compiler) {
        this.watcher = chokidar.watch(this.options.inputDir, {
            ignored: /(^|[\/\\])\../,
            persistent: true,
            ignoreInitial: true
        });

        this.watcher
            .on('add', () => this.generateSprite())
            .on('unlink', () => this.generateSprite())
            .on('error', error => console.error('SVG watcher error:', error));

        console.log(`Watching SVG files in ${this.options.inputDir}`);
    }

    stopWatching() {
        if (this.watcher) {
            this.watcher.close();
        }
    }
}