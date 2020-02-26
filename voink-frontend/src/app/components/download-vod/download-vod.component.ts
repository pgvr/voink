import { Component, OnInit } from '@angular/core';
import { VodService } from 'src/app/services/vod.service';

@Component({
  selector: 'app-download-vod',
  templateUrl: './download-vod.component.html',
  styleUrls: ['./download-vod.component.scss']
})
export class DownloadVodComponent implements OnInit {

  constructor(public vodService: VodService) { }

  ngOnInit(): void {
  }

}
