import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
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
  inputText: string = "";
  enteredText: string = "";
  isFiltered: boolean = false;
  dataId: number = null;

  constructor(
    public alertController: AlertController,
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
    this.presentAlertMultipleButtons(data);
  }

  async presentAlertMultipleButtons(data: Data) {
    await this.alertController.create({
      header: "Are you share?",
      message: `You are about to delete item ${data.id}`,
      buttons: [
        {
          text: "cancel",
        },
        {
          text: "delete", handler: (res) => {
            this.dataList = this.dataList.filter(item => item != data);
          }
        }
      ]
    }).then(res => res.present());
  }

}
