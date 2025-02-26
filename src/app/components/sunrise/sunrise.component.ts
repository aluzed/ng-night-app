import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sunrise',
  template:
    '<canvas id="starsCanvas" class="absolute top-0 left-0 w-full h-full"></canvas>' +
    '<canvas id="shootingStarsCanvas" class="absolute top-0 left-0 w-full h-full"></canvas>',
  styles: [
    `
      :host {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: linear-gradient(
          to bottom,
          #3a1c71,
          #6246a6,
          #f78ca0,
          #fbc2eb
        );
        overflow: hidden;
      }
    `,
  ],
})
export class SunriseComponent implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.initStars();
    this.initShootingStars();
  }

  private initStars() {
    const canvas: HTMLCanvasElement =
      this.el.nativeElement.querySelector('#starsCanvas');
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let staticStars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * (canvas.height / 2),
      radius: Math.random() * 2 + 1,
      opacity: Math.random(),
      speed: Math.random() * 0.02 + 0.01,
    }));

    const animateStars = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      staticStars.forEach((star) => {
        star.opacity = Math.abs(Math.sin(Date.now() * star.speed));
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animateStars);
    };

    requestAnimationFrame(animateStars);
  }

  private initShootingStars() {
    const canvas: HTMLCanvasElement = this.el.nativeElement.querySelector(
      '#shootingStarsCanvas'
    );
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let stars: { x: number; y: number; length: number; speed: number }[] = [];

    const createStar = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 2),
        length: Math.random() * 80 + 50,
        speed: Math.random() * 5 + 2,
      };
    };

    const addStar = () => {
      if (Math.random() < 0.05) {
        stars.push(createStar());
      }
      setTimeout(addStar, Math.random() * 2000 + 1000);
    };

    setInterval(addStar, 1500);

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star, index) => {
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.length, star.y + star.length / 2);
        ctx.stroke();

        star.x -= star.speed;
        star.y += star.speed / 2;

        if (star.x < -star.length || star.y > canvas.height) {
          stars.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }
}
