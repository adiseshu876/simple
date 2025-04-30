import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tripForm:any= FormGroup;
  trips: { from: string; to: string }[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize form with form controls
    this.tripForm = this.fb.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]]
    });
  }

  addTrip() {
    if (this.tripForm.valid) {
      const { from, to } = this.tripForm.value;
      this.trips.push({ from: from.toUpperCase(), to: to.toUpperCase() });
      this.tripForm.reset(); // Reset form after adding trip
    }
  }

  getX(index: number): number {
    return 100 + index * 160;
  }

  getColor(index: number): string {
    const palette = ['#6c63ff', '#00bcd4', '#ff9800', '#8bc34a', '#e91e63'];
    let colorIndex = 0;
    for (let i = 1; i <= index; i++) {
      if (this.trips[i - 1]?.to !== this.trips[i].from) {
        colorIndex++;
      }
    }
    return palette[colorIndex % palette.length];
  }

  isContinued(index: number): boolean {
    return index === 0 || this.trips[index - 1].to === this.trips[index].from;
  }
}
