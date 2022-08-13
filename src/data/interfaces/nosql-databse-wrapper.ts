//data/interfaces/data-source/database.ts
export interface NoSQLDatabaseWrapper {
  find(query: object, config: any): Promise<any[]>;
  insertOne(doc: any, config: any): void;
}
