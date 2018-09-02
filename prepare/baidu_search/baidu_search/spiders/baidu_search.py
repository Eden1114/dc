# coding:utf-8

import sys
#reload(sys)
#sys.setdefaultencoding( "utf-8" )

import scrapy

class BaiduSearchSpider(scrapy.Spider):
    name = "baidu_search"
    allowed_domains = ["baidu.com"]
    start_urls = [
            "https://www.baidu.com/s?wd=机器学习"
    ]

#    def parse(self, response):
#        print(response.body)

    def parse(self, response):
            filename = "result.html"
            with open(filename, 'wb') as f:
                f.write(response.body)