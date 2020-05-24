// class JSONStore {
//   private readonly db: Promise<low.LowdbAsync<any>>;
//
//   constructor(dbPath: string) {
//     if (!dbPath ) {
//       throw Error('数据地址不存在~');
//     }
//     const adapter = new FileSync(dbPath);
//     this.db = low<any>(adapter);
//   }
//
//   async read(): Promise<low.LowdbSync<any>> {
//     // @ts-ignore
//     return (await this.db).read();
//   }
//
//   async get(collectionName: string): Promise<IObject> {
//     return (await this.read()).get(collectionName).value();
//   }
//   async set (key: string, value: any): Promise<void> {
//     return (await this.read()).set(key, value).write();
//   }
//
//   async  has (key: string): Promise<boolean> {
//     return (await this.read()).has(key).value();
//   }
//
//   async insert<T>(collectionName:string, value: T): Promise<IResult<T>> {
//     // @ts-ignore
//     await (await this.read()).get(collectionName).push(value).write();
//     return (value as IResult<T>);
//   }
//
//   async insertMany<T> (collectionName: string, value: T[]): Promise<Array<IResult<T>>> {
//     // @ts-ignore
//     await (await this.read()).get(collectionName).push(...value).write();
//     return (value as Array<IResult<T>>);
//   }
//
//   async unset (key: string, value: any): Promise<boolean> {
//     return (await  this.read()).get(key).unset(value).value();
//   }
//
//   async updateById (collectionName: string, id: string, value: any): Promise<boolean> {
//     const collection = (await this.read()).get(collectionName);
//     // @ts-ignore
//     const result = await collection.find({ id }).value();
//     if (result) {
//       // @ts-ignore
//       await collection.find({ id }).assign(result, value, { id }).write()
//       return true;
//     } else {
//       return false;
//     }
//   }
//
//   async getById (collectionName:string, id: string): Promise<any | undefined> {
//     // @ts-ignore
//     return (await this.db.read())
//       .get(collectionName).find({ id }).value();
//   }
//
//   async removeById (collectionName:string, id: string): Promise<void> {
//     // @ts-ignore
//     const collection = (await this.db.read()).get(collectionName);
//     // @ts-ignore
//     await collection.remove({ id }).write();
//   }
// }
