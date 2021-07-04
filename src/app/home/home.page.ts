import { Component, OnInit } from '@angular/core';
import { DataService, NoteDocument } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public notes: NoteDocument[];
  constructor(private data: DataService) {}

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  async ngOnInit(): Promise<void> {
    const response = await this.data.allNotes();
    this.notes = response.rows.map((row) => row.doc);
    //  this.data.getMessages().then((response) => {
    //    this.noteDocs = response.rows.map((row) => row.doc);
    //  });
  }
}
