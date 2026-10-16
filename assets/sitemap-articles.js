/* The reader sitemap consumes the same canonical inventory as homepage counts and All stories. */
(function(){
  'use strict';
  var grid=document.querySelector('[data-ga-sitemap-articles]');
  var articles=window.GA_ARTICLE_INVENTORY;
  if(!grid||!Array.isArray(articles))return;
  function prettyUrl(item){
    var raw=String(item.url||'');
    var match=raw.match(/(?:^|\/)assets\/([^/]+)\/index\.html(?:[?#].*)?$/)||raw.match(/(?:^|\/)\.\.\/([^/]+)\/index\.html(?:[?#].*)?$/);
    if(match)return '/'+match[1]+'/';
    if(/^\/[A-Za-z0-9][^\s]*\/$/.test(raw))return raw;
    return '/'+String(item.slug||'').replace(/^\/+|\/+$/g,'')+'/';
  }
  var fragment=document.createDocumentFragment();
  articles.forEach(function(item){
    if(!item||!item.slug||!item.title)return;
    var link=document.createElement('a');
    link.href=prettyUrl(item);
    link.textContent=item.title;
    fragment.appendChild(link);
  });
  if(fragment.childNodes.length)grid.replaceChildren(fragment);
})();
