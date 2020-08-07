function parseExcel() {
  const xlsx = require('xlsx');
  const fs = require('fs');
  const excel = xlsx.readFile('map.xlsx');
  const sheetName = excel.SheetNames[0];
  const firstSheet = excel.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(firstSheet, { defval : "" });

  const latlng = jsonData.map((data, index) => {
    return { 
      dong: data['동명'],
      index: index + 2,
      roadName: data['소재지도로명주소'],
      name: data['설치장소'],
      lat: data['위도'], 
      lng: data['경도']
    }
  });

  fs.writeFile('./public/latlng.json', JSON.stringify(latlng), 'utf8', () => {
    console.log('Done');  
  });
}

module.exports = parseExcel;
