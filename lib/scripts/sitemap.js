var xmlhttp, xmlDoc;
xhr = new XMLHttpRequest();
xhr.open("GET", "/sitemap.xml", false);
xhr.send();
sitemapXML = xhr.responseXML;

var sitemapHTML = $(".sitemap");
var sitemapUrls = sitemapXML.getElementsByTagName("url");
var loc;
var anchor;
for (i = 0; i < sitemapUrls.length; i++){
    loc = sitemapUrls[i].getElementsByTagName("loc")[0].childNodes[0].nodeValue;
    anchor = $("<a></a>").attr("href", loc).html(loc.replace("http://", "").replace(".html", ""));
    sitemapHTML.append(anchor);
    sitemapHTML.append("<br/>")
}