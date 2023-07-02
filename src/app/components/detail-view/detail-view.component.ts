import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css'],
})
export class DetailViewComponent implements OnInit {
  data: any;
  selectedRecord!: any;
  sampleData: any[] = [];
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpServiceService
  ) {}

  @Input() model!: {};

  fields = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({});
    this.getlistData();
  }

  createFormFields() {
    for (const field of this.sampleData) {
      this.form.addControl(field.Label, this.formBuilder.control(field.Value));
    }
  }

  getFieldType(fieldValue: any, fieldLabel?:any) {
    let inputType;
    switch (typeof fieldValue) {
      case 'string':
        inputType = 'Text';
        break;
      case 'number':
        inputType = 'number';
        break;
      case 'boolean':
        inputType = 'checkbox';
        break;
      default:
        inputType = 'text';
        break;
    }
    return inputType;
  }

  hasDecimalValue(value: any): any {
    if (typeof value == 'number' && !Number.isInteger(value)) {
      return 0.01;
    }
    return;
  }

  getlistData() {
    this.httpService.getData().subscribe(
      (response: any) => {
        this.data = response;
        this.selectRecordbyDefault()
      },
      (error) => {
        console.error('get error ', error);
      }
    );
  }

  selectRecordbyDefault() {
      const selectedRecord  = this.data?.Datas?.[0];
      this.showDetails(selectedRecord);
  }

  onCheckboxChange(event:any, fieldName:string) {
    const checked : boolean = event?.target?.checked;
    const myFieldControl = this.form.get(fieldName);
    if (myFieldControl) {
      myFieldControl.patchValue(checked)
    }
  }

  onNumberChange(event:any,fieldName:string) {
    const value = Number(event.target.value)
    const myFieldControl = this.form.get(fieldName);
    if (myFieldControl) {
      myFieldControl.patchValue(value)
    }
  }

  onSubmit() {
    this.data?.Datas?.map((samplingData:any) => {
        if (samplingData?.SamplingTime == this.selectedRecord?.SamplingTime) {
          samplingData.Properties.map((properties:any) => {
            const value = this.form.controls[properties?.Label].value
            properties["Value"] = value;  
          })
        }
    });
    const data = this.data;
    this.httpService.UpdateData(data).subscribe((response) => {
      console.log(response);
      window.alert("updated data successfully")
    })
  }

  update() {
    this.httpService.UpdateData({}).subscribe((response) => {
      console.log(response);
    });
  }

  showDetails(selectedRecord: any) {
    {
      this.selectedRecord = selectedRecord;
      this.sampleData = this.selectedRecord?.Properties;
      this.form = this.formBuilder.group({});;
      this.createFormFields();
    }
  }
}
