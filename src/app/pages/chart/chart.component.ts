import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartService } from '../../services/chart.service';


import { Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  barChartOptions: any = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  barChartLabels: Label[] = ['M', 'F', 'O'];
  barChartType: any = 'bar';
  barChartLegend = true;

  barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Generos %' }
  ];





  pieChartOptions: any = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  pieChartLabels: Label[] = [];
  pieChartData: number[] = [300, 500, 100];
  pieChartType: any = 'pie';
  pieChartLegend = true;
  pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];


  constructor(private chartSvc: ChartService) { }

  ngOnInit() {
    this.onBuildChartBar();
    this.onBuildChartPie();
  }

  onBuildChartBar() {
    this.chartSvc.onChartBar().subscribe( (res) => {
      if (!res.ok) {
        throw new Error( res.error );
      }
      const arr: any[] = res.data;
      let totalItems = 0;
      arr.forEach( (item) => {
        totalItems += item.total;
      });

      this.barChartData[0].data = [];
      this.barChartLabels = [];
      arr.forEach( (item) => {
        item.percent = Number( ((100 * item.total) / totalItems).toFixed(2) );
        this.barChartData[0].data.push( item.percent );
        this.barChartLabels.push(item.sex);
      });
      // console.log(this.chartOptions.series);
    });
  }

  onBuildChartPie() {
    this.chartSvc.onChartPie().subscribe( (res) => {
      if (!res.ok) {
        throw new Error( res.error );
      }
      const arr: any[] = res.data;
      let totalItems = 0;
      arr.forEach( (item) => {
        totalItems += item.total;
      });

      this.pieChartLabels = [];
      this.pieChartData = [];
      arr.forEach( (item) => {
        item.percent = Number( ((100 * item.total) / totalItems).toFixed(2) );
        this.pieChartData.push( item.percent );
        this.pieChartLabels.push(`${ item.pensionSystem } %`);
      });
      // console.log(this.chartOptions.series);
    });
  }

}
