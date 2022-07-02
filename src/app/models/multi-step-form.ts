import { ActivatedRoute, Router } from '@angular/router';
import { ISegment } from './isegment';

export class MultiStepForm<T> {
  currStep: number = parseInt(this.activatedRoute.snapshot.fragment || '1');
  segments: ISegment[] = [];
  submitAttempt: boolean = false;
  dataCreated: T | undefined;
  id: number | undefined;
  onFinishRoute: string = '';

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router
  ) {}

  onCreateData(data: any) {
    if (data) {
      this.dataCreated = data;
      this.id = data.id;
      this.setTitles();
      this.goToNextStep();
    }
    setTimeout(() => {
      this.submitAttempt = false;
    }, 0);
  }

  setTitles() {}

  goToNextStep() {
    if (this.currStep < this.segments.length) {
      this.currStep++;
      this.navigate();
    } else {
      this.onFinish();
    }
  }

  onFinish() {
    this.router.navigateByUrl(this.onFinishRoute);
  }

  submit() {
    this.submitAttempt = true;
  }

  goToPrevStep() {
    this.currStep--;
    this.navigate();
  }

  private navigate() {
    let id = this.id;
    this.router.navigate([], {
      fragment: this.currStep.toString(),
      queryParams: { id },
    });
  }
}
