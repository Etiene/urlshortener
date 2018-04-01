import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import shortid from 'shortid';

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ urls: [] }).write();

class Url {
  constructor(url, id = null, visisted = 0) {
    if (id) {
      this.url = url;
      this.id = id;
      this.visisted = visisted;
    } else {
      this.insert(url);
    }
  }

  insert(url) {
    this.url = url;
    this.id = shortid.generate();
    this.visited = 0;

    db
      .get('urls')
      .push({ id: this.id, url: this.url, visited: this.visited })
      .write();
  }

  incrementVisit() {
    const url = db.get('urls').find({ id: this.id });
    const visited = url.value().visited;
    console.log(visited + 1);
    url.assign({ visited: visited + 1 }).write();
  }

  static delete(id) {
    return db
      .get('urls')
      .remove({ id })
      .write();
  }

  static list() {
    return db.get('urls').value();
  }

  static find(query) {
    const url = db
      .get('urls')
      .find(query)
      .value();
    if (url) {
      return new Url(url.url, url.id, url.visited);
    }
  }
}

export default Url;
