import qrcode
import random
import os

def main():
    filepath = "./data/"
    filename = "participants.txt"
    # filename = "test.txt"

    qrFilename = ""
    qrNames = []

    writeFilename = "./list.txt"
    if os.path.exists(writeFilename):
        os.remove(writeFilename)
    
    duplicateChecker = ["3890"]

    ##
    # Data Format : dividing with tab(\t)
    # team, name, role or bod, isTeacher, bod(if teacher, null)
    #
    # ex - teacher
    # 1	아무개	교사 혹은 스태프	TRUE	
    #
    # ex - student
    # 1	야무개	고2(06년생)	FALSE	06년생
    ##
    with open(f"{filepath}{filename}", mode="+r") as fs:
        for line in fs:
            newData = line.split("\t")

            if newData[3] == "TRUE":
                qrFilename = f"{newData[1]}_선생님"
            else:
                if newData[4][-1:] == "\n":
                    qrFilename = f"{newData[1]}_{newData[4][:-1]}"
                else:
                    qrFilename = f"{newData[1]}_{newData[4]}"

            qrNames.append(qrFilename)
            
            newId = 1000

            while True:
                newId = int(random.random()*1000)+1000*random.randint(1, 9)
                if f"{newId}" in duplicateChecker:
                    continue
                else:
                    duplicateChecker.append(f"{newId}")
                    break

            newImg = qrcode.make(f"{newId}")
            newImg.save(f"images/{qrFilename}_{newId}.png")
        
        fs.close()
    
    with open(writeFilename, "+w") as fs:
        for data in qrNames:
            fs.write(f"{data}\n")
        fs.close()

    return True

if __name__ == "__main__" :
    main()