import * as fs from "fs";
import * as path from "path";

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

export { resolveApp };
