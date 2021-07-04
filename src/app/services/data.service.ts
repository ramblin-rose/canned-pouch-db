import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import { HttpClient } from '@angular/common/http';
import MemoryStream from 'memorystream';
// these odd from paths are key as they overcome es6 module issues and default exports.
// See https://github.com/pouchdb-community/pouchdb-replication-stream/issues/69
import * as PouchdbAdapterMemory from 'pouchdb-adapter-memory/lib/index.js';
import ReplicationStream from 'pouchdb-replication-stream/dist/pouchdb.replication-stream.min.js';

export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: string;
  read: boolean;
}

export interface NoteContent {
  note: string;
}
export interface NoteDocument
  extends PouchDB.Core.ExistingDocument<
    NoteContent & PouchDB.Core.AllDocsMeta
  > {}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private static readonly dbName = 'mydb';
  private db: PouchDB.Database;
  constructor(private http: HttpClient) {}

  public async init(): Promise<void> {
    if (this.db === undefined) {
      PouchDB.plugin(PouchdbAdapterMemory);
      PouchDB.plugin(ReplicationStream.plugin);
      this.db = new PouchDB(DataService.dbName, { adapter: 'memory' });
      // if the db is empty, hydrate it with the canned db assets/db
      const info = await this.db.info();
      if (info.doc_count === 0) {
        //load the asset into a memory stream
        const cannedDbText = await this.http
          .get('/assets/db/mydb.dump.txt', {
            responseType: 'text',
          })
          .toPromise();
        // hydrate the db
        return (this.db as any).load(
          MemoryStream.createReadStream(cannedDbText)
        );
      }
    }
  }

  public async allNotes(): Promise<PouchDB.Core.AllDocsResponse<NoteContent>> {
    await this.init();
    return this.db.allDocs<NoteContent>({ include_docs: true });
    // const m = (await this.db.allDocs({ include_docs: true })).rows.map<Note>(
    //   (row: any) => {
    //     // cherry pick timestamp out of id
    //     let timestamp = parseInt(row.id.split(':')[1]);
    //     return {
    //       fromName: 'PouchDB Replication',
    //       subject: row.doc.note,
    //       date: new Date(timestamp).toLocaleDateString(),
    //       id: row.id,
    //       read: false,
    //     };
    //   }
    // );
    //return m;
  }
}
