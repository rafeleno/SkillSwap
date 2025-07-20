import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Рекурсивно получаем все SVG файлы в директории и поддиректориях
async function getSVGFiles(dir) {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map(async dirent => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getSVGFiles(res) : res;
    }));
    return files.flat().filter(file => path.extname(file).toLowerCase() === '.svg');
}

async function generateSprite() {
    const config = {
        inputDir: process.env.SVG_SPRITE_INPUT || path.join(__dirname, '../src/assets/svg'),
        outputFile: process.env.SVG_SPRITE_OUTPUT || path.join(__dirname, '../dist/sprites.svg')
    };

    try {
        console.log('Generating SVG sprite...');
        const svgFiles = await getSVGFiles(config.inputDir);

        if (svgFiles.length === 0) {
            console.warn('No SVG files found in', config.inputDir);
            return;
        }

        let sprite = `<?xml version="1.0" encoding="UTF-8"?>
<svg viewbox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
`;

        for (const filePath of svgFiles) {
            const svgContent = await fs.readFile(filePath, 'utf8');

            // Получаем относительный путь для ID символа
            const relativePath = path.relative(config.inputDir, filePath);
            const symbolId = relativePath
                .replace(/\.svg$/i, '')
                .replace(/.+\\/g, '')  // Заменяем обратные слеши
                .replace(/\s+/g, '-')
                .toLowerCase();

            const innerContent = svgContent
                .replace(/<svg[^>]*>/i, '')
                .replace(/<\/svg>/i, '')
                .trim();

            sprite += `  <symbol id="${symbolId}" viewbox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n`;
            sprite += `    ${innerContent}\n`;
            sprite += `  </symbol>\n`;
        }

        sprite += `</svg>`;

        // Создаем директорию, если она не существует
        await fs.mkdir(path.dirname(config.outputFile), { recursive: true });
        await fs.writeFile(config.outputFile, sprite);
        console.log(`SVG sprite generated at ${config.outputFile}`);

    } catch (err) {
        console.error('SVG sprite generation error:', err);
        process.exitCode = 1;
    }
}

// Для интеграции с Webpack плагином
if (process.env.SVG_SPRITE_ONCE) {
    generateSprite();
} else {
    // Режим наблюдения (для standalone использования)
    const chokidar = await import('chokidar');
    const config = {
        inputDir: process.env.SVG_SPRITE_INPUT || path.join(__dirname, '../src/assets/svg')
    };

    const watcher = chokidar.default(config.inputDir, {
        ignored: /(^|[\/\\])\../,
        persistent: true,
        ignoreInitial: true,
        depth: 99 // Рекурсивное наблюдение за поддиректориями
    });

    watcher
        .on('add', generateSprite)
        .on('unlink', generateSprite)
        .on('error', error => console.error('SVG watcher error:', error));

    console.log(`Watching SVG files in ${config.inputDir}`);
}