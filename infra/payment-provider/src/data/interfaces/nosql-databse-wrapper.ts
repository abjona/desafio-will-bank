//data/interfaces/data-source/database.ts
export interface NoSQLDatabaseWrapper {
  updateOne(uuid: string, data: object): void
}
