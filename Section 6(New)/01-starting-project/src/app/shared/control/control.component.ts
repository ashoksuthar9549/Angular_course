import { Component, ElementRef, HostBinding, HostListener, ViewEncapsulation, inject, input } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()'
  }
})
export class ControlComponent {
  // @HostBinding('class') className = 'control';
  // @HostListener('click') onClick() {
  //   console.log("test");
  // }
  label = input.required<string>()
  private el = inject(ElementRef)

  onClick() {
    console.log("clicked");
    this.el.nativeElement.querySelector('input, textarea').style="border: 2px solid red";
    console.log(this.el);
  }
}
