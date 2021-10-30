# canned-pouch-db 🥫

A trivial demonstration on how to can (🥫) a pouchdb instance with a local node script and then load that pouchdb in an Ionic 5/Angular app.

See 'can-a-pouchdb.js' in the root directory to see how the local pouchdb instance is created and then serialized to src/assets/db.
See src/app/services/data.service.ts to see how to hydrate a new pouchDB with the canned database.

The data service uses the memory adapter so as to avoid having to destroy the database prior to every run.

For context, see [StackOVerflow #68105040](https://stackoverflow.com/questions/68105040/how-can-i-copy-pouchdb-0000003-log-file-to-ionic-5-and-retrieve-the-data/68245289#68245289)

# Install &amp; Run

```
$ git clone https://github.com/RambleOnRose/canned-pouch-db.git
$ cd canned-pouch-db
$ npm install  
$ ionic build & ionic serve
```


# License
canned-pouch-db is released under the [MIT License](https://github.com/RambleOnRose/canned-pouch-db/blob/master/LICENSE).


