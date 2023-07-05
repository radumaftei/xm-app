import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.scss']
})
export class SinglePhotoComponent implements OnInit {
  id!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')!;
  }
}
