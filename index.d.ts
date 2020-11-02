declare module '@ridomin/repo-scripts' {
    /**
     * @description Validates DTMI with RegEx from https://github.com/Azure/digital-twin-model-identifier#validation-regular-expressions
     * @param {string} dtmi
     */
    function isDtmi(dtmi: string) : boolean;

    /**
     * @description Converts DTMI to /dtmi/com/example/device-1.json path.
     * @param {string} dtmi
     * @returns {string}
     */
    function dtmiToPath(dtmi: string) : string;

    /**
     * @description Returns external IDs in `extend` and `component` elements
     * @param {{ extends: any[]; contents: any[]; }} rootJson
     * @returns {Array<string>}
     */
    function getDependencies(dtdlJson: any): Array<string>;

    /**
     * @description Checks all dependencies are available
     * @param {Array<string>} deps
     * @returns {boolean}
     */
    function checkDependencies(dtmi: string): boolean;
    
    /**
     * @description Validates all internal IDs follow the namepspace set by the root id
     * @param {any} dtdlJson
     * @returns {boolean}
     */
    function checkIds(dtdlJson: any): boolean;

    /**
     * @description Copy DTDL file to the /dtmi/com/model-1.json folder struct
     * @param file 
     * @returns The root DTMI of the file, if successfull
     */
    function addModel(file: string): string;
}