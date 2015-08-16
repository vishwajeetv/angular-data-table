import { TranslateXY } from './translate';

let map = new Map();
let rows = [];

export function updateRowData(newRows){
  rows = newRows;
};

export function updateRows() {

  ///var items = await fetchAsync('http://example.com/users');
  /*return await* map.map(async(item) => {
    return {
      title: item.title, 
      img: (await fetchAsync(item.userDataUrl)).img
    }
  }); */

  
  let n = 0;
  while (n <= map.size) {
    let dom = map.get(n);
    let model = rows[n];
    if(dom){
      console.log(model)
      TranslateXY(dom[0].style, 0, model.$$index * 50);
    }
    n++;
  }
}

export function registerDOM(idx, dom){
      //TranslateXY(dom[0].style, 0, idx * 50);
  dom[0].style.top = idx * 50 + 'px';
  //map.set(idx, dom);
}
