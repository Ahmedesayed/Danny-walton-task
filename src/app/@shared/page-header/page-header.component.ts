import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISegment } from 'src/app/models/isegment';
@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  @Input() title: string = '';
  @Input() segments: ISegment[] = [];
  @Input() filter: TemplateRef<any> | undefined;
  @Input() steps: boolean = false;
  selectedSeg: string | number = '';
  $fragment = this.activatedRoute.fragment;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.initSegements();
  }

  initSegements() {
    if (this.segments.length) {
      this.onFragmentChange(this.activatedRoute.snapshot.fragment || '');
      this.subsFragment();
    }
  }

  subsFragment() {
    this.selectedSeg = this.activatedRoute.snapshot.fragment || '';
    this.$fragment.subscribe((frag) => {
      if (frag) {
        this.onFragmentChange(frag);
      } else {
        this.onSegSelection(this.segments[0]);
      }
    });
  }

  getSegment(segmentKey: string | null) {
    let segment =
      this.segments.find((e) => e.key == segmentKey) || this.segments[0];
    return segment;
  }

  onSegSelection(segment: ISegment) {
    if (!segment || this.activatedRoute.snapshot.fragment == segment.key)
      return;
    this.selectedSeg = segment.key;
    this.router.navigate([], {
      fragment: segment.key + '',
      queryParams: this.activatedRoute.snapshot.queryParams,
    });
    segment.handler();
  }

  onFragmentChange(segmentKey: string | null) {
    let segment = this.getSegment(segmentKey);
    if (!segment || this.selectedSeg == segment.key) return;
    this.selectedSeg = segment.key;
    segment.handler();
  }

  ngOnDestroy() {}
}
