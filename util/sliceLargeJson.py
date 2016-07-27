import binascii, codecs , sys , re , os
upperSize = 100000000

indent=0

path='../model/house.js'
fileRegex = re.compile("(.*\/)([^\/]+)(\.\w+)$")
fileName = fileRegex.match(path).group(2)
filePath = fileRegex.match(path).group(1)
fileExt = fileRegex.match(path).group(3)

jsonType = ["geo" , "else" , "else" , "else"]

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

objCount=0

geoRegex = re.compile(".*geometries.*" , re.I )
AniBeg = re.compile("  \"" )
AniSplit = re.compile("    (]|})" )
AniEnd = re.compile("  (]|})" )

status =None


def removeComma(line):
    if line.find(',') != -1:
        line = line[:line.find(','):]
    return line



for i, line in enumerate(f):
   # if a ==True:
    #    data+=line
    # if i ==0:
    #     continue


#    
    if AniBeg.match(line) != None:
        if (geoRegex.match(line) != None):
            status = jsonType[0]
        else:
            status = jsonType[1]

        print "beg" , i+1 , line 
        head = line
        if i >10:
            line ="{" +line
        firSlice = True

    # if AniEnd.match(line) != None:     
    #     objCount+=1
    
    


    if sys.getsizeof(d) > upperSize:
        splitFlag = True


    ##############
    # find split part
    ##########        
    if splitFlag ==True and AniSplit.match(line) !=None:
        # if line.find(',') != -1:
        #     line = line[:line.find(','):]
        #     print 'has comma,' , line
        line = removeComma(line)
        d +=line    
        if firSlice !=True:
            print "index" , index, "give head" , head 
            d="{" + head + d

        d = d +"] }"

        print "in not last split file"
        data[index] = d
       # print "size" , sys.getsizeof(data[index])

        index+=1
        d=""
        splitFlag = False
        firSlice =False
        continue



    if AniEnd.match(line) != None :
        line = removeComma(line)

        line = line+"}"

        d +=line 
        if firSlice ==False:
            d="{" + head + d
        data[index] = d
        # print "in last split file"

        index+=1
        d=""
        splitFlag = False
        continue
    # if objCount==4 and index!=0:
    #     print "in last file"

    #     d="{" +d
    #     data[index]=d

    #     index+=1
    #     d=""
    #     continue

    d +=line    

#    result = re.match("^\t*AnimationCurve.+" , line)
#    if result != None:
       # data+=line
if index ==0:
    data[0]=d
    index = 1




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

print "Output data length" , len(data)
for i, d in enumerate(data):

    
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
