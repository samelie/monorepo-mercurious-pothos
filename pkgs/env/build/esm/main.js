
        // import path from 'path';
        // import { fileURLToPath } from 'url';
        // import m from 'module';
        // console.log(m);
        // console.log(m.createRequire)
        // import { createRequire as topLevelCreateRequire } from 'module';
        // const require = topLevelCreateRequire(import.meta.url);
        // const __filename = fileURLToPath(import.meta.url);
        // const __dirname = path.dirname(__filename);
        

// src/main.ts
import dotenv from "dotenv-flow";
import { join, parse } from "node:path";
import { fileURLToPath } from "node:url";
import { sync as pkgUpSync } from "pkg-up";
var dirname = parse(fileURLToPath(import.meta.url)).dir;
var pkgRootDir = parse(pkgUpSync({ cwd: dirname }) || "").dir;
var p = join(pkgRootDir, "../../", ".config");
dotenv.config({ path: p });
export {
  pkgRootDir
};
//# sourceMappingURL=main.js.map
