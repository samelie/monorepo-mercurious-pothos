export interface PackageJson {
    homepage: string;
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
    peerDependencies: Record<string, string>;
}

export type CesiumPluginParams = {
    projectDir: string;
};
