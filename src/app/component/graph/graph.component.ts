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
      x: this.graphData[0].x,
      y: this.graphData[0].y,
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
      x: this.graphData[1].x,
      y: this.graphData[2].y,
      mode: 'lines+markers',
      name: 'Europe',
      text: ['Germany', 'Britain', 'France', 'Spain', 'Italy', 'Czech Rep.', 'Greece', 'Poland'],
      marker: {
        color: 'rgb(255, 217, 102)',
        size: 12
      },
     
    };
    
    var trace3 = {
      x: this.graphData[2].x,
      y: this.graphData[2].y,
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
      x: this.graphData[3].x,
      y: this.graphData[3].y,
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
