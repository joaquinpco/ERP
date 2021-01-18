import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage implements AfterViewInit {
  
  @ViewChild('barCanvas') private barCanvas: ElementRef;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  constructor(
    public loadingController: LoadingController
  ) { }

  ngAfterViewInit() {
    
  }

  async ionViewWillEnter()
  {
    this.barChartMethod();
  }

  async barChartMethod() {

    const loader = await this.loadingController.create({ message: "Loading chart, please wait ..." });

    loader.present();

    let allSales = await API.get('ERP', '/erp/sales', {});
    let allPurchasing = await API.get('ERP', '/erp/purchasings', {});

    let purchasing = 0;
    let sales = 0;
    
    for(let sale of allSales)
    {
      sales += sale.total; 
    }

    for(let purchase of allPurchasing)
    {
      purchasing += purchase.cantidad * purchase.precio_ud;
    }

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['PURCHASING', 'SALES'],
        datasets: [{
          label: 'Total in €',
          data: [purchasing, sales],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    
    loader.dismiss();

  }


  
}


