import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import * as jsonData from 'src/assets/data.json';

interface Restaurant {
  name: string;
  image: string;
}

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.scss']
})


export class RouletteComponent implements AfterViewInit {
  @ViewChild('figure') figure: ElementRef;
  @ViewChild('nav') nav: ElementRef;
  private imageNodes: any[];
  private n: number;
  private gap = 0;
  private currImage = 0;
  private theta: number;
  // private bfc = true;
  public images: Restaurant[];

  constructor(){
    this.images = jsonData.map(x => x as Restaurant);
  }
 
  ngAfterViewInit(): void {
    this.imageNodes = this.figure.nativeElement.children;
    this.n = this.imageNodes.length;
    this.theta =  2 * Math.PI / this.n;
  
    this.setupCarousel(this.n, parseFloat(getComputedStyle(this.imageNodes[0]).width));	    
  }

  public onClick(e: Event){
    e.stopPropagation();
    let n = Math.floor((Math.random() * 70) + 31);
    this.rotate(n);
  }

  private setupCarousel(n: number, s: number) {
    let apothem = s / (2 * Math.tan(Math.PI / n));
    this.figure.nativeElement.style.transformOrigin = `50% 50% ${- apothem}px`;
    for (var i = 0; i < n; i++)
        this.imageNodes[i].style.padding = `${this.gap}px`;
    for (i = 1; i < n; i++) {
        this.imageNodes[i].style.transformOrigin = `50% 50% ${- apothem}px`;
        this.imageNodes[i].style.transform = `rotateY(${i * this.theta}rad)`;
    }
    // if (this.bfc){
      for (i = 0; i < n; i++) {
        this.imageNodes[i].style.backfaceVisibility = 'hidden';
      }
    // }
    
    this.rotateCarousel(this.currImage);
  }

  private rotateCarousel(imageIndex: number) {
    this.figure.nativeElement.style.transform = `rotateY(${imageIndex * -this.theta}rad)`;
  }

  private rotate(n = 1){
    for (let i =0; i < n; i++){
      this.currImage++;
      this.rotateCarousel(this.currImage);
    }
  }
}

