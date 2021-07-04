import { Component, OnInit, Input } from '@angular/core';
import { NoteDocument } from '../services/data.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent {
  date?: string;
  @Input() note: NoteDocument;

  constructor() {}

  ngOnInit() {
    // derive the creation date from the _id
    this.date = new Date(
      parseInt(this.note._id.split(':')[1], 10)
    ).toLocaleDateString();
  }

  isIos() {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
  }
}
