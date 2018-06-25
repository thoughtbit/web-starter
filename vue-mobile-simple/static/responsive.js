/* eslint-disable */
/**
 * 默认设置设计稿宽度为750，最大宽度为750
 * 最大宽度: maxWidth
 * 自定义设计稿的宽度: designWidth
 */
;(function (win, lib, maxWidth, designWidth) {
	var flexible = lib.flexible || (lib.flexible = {});
	var doc = win.document;
	var docEl = doc.documentElement;
	var remStyleEl = doc.createElement('style');
	var tid;
	// 基准像素
	var baseFontSize = 100;
	// 像素比
	var dpr = win.devicePixelRatio || 1;
	var rem = 50;

	function refreshRem() {
		var width = docEl.getBoundingClientRect().width;
		maxWidth = maxWidth || 540;
		width>maxWidth && (width=maxWidth);
		rem = width * baseFontSize / designWidth;
		remStyleEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';
	}

	if (docEl.firstElementChild) {
		docEl.firstElementChild.appendChild(remStyleEl);
	} else {
		var wrap = doc.createElement('div');
		wrap.appendChild(remStyleEl);
		doc.write(wrap.innerHTML);
		wrap = null;
	}

  refreshRem();

	win.addEventListener('resize', function() {
    // 防止执行两次
		clearTimeout(tid);
		tid = setTimeout(refreshRem, 300);
	}, false);

	win.addEventListener('pageshow', function(e) {
    // 浏览器后退的时候重新计算
		if (e.persisted) {
			clearTimeout(tid);
			tid = setTimeout(refreshRem, 300);
		}
	}, false);

	if (doc.readyState === 'complete') {
		doc.body.style.fontSize = '16px';
	} else {
		doc.addEventListener('DOMContentLoaded', function(e) {
			doc.body.style.fontSize = '16px';
		}, false);
  }

  flexible.dpr = win.dpr = dpr;
  flexible.rem = win.rem = rem;
})(window, window.lib || (window.lib = {}), 750, 750);
