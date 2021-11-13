import Database from "./Database";
import IBundle from "../interfaces/IBundle";
import { JsonDB } from "node-json-db";
declare class BundlesDatabase extends Database {
    constructor();
    addBundle(bundleName: string, factionName: string, factionLeaderName: string, factionLeaderId: string): Promise<boolean>;
    removeBundle(findBy: number, property: string): void;
    removeAll(): void;
    getBundle(findBy: number, property: string): IBundle | null;
    updateBundle(findBy: number, property: string, field: string, value: any): void;
    resetBundle(findBy: number, property: string): void;
    resetAll(): void;
    listBundles(): IBundle[];
    countBundles(): number;
}
interface BundlesDatabase {
    bundles: JsonDB;
}
export default BundlesDatabase;
