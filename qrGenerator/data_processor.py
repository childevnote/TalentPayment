import qrcode
import random

def main():
    filepath = "./data/"
    # filename = "participants.txt"
    filename = "test.txt"

    qrFilename = ""

    with open(f"{filepath}{filename}", mode="+r") as fs:
        curIdx = 0
        for line in fs:
            if curIdx == 0:
                curIdx += 1
                continue
            else:
                newData = line.split("\t")

                if newData[3] == "TRUE":
                    qrFilename = f"{newData[1]}_선생님"
                else:
                    if newData[4][-1:] == "\n":
                        qrFilename = f"{newData[1]}_{newData[4][:-1]}.png"
                    else:
                        qrFilename = f"{newData[1]}_{newData[4]}.png"

                curIdx += 1
            
            newId = int(random.random()*1000)+1000*random.randint(1, 9)
            newImg = qrcode.make(f"{newId}")
            newImg.save(f"images/{qrFilename}_{newId}.png")

    return True

if __name__ == "__main__" :
    main()