// ページの一部だけをreloadする方法
// Ajaxを使う方法
// XMLHttpRequestを使ってAjaxで更新
function ajaxUpdate(url, element) {
 
    // urlを加工し、キャッシュされないurlにする。
    url = url + '?ver=' + new Date().getTime();
 
    // ajaxオブジェクト生成
    var ajax = new XMLHttpRequest;
 
    // ajax通信open
    ajax.open('GET', url, true);
 
    // ajax返信時の処理
    ajax.onload = function () {
 
        // ajax返信から得たHTMLでDOM要素を更新
        element.innerHTML = ajax.responseText;
    };
 
    // ajax開始
    ajax.send(null);
}
 
window.addEventListener('load', function loop() {
 
    var url = "ajax";
 
    var div = document.getElementById('ajaxreload');
	ajaxUpdate(url, div);
	setTimeout(loop,1000);
});