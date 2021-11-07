import Database from "./Database";
import IBundle from "../interfaces/IBundle";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";

class BundlesDatabase extends Database {
  constructor() {
    super();
    this.bundles = new JsonDB(
      new Config(`${process.cwd()}/storage/bundles.json`, true, true, "/")
    );
  }

  addBundle(bundleName: string, factionName: string, factionLeaderName: string, factionLeaderId: string): Promise<boolean> {
    return new Promise((res, rej) => {

      const bundleData: IBundle = {
        bundleId: Math.floor(100000 + Math.random() * 900000),
        bundelName: bundleName,
        facName: factionName,
        facLeaderName: factionLeaderName,
        facLeaderId: factionLeaderId,
        bundlegiven: false,
      };

      this.bundles.push("/bundles[]", bundleData, true);
      res(true);
    });
  }

  removeBundle(findBy: number, property: string): void {
    try {
      return this.bundles.delete(
        `/bundles[${this.bundles.getIndex("/bundles", findBy, property)}]`
      );
    } catch (err) {
      console.log(err);
    }
  }

  removeAll(): void {
    try {
      Array.from(this.listBundles()).map(() => this.bundles.delete(`/bundles[${0}]`));
    } catch (err) {
      console.log(err);
    }
  }

  getBundle(findBy: number, property: string): IBundle | null {
    const index = this.bundles.getIndex("/bundles", findBy, property);
    if (index === -1) return null;
    return this.bundles.getObject<IBundle>(`/bundles[${index}]`);
  }

  updateBundle(
    findBy: number,
    property: string,
    field: string,
    value: any
  ): void {
    const bundle: IBundle | null = this.getBundle(findBy, property);
    if (!bundle) return;

    if (bundle[field] != undefined) {
        bundle[field] = value;
      this.bundles.save();
      return;
    }

    for (let type in bundle)
      if (bundle[type][field] != undefined) {
        bundle[type][field] = value;
        this.bundles.save();
        return;
      }
  }

  resetBundle(findBy: number, property: string): void {
    const user = this.getBundle(findBy, property);
    if (!user) return;
  }

  resetAll(): void {
    Array.from(this.listBundles()).map((bundle) => {});
  }

  listBundles(): IBundle[] {
    return this.bundles.getObject("/bundles");
  }

  countBundles(): number {
    return this.bundles.count("/bundles");
  }
}

interface BundlesDatabase {
  bundles: JsonDB;
}

export default BundlesDatabase;
