declare module '@ridomin/repo-scripts' {
    function isDtmi(dtmi: string) : boolean;
    function dtmiToPath(dtmi: string) : string;
    function getDependencies(dtdlJson: any): Array<string>;
    function checkDependencies(dtmi: string): boolean;
    function checkIds(dtdlJson: any): boolean;
}