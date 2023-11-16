
            const _importMetaUrl=require('url').pathToFileURL(__filename)
        
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  pkgRootDir: () => pkgRootDir
});
module.exports = __toCommonJS(main_exports);
var import_dotenv_flow = __toESM(require("dotenv-flow"), 1);
var import_node_path = require("node:path");
var import_node_url = require("node:url");
var import_pkg_up = require("pkg-up");
var dirname = (0, import_node_path.parse)((0, import_node_url.fileURLToPath)(_importMetaUrl)).dir;
var pkgRootDir = (0, import_node_path.parse)((0, import_pkg_up.sync)({ cwd: dirname }) || "").dir;
var p = (0, import_node_path.join)(pkgRootDir, "../../", ".config");
import_dotenv_flow.default.config({ path: p });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pkgRootDir
});
//# sourceMappingURL=main.js.map
