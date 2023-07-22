from PIL import ImageFont, ImageDraw, Image
import cv2
import os
import numpy as np

# 3126 * 4689

def main():
    dataSourcePath = "./data"
    fontPath = "./fonts"
    fontName = "BMDOHYEON_ttf.ttf"
    # qrPath = "./images"
    qrPath = "./additionalImages"

    # outPath = "./namecards"
    outPath = "./additionalNamecards"

    # textFilename = "participants.txt"
    textFilename = "addition.txt"
    teams = []

    files = os.listdir(f"{qrPath}/")

    images = []
    for file in files:
        if file[-4:] == ".png":
            images.append(file)

    for i in range(11):
        teams.append([])
    
    with open(f"{dataSourcePath}/{textFilename}", "+r") as f:
        for line in f:
            newPerson = line.split("\t")
            newTeam = int(newPerson[0] if newPerson[0] != "-" else 0)
            newName = newPerson[1]
            
            if newTeam != 0:
                teams[newTeam - 1].append(newName)
        f.close()
    
    bods = ["10년생", "09년생", "08년생", "07년생", "06년생", "05년생"]
    grades = ["중1", "중2", "중3", "고1", "고2", "고3"]

    # images = ["아무개_년생_아이디.png"]
    
    for image in images:
        qrFileName = image
        name, bod, id = qrFileName.split("_")
        id = id[:-4]

        print(f"{name} 명찰을 만들기 시작합니다")

        backgroundFilename = ["background.jpg", "backgroundB.jpg"]
        if bod in ["선생님", "간사님", "목사님", "전도사님"]:
            background = cv2.imread(f"{dataSourcePath}/{backgroundFilename[1]}")
            grade = bod
            textColor = (156, 134, 212, 1)
        elif bod == "깍두기":
            background = cv2.imread(f"{dataSourcePath}/{backgroundFilename[0]}")
            grade = bod
            textColor = (117, 53, 78, 1)
        else:
            background = cv2.imread(f"{dataSourcePath}/{backgroundFilename[0]}")
            indexOfBod = bods.index(bod)
            grade = grades[indexOfBod]
            textColor = (117, 53, 78, 1)
        
        team = 0
        for i in range(11):
            if name in teams[i]:
                team = i + 1

        textImage = np.zeros((4689, 3126, 3), dtype="uint8")
        textImage[:, :] = background

        font = ImageFont.truetype(f"{fontPath}/{fontName}", 800 if len(name) <= 3 else 720)
        smallFont = ImageFont.truetype(f"{fontPath}/{fontName}", 240)
        superSmallFont = ImageFont.truetype(f"{fontPath}/{fontName}", 200)
        
        textImage_PIL = Image.fromarray(textImage)
        draw = ImageDraw.Draw(textImage_PIL)

        x0 = 200 if len(name) > 2 else 450
        y0 = 1200

        xLen = 2000 if len(name) > 2 else 1450
        xGap = int(xLen / (len(name) - 1 ))

        for idx, char in enumerate(name):
            draw.text((x0 + idx * xGap, 1200), char, font=font, fill=textColor)
        
        teamText = f"{team}조" if team > 0 else ""
        draw.text((1400, 2200), teamText, font=smallFont, fill=textColor)
        
        if grade in ["선생님", "목사님", "간사님", "깍두기"]:
            draw.text((2350, 2225), grade, font=superSmallFont, fill=textColor)
        elif grade == "전도사님":
            draw.text((2250, 2225), grade, font=superSmallFont, fill=textColor)
        else:
            draw.text((2500, 2225), grade, font=superSmallFont, fill=textColor)

        newImage = np.array(textImage_PIL)

        qrImage = cv2.imread(f"{qrPath}/{qrFileName}")
        qrImage = cv2.resize(qrImage, (1000, 1000))

        barWidth = 100
        progress = 0
        total = 800 * 800

        for i in range(800):
            for j in range(800):
                if not np.array_equal(qrImage[i + 100, j + 100], (255, 255, 255)):
                    newImage[-30 + 100 + i, 1063 + 100 + j] = qrImage[100 + i, 100 + j]
                progress += 1
                percentage = int((progress / total )* barWidth)
                print("Progress [", "█" * percentage, " " * (barWidth - percentage), f"] {progress} / {total}", end="\r")
        
        newImage = cv2.putText(newImage, id, (1300, 1050), cv2.FONT_HERSHEY_SIMPLEX, 6, (0, 0, 0), 18)
        
        # cv2.imshow("image", newImage)
        # cv2.waitKey()
        cv2.imwrite(f"{outPath}/{image}", newImage)
        print("")

    print("명찰이 모두 생성되었습니다!")
    return True

if __name__ == "__main__":
    main()