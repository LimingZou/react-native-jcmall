#!/usr/bin/python
# -*- coding: utf-8 -*-
import sys, os

from fontTools.ttLib import TTFont

tmpl = """{\n%s\n}"""

def main(fontFile, output):
	try:
		font = TTFont(fontFile)
		glyphMap = font["cmap"].getcmap(3,1).cmap
		tmp = "	"
		i = 0
		for k in glyphMap:
			tmp += '"%s":%s' % (glyphMap[k],k)
			i = i+1
			if i < len(glyphMap):
				tmp += ','
				tmp += '\n	'

		f=file(output,"w+")
		f.write(tmpl % tmp)
		f.close()
	except Exception, ex:
		print ex

def showHelp():
	print """
Iconfont map generator.

usage:
iconfont-maper <iconfont> <output>      generate map file from iconfont file .
iconfont-maper -h                       show this help.
"""

if __name__ == '__main__':
	if len(sys.argv) < 2:
		showHelp()
		sys.exit()

	if len(sys.argv) == 2 and sys.argv[1] == "-h":
		showHelp()
		sys.exit()

	if len(sys.argv) > 2:
		if os.path.exists(sys.argv[1]):
			main(sys.argv[1],sys.argv[2])
		else:
			print "Font file not found."

		sys.exit()

