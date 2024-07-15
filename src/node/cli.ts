#!/usr/bin/env node
import cac from 'cac';

const cli = cac('bifrost');

cli.command('build', 'Build the project').action(async (options) => {
    const { build } = await import('./build')
    try {
        await build()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
});

cli.parse();