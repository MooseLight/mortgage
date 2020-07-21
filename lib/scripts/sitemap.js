var xmlhttp, xmlDoc;
xhr = new XMLHttpRequest();
xhr.open("GET", "/sitemap.xml", false);
xhr.send();
sitemapXML = xhr.responseXML;

var sitemapHTML = $(".sitemap");
var sitemapUrls = sitemapXML.getElementsByTagName("url");
var anchor = "";
var loc = "";
var display = "";
for (i = 0; i < sitemapUrls.length; i++){
    loc = sitemapUrls[i].getElementsByTagName("loc")[0].childNodes[0].nodeValue;
    if (sitemapUrls[i].getElementsByTagName("display")[0].childNodes[0] != undefined){
        display = sitemapUrls[i].getElementsByTagName("display")[0].childNodes[0].nodeValue;
    }
    anchor = $("<a></a>").attr("href", loc).html("calculatorsforlife/" + display);
    sitemapHTML.append(anchor);
    sitemapHTML.append("<br/>")
}