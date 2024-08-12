import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
  // host: {
  //   'class': 'status-offline'
  // }
})
export class ServerStatusComponent implements OnInit {
  currentStatus: 'online' | 'offline' | 'unknown' = 'offline';
  private interval?: ReturnType<typeof setInterval>;

  constructor() {}

  ngOnInit(): void {
    console.log("ngOnInit called");
    this.interval = setInterval(() => {
      const randomNumber = Math.random();

      if(randomNumber < 0.5) {
        this.currentStatus = 'online';
      } else if(randomNumber < 0.9) {
        this.currentStatus = 'offline';
      } else {
        this.currentStatus = 'unknown';
      }
    }, 5000);
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called");
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy called");
    clearInterval(this.interval);
  }
}
