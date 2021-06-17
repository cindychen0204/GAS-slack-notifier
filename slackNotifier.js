const slackPostUrl = "SLACK　ワークフローURL";

/*
   ボタンクリックするとSlackに通知する処理
   送られてきたURLは日本語が入っているためエンコードしている
  　
    パラメータ page: どのページが更新されたか
    パラメータ url: 該当ページのURL
*/
function notifyslack(page, url, comment) {
    let send_comment = comment ? "コメント： " + comment + "\n" : "";
    let jsonData = {
        "title": "ページ「" + page + "」が更新されていました。\n",
        "url": encodeURI(url),
        "comment": send_comment
    };

    let payload = JSON.stringify(jsonData);
    let options = {
        "method": "post",
        "contentType": "application/json",
        "payload": payload
    };

    UrlFetchApp.fetch(slackPostUrl, options);
    Logger.log("Send a message to Slack : \n" + jsonData.content);
}