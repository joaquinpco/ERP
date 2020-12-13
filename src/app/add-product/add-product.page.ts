import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  public currentNumber = 0;

  constructor() { }

  ngOnInit() {
  }

  private decrement()
  {
   if(this.currentNumber > 0)
    this.currentNumber--; 
  }

  private increment()
  {
    this.currentNumber++;
  }

  public newProduct()
  {

  }

}
