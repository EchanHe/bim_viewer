import binascii, codecs , sys , re , os
#global AniFlag ,endFlag
AniFlag=False
endFlag=True

indent=0

path='../model/house.js'
fileRegex = re.compile("(.*\/)([^\/]+)(\.\w+)$")
fileName = fileRegex.match(path).group(2)
filePath = fileRegex.match(path).group(1)
fileExt = fileRegex.match(path).group(3)



f = open(path, 'r')
# f=[]

#print type(f.read())
# data=f.read()
# data.strip('\n')
#print f.read()
data=[""]*20
index = 0
a=False
d=""
head = ""
splitFlag = False
firSlice = False
for i, line in enumerate(f):
   # if a ==True:
    #    data+=line
    if i ==0:
        continue

    AniBeg = re.compile("  \"" )
    AniSplit = re.compile("    (]|})" )
    AniEnd = re.compile("  (]|})" )
#    
    if AniBeg.match(line) != None:
        print "beg" , i+1 , line 
        head = line
        line ="{" +line
        firSlice = True

    
    if AniEnd.match(line) != None:
        print "end" , i+1 , line 
        # if AniEnd.match(line).group(1) =="]":
        #     print line  
        if line.find(',') != -1:
            line = line[:line.find(','):]
            print 'has comma,' , line
        line = line+"}"
#        AniFlag=True
#        endFlag=False
#        indent =  len( AniBeg.match(line).group(1))
#
#        print   len( AniBeg.match(line).group(1))
#        print AniBeg.match(line).group()
#    if AniFlag ==True:
#        end = re.compile("^\\t{" +str(indent ) + "}}") 
#        if end.match(line)!=None:
#            print "end",end.match(line).group(), i
#            AniFlag = False
#            endFlag=True
    
    


    if sys.getsizeof(d) > 100000000:
        splitFlag = True
        

    if splitFlag ==True and AniSplit.match(line) !=None:
        if line.find(',') != -1:
            line = line[:line.find(','):]
            print 'has comma,' , line

    d +=line    
    if splitFlag ==True and AniSplit.match(line) !=None:
        # if line.find(',') != -1:
        #     line = line[:line.find(','):]
        #     print 'has comma,' , line
        if firSlice !=True:
            print "index" , index, "give head" , head 
            d="{" + head + d

        d = d +"] }"

        # add head of json in it
        #

      #  print "line" , i , line

        data[index] = d
       # print "size" , sys.getsizeof(data[index])

        index+=1
        d=""
        splitFlag = False
        firSlice =False
        continue



    if AniEnd.match(line) != None:
        if firSlice ==False:
            d="{" + head + d
        data[index] = d
        print "size" , sys.getsizeof(data[index])

        index+=1
        d=""
        splitFlag = False
#    result = re.match("^\t*AnimationCurve.+" , line)
#    if result != None:
       # data+=line

data = data[:index]

print sys.getsizeof(data)

f.close()




#print data.decode("hex")
# a=binascii.unhexlify(data)
# # print data
# # data.replace("\n")

# asc=''.join(chr(int(data[i:i+2], 16)) for i in range(0, len(data), 2))
# #print asc

# f.close()
outPath= filePath+fileName+"/"
try:
    os.stat(outPath)
except:
    os.mkdir(outPath)


for i, d in enumerate(data):

    print "in side"

    out= outPath + fileName + str(i) + fileExt
    f1 = open(out , 'w')
    #print a.encode('hex')
    #f1.write(a)
    #print binascii.a2b_hex(data)
    #print asc
    f1.write(data[i])
    f1.close()


    # out='outAsc.fbx'
    # f1 = open(out , 'w')
    # #print a.encode('hex')
    # #f1.write(a)
    # #print binascii.a2b_hex(data)
    # #print asc
    # f1.write(data)
    # f1.close()
