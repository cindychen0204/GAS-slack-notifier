/*
  各ボタンが紐づけるリンクをスプレッドシートに一括更新
*/
function GenerateUrl() {
    var url = "";
    var idx = sheetUrlsIndexFrom;
    urlsArray.forEach(function (item) {
        url = deploymentUrl + query + item;
        sheet.getRange(urlColumn + idx).setValue(url);
        idx++;
    });
}
