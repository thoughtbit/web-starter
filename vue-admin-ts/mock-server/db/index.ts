import * as path from 'path';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const dbFile = path.join(__dirname, 'db.json');
const adapter = new FileSync(dbFile);
const db = low(adapter);

export {
  db,
  dbFile
};
