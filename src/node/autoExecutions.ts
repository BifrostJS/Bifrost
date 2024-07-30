import * as path from 'path';
import * as fs from 'fs';
import { getConfig } from './config';

export async function scanForAutoExecutions() {
    const config = await getConfig();
    const autoExecuteFolders = config.autoExecute || [];

    let code = "";

    autoExecuteFolders.forEach(autoExecute => {
        const commandsDir = path.join(process.cwd(), './src/', autoExecute);

        const files = fs.readdirSync(commandsDir);

        files.forEach(file => {
            const filePath = path.join(commandsDir, file);

            const stats = fs.statSync(filePath);

            if(stats.isFile()) {
                code += `import ${file.replace('.ts', '')} from "./src/${autoExecute}/${file}"\n`;
                code += file.replace('.ts', '') + '();\n';
            }
        });
    });

    

    return code;
}
