import * as path from 'path';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const dbPath = path.join(__dirname, 'db.json');
const adapter = new FileSync(dbPath);
const db = low<any>(adapter);

export {
  db,
  dbPath
};
