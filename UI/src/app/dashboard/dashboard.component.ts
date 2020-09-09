import { Component, OnInit } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';
import { CommonService } from '../shared/common.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  getJharkhandDistrict = [];
  json: {};
  arra = [];
  gridOptions;
  states: String;
  stateList: any = [];
  totalConfirmedCase: Number;
  totalDeceasedCase: Number;
  totalRecoveredCase: Number;
  totalTestedCase: Number;
  domLayout = 'autoHeight';
  columnDefs = [
    { headerName: 'District', field: 'district', cellClass: 'district-table' },
    { headerName: 'Active', field: 'active', cellClass: 'district-table' },
    { headerName: 'Confirmed', field: 'confirmed', cellClass: 'district-table' },
    { headerName: 'Deceased', field: 'deceased', cellClass: 'district-table' },
    { headerName: 'Recovered', field: 'recovered', cellClass: 'district-table' }
  ];
  rowData: any = [];
  statename: string;
  statecode: any;
  defaultColDef;
  private gridApi;
  constructor (private commonService: CommonService) {
    this.defaultColDef = { resizable: true };
  }

  ngOnInit(): void {
    this.getIndiaData();
    this.getStateWiseData();
    this.getDistrictWiseData();

    this.statename = 'India'
    // this.statecode = 'JH'
  }



  getDistrictWiseData() {
    this.commonService.getData().subscribe((data) => {
      var obj = data;
      var finObj;
      var stateObj;
      var result = [];
      var stateResult = [];
      var state;
      let name = this.statename
      Object.keys(obj).forEach(function (k) {
        // console.log(k + ' - ' + obj[k]);
        stateObj = {
          abbreviation: obj[k].statecode,
          name: k
        }
        stateResult.push(stateObj);
        if (k == name) {
          state = k;
          var anotherObj = obj[k].districtData;
          Object.keys(anotherObj).forEach(function (k) {
            // console.log(k + ' - ' + anotherObj[k]);
            finObj = {
              district: k,
              active: anotherObj[k].active,
              confirmed: anotherObj[k].confirmed,
              deceased: anotherObj[k].deceased,
              recovered: anotherObj[k].recovered,
            }
            result.push(finObj);
          })

        }

      });
      this.stateList = stateResult;
      this.rowData = result;
      this.states = state;
    })
  }

  getStateWiseData() {
    this.commonService.getStateWiseData().subscribe((data) => {
      // console.log(data);
      var obj = data;
      var stateConfirmed;
      var stateDeceased;
      var stateRecovered;
      var stateTested;
      let code = this.statecode
      Object.keys(obj).forEach(function (k) {
        if (k == code) {
          var anotherObj = obj[k].total;
          stateConfirmed = anotherObj.confirmed;
          stateDeceased = anotherObj.deceased;
          stateRecovered = anotherObj.recovered;
          stateTested = anotherObj.tested;
        }
      })
      this.totalConfirmedCase = stateConfirmed;
      this.totalDeceasedCase = stateDeceased;
      this.totalRecoveredCase = stateRecovered;
      this.totalTestedCase = stateTested;
    })
  }

  getIndiaData() {
    this.commonService.getIndiaData().subscribe((data) => {
      console.log(data)
      var obj = data[0];
      var stateobj = data[1].state_data;
      var finStateObj;
      var result = [];
      this.totalConfirmedCase = obj.confirmed_cases;
      this.totalDeceasedCase = obj.death_cases;
      this.totalRecoveredCase = obj.recovered_cases;
      this.totalTestedCase = obj.passengers_screened;
      Object.keys(stateobj).forEach(function (k) {
        finStateObj = {
          district: stateobj[k].state,
          active: stateobj[k].active,
          confirmed: stateobj[k].confirmed,
          deceased: stateobj[k].deaths,
          recovered: stateobj[k].recovered,
        }
        result.push(finStateObj);
      })
      this.rowData = result;

    })
  }

  selected(event: MatSelectChange) {
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };
    this.statename = selectedData.text;
    this.statecode = selectedData.value;
    // console.log(this.statename)
    this.getDistrictWiseData()
    this.getStateWiseData()
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

}
