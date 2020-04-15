import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
      .width_60px {
        width: 60px;
      }
      .pointer {
        cursor: pointer;
      }
    `
  ]
})

export class DashboardComponent implements OnInit {
  currentNum: any = [];
  testNum: any = ['', '', '', '', '']
  winningNum: any = { A: ['01', '02', '07', '31', '09'], B: ['07', '04'] };
  constructor(private http: _HttpClient) { }

  ngOnInit(): void {
    this.currentNum.push({ A: ['', '', '', '', ''], B: ['', ''], resA: '', resB: '' });
  }

  // 新增
  createNum() {
    this.currentNum = [...this.currentNum, { A: ['', '', '', '', ''], B: ['', ''], resA: '', resB: '' }];
  }

  // 删除
  removeNum(index: number) {
    if (this.currentNum.length > 1) this.currentNum.splice(index, 1);
  }

  // 清空
  emptyNum(index: number) {
    this.currentNum[index].A = this.currentNum[index].A.map(x => x = '');
    this.currentNum[index].B = this.currentNum[index].B.map(x => x = '');
    this.currentNum[index].resA = '';
    this.currentNum[index].resB = '';
  }

  // 输入数字
  onChangeNum(type: any, area: any, val: any, i: number, j?: number) {
    if (type === 'buy') {
      val < 10 ? this.currentNum[i][area][j] = `0${val}` : this.currentNum[i][area][j] = `${val}`;
      console.log(this.currentNum);
    } else {
      val < 10 ? this.winningNum[area][i] = `0${val}` : this.winningNum[area][i] = `${val}`;
      console.log(this.winningNum);
    }
  }

  // 查询
  onQuery() {
    this.currentNum.forEach(numArr => {
      numArr.resA = '';
      const winArr: any = [];
      const winBrr: any = [];
      numArr.A.forEach(numA => {
        this.winningNum.A.forEach(winNumA => {
          if (numA === winNumA) {
            winArr.push(winNumA);
            this.currentNum[this.currentNum.findIndex((element) => element === numArr)].resA = `A区中奖号码${winArr}，个数${winArr.length}；`
          }
        })
      });
      numArr.B.forEach(numB => {
        numArr.resB = '';
        this.winningNum.B.forEach(winNumB => {
          if (numB === winNumB) {
            winBrr.push(winNumB);
            this.currentNum[this.currentNum.findIndex((element) => element === numArr)].resB = `B区中奖号码${winBrr}，个数${winBrr.length}；`
          }
        })
      });
    })
  }

}