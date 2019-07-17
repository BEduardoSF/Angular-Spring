import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent implements OnInit {
  habilitar: boolean = true;
  listaCurso: string[] = ['TypeScript', 'JavaScript', 'Java SE', 'PHP'];
  constructor() { }

  ngOnInit() {
  }
  setHabilitar(): void{
    this.habilitar = (this.habilitar == true)?false:true;
  }
}
