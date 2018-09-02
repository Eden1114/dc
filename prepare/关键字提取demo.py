# coding:utf-8

'''
关键字提取demo
'''

import pynlpir

pynlpir.open()
s = '怎么才能把电脑里的垃圾文件删除'

key_words = pynlpir.get_key_words(s, weighted=True)
for key_word in key_words:
    print(key_word[0], '\t', key_word[1])
pynlpir.close()