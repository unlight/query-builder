export default function factory(driver: string) {
    switch (driver) {
        case "mysql": return require("./mysql");
        default:
            throw "Unknown driver";
    }
}