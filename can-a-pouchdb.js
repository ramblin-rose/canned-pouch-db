try {
  (async () => {
    const fs = require("fs");
    const PouchDB = require("pouchdb");
    const replicationStream = require("pouchdb-replication-stream");
    const dbName = "mydb";
    const dbPath = `./${dbName}`;
    const dumpFileFolder = "./src/assets/db";
    const dumpFilePath = `${dumpFileFolder}/${dbName}.dump.txt`;

    // create some trivial docs
    const docs = [];
    const dt = new Date(2021, 6, 4, 12, 0, 0);
    for (let i = 0; i < 10; i++, dt.setMinutes(dt.getMinutes() + i)) {
      docs[i] = {
        _id: "note:" + dt.getTime(),
        note: `Note number ${i}`,
      };
    }
    // always start clean - remove database.
    fs.rmdirSync(dbPath, { recursive: true });

    PouchDB.plugin(replicationStream.plugin);
    PouchDB.adapter(
      "writableStream",
      replicationStream.adapters.writableStream
    );
    const db = new PouchDB(dbName);

    console.log(JSON.stringify(docs));
    await db.bulkDocs(docs);
    //
    // dump db to file.
    //
    fs.mkdirSync(dumpFileFolder, { recursive: true });
    const ws = fs.createWriteStream(dumpFilePath);
    await db.dump(ws);
    console.log(`${dbName} dumped to ${dumpFilePath}`);
  })();
} catch (err) {
  console.log(err.toString());
}
