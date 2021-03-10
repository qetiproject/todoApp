import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Data } from '../shared/models/data';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit{
  addItem: FormGroup;
  dataList: Data[] = [];
  filteredData: Data[] = [];
  data: Data;
  jsonStr: any;
  inputText: string = "";
  enteredText: string = "";
  isFiltered: boolean = false;
  dataId: number = null;

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit() {
   this.getDataList();
   this.initForm();
  }

  initForm() {
    this.addItem = new FormGroup({
      name: new FormControl("", Validators.required),
      content: new FormControl("", Validators.required)
    })
  }

  getDataList() {
    this.dataService.getDataList().subscribe( res => {
      this.jsonStr = res;
      this.dataList = res.list;
    })
  }

  saveData() {
    this.dataId =  this.dataList.length;
    this.data = {
      id: this.dataId,
      title: this.addItem.controls.name.value,
      content: this.addItem.controls.content.value,
      done: false
    }

    if(this.addItem.valid) {
      this.dataList.push(this.data);
    }

  }

  filterData(enteredText: string) {
    this.dataList.forEach(data => {
      if (enteredText == data.title || enteredText == data.content) {
        this.isFiltered = true;
        this.filteredData =[];
        this.filteredData.push(data);
      } else if(enteredText == "") {
        this.isFiltered = false;
        this.getDataList();
      }
    })
  }

  removeData(data: Data) {
    this.dataList = this.dataList.filter(item => item != data);
  }

}
