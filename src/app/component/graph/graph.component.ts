import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

declare var Plotly: any;
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  graphData: any;
  @ViewChild('plotlyChart', { static: true }) plotlyChart!: ElementRef;
  constructor(
    private _empService: EmployeeService,
  ) {}
 
  ngOnInit(): void {
    this.getGraphData();
    
    
  }
  getGraphData() {
    this._empService.getGraphData().subscribe({
      next: (res) => {
        this.graphData = res;
        console.log("cc",this.graphData);
        if(this.graphData){
          this.plot();
        }
      },
      error: console.log,
    });
  }
  plot() {
    const element = this.plotlyChart.nativeElement;
    var trace1 = {
      x: [52698, 43117],
      y: [53, 31],
      mode: 'lines',
      name: 'North America',
      text: ['United States', 'Canada'],
      marker: {
        color: 'rgb(164, 194, 244)',
        size: 12,
        line: {
          color: 'white',
          width: 0.5
        }
      },
      
    };
    
    var trace2 = {
      x: [39317, 37236, 35650, 30066, 29570, 27159, 23557, 21046, 18007],
      y: [33, 20, 13, 19, 27, 19, 49, 44, 38],
      mode: 'lines+markers',
      name: 'Europe',
      text: ['Germany', 'Britain', 'France', 'Spain', 'Italy', 'Czech Rep.', 'Greece', 'Poland'],
      marker: {
        color: 'rgb(255, 217, 102)',
        size: 12
      },
     
    };
    
    var trace3 = {
      x: [42952, 37037, 33106, 17478, 9813, 5253, 4692, 3899],
      y: [23, 42, 54, 89, 14, 99, 93, 70],
      mode: 'lines',
      name: 'Asia/Pacific',
      text: ['Australia', 'Japan', 'South Korea', 'Malaysia', 'China', 'Indonesia', 'Philippines', 'India'],
      marker: {
        color: 'rgb(234, 153, 153)',
        size: 12
      },
      type: 'scatter'
    };
    
    var trace4 = {
      x: [19097, 18601, 15595, 13546, 12026, 7434, 5419],
      y: [43, 47, 56, 80, 86, 93, 80],
      mode: 'line+markers',
      name: 'Latin America',
      text: ['Chile', 'Argentina', 'Mexico', 'Venezuela', 'Venezuela', 'El Salvador', 'Bolivia'],
      marker: {
        color: 'rgb(142, 124, 195)',
        size: 12
      },
      type: 'scatter'
    };
    
    var data = [trace1, trace2, trace3, trace4];
    
    var layout = {
      title: 'Quarter 1 Growth',
      xaxis: {
        title: 'GDP per Capita',
        showgrid: false,
        zeroline: false
      },
      yaxis: {
        title: 'Percent',
        showline: false
      }
    };

    Plotly.newPlot(element, data, layout);
  }
  
}
