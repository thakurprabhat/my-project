import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent implements OnInit {
  samplingData!:any;
  tableHeader:any = [
    {
      key: 'samplingtime',
      value: 'Sampling Time',
    },
    {
      key: 'projectname',
      value: 'Project Name',

    },
    {
      key: 'constructioncount',
      value: 'Construction Count'
    },
    {
      key: 'isconstructioncompleted',
      value: 'Is Construction Completed'
    },
    {
      key: 'lengthoftheroad',
      value: 'Length of the road'
    }
  ]
  constructor(private httpService: HttpServiceService) { }

  ngOnInit(): void {
    this.getlistData();
  }

  getlistData() {
    this.httpService.getData().subscribe((response:any)=>{
      this.samplingData = response?.Datas;
    },(error => {
      console.error("get error ",error);
    }));
  }

  displayValue(header:any, innerData:any) {
    let dataKey = innerData?.Label.replace(/\s/g, "").toLowerCase();
    if (header?.key == dataKey) {
      return innerData?.Value
    }
  }
}
