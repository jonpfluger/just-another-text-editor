import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const jate = await openDB('jate', 1)
  const get = jate.transaction('jate', 'readwrite')
  const database = get.objectStore('jate')
  const request = database.put({id: 1, value: content})
  const result = await request
  console.log(result)
};

export const getDb = async () => {
  const jate = await openDB('jate', 1)
  const get = jate.transaction('jate', 'readonly')
  const database = get.objectStore('jate')
  const request = database.getAll()
  const result = await request
  return result
};

initdb();
