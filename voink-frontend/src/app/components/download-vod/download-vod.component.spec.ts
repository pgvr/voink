import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadVodComponent } from './download-vod.component';

describe('DownloadVodComponent', () => {
  let component: DownloadVodComponent;
  let fixture: ComponentFixture<DownloadVodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadVodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadVodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
