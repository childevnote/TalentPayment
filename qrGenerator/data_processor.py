import qrcode
import random
import os

def main():
    filepath = "./data/"
    # filename = "participants.txt"
    filename = "addition.txt"
    # filename = "test.txt"

    qrFilename = ""
    qrNames = []

    writeFilename = "./list.txt"
    if os.path.exists(writeFilename):
        os.remove(writeFilename)
    
    duplicateChecker = []
    if os.path.exists("./images"):
        filesInImages = os.listdir("./images")
        generatedImages = []
        for file in filesInImages:
            if file[-4:] == ".png":
                generatedImages.append(file)
        for image in generatedImages:
            number = image[-8:-4]
            duplicateChecker.append(number)

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
            team, name, bod_or_role, isTeacher, bod = line.split("\t")

            bod_or_role = "선생님" if bod_or_role == "교사 혹은 스태프" else bod_or_role

            if isTeacher == "TRUE":
                qrFilename = f"{name}_{bod_or_role}"
            else:
                if bod[-1:] == "\n":
                    qrFilename = f"{name}_{bod[:-1]}"
                else:
                    qrFilename = f"{name}_{bod}"

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
            # newImg.save(f"images/{qrFilename}_{newId}.png")
            newImg.save(f"additionalImages/{qrFilename}_{newId}.png")
        
        fs.close()
    
    with open(writeFilename, "+w") as fs:
        for data in qrNames:
            fs.write(f"{data}\n")
        fs.close()

    return True

if __name__ == "__main__" :
    main()