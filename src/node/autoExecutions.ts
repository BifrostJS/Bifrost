import * as path from 'path';
import * as fs from 'fs';

export function scanForAutoExecutions() {

    let code = "";

    const filesToAutoExecute : string[] = []

    const commandsDir = path.join(process.cwd(), './src/server/commands');

    const files = fs.readdirSync(commandsDir);

    files.forEach(file => {
        const filePath = path.join(commandsDir, file);

        const stats = fs.statSync(filePath);

        if(stats.isFile()) {
            //const content = fs.readFileSync(filePath, 'utf-8');
            console.log(`Found autoExecution in ${file}`);
            filesToAutoExecute.push(filePath);

            console.log(filePath)

            code += 'import ' + file.replace('.ts', '') + ' from "./src/server/commands/' + file + '"\n';
            code += file.replace('.ts', '') + '();\n';
        }
    });

    

    return code;
}
