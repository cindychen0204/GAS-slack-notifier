//URLは常時更新必要です
const deploymentUrl = "このアプリのURL/exec"
const sheet = SpreadsheetApp.openByUrl("スプレッドシートURL");
const siteUrl = "埋め込み先としたいサイトURL(GoogleSiteなど)"

const query = "?where="
const sheetUrlsIndexFrom = 2;
const sheetUrlsIndexTo = 20;
const sheetUrlsColumn = "A";
const urlColumn = "B";
const siteUrlColumn = "C";
const updateColumn = "D";
const testColumn = "E";
const sheetUrlsRange = sheetUrlsColumn + sheetUrlsIndexFrom + ":" + sheetUrlsColumn + sheetUrlsIndexTo;
const urlsArray = sheet.getRange(sheetUrlsRange).getValues().toString().split(',');
const now = new Date();

/*
  アクセスするときに処理
  　
   パラメータ e  ー　Web　query
   変数 where ―　ページ名
   変数 url －　現在ディプロイのURL（常に最新である必要がある）
*/
function doGet(e) {
  console.log(e);
  var where = e.parameter.where;
  var toppage = HtmlService.createTemplateFromFile("index");
  toppage.where = where;
  toppage.url = deploymentUrl;
  var html = toppage.evaluate();
  return html;
}

/*
  ボタンクリックされるときに処理
    スプレッドシートに該当するページの更新日時を入れ
    Slackに通知する
  　
   パラメータ e  ー　Web　post パラメータ
   変数 where ―　ページ名
   変数 idx －　スプレッドシートAカラムの何番目にあたるか
   変数 url －　現在ディプロイのURL（常に最新である必要がある）＋ ページ名情報
*/
function doPost(e) {
  console.log(e);
  var where = e.parameter.where;
  var comment = e.parameter.comment;
  var idx = urlsArray.indexOf(where) + sheetUrlsIndexFrom;
  var url = siteUrl + where;
  if (where != "") sheet.getRange(updateColumn + idx).setValue(now);
  notifyslack(where, url, comment);
}