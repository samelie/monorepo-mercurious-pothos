
        import path from 'path';
        import { fileURLToPath } from 'url';
        import { createRequire as topLevelCreateRequire } from 'module';
        const require = topLevelCreateRequire(import.meta.url);
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        

// src/constants.ts
import { parse } from "path";
import { sync as pkgUpSync } from "pkg-up";
var pkgRootDir = parse(pkgUpSync({ cwd: __dirname }) || "").dir;
export {
  pkgRootDir
};
//# sourceMappingURL=main.js.map
