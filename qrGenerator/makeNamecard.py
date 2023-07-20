from PIL import ImageFont, ImageDraw, Image
import cv2
import os
import numpy as np

# 3126 * 4689

def main():
    dataSourcePath = "./data"
    fontPath = "./fonts"
    fontName = "BMDOHYEON_ttf.ttf"
    qrPath = "./images"

    outPath = "./namecards"

    textFilename = "participants.txt"
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
            newTeam = int(newPerson[0])
            newName = newPerson[1]

            teams[newTeam - 1].append(newName)
        f.close()

    for image in images:
        qrFileName = image

        name = qrFileName.split("_")[0]
        print(f"{name} 명찰을 만들기 시작합니다")
        
        team = 0
        for i in range(11):
            if name in teams[i]:
                team = i + 1
        
        backgroundFilename = "background.jpg"
        background = cv2.imread(f"{dataSourcePath}/{backgroundFilename}")

        textColor = (117, 53, 78, 1)

        textImage = np.zeros((4689, 3126, 3), dtype="uint8")
        textImage[:, :] = background

        font = ImageFont.truetype(f"{fontPath}/{fontName}", 800 if len(name) <= 3 else 720)
        smallFont = ImageFont.truetype(f"{fontPath}/{fontName}", 240)
        
        textImage_PIL = Image.fromarray(textImage)
        draw = ImageDraw.Draw(textImage_PIL)

        x0 = 200
        y0 = 1200

        xLen = 2000
        xGap = int(xLen / (len(name) - 1 ))

        for idx, char in enumerate(name):
            draw.text((x0 + idx * xGap, 1200), char, font=font, fill=textColor)
        
        draw.text((1400, 2200), f"{team} 조", font=smallFont, fill=textColor)

        newImage = np.array(textImage_PIL)

        qrImage = cv2.imread(f"{qrPath}/{qrFileName}")
        qrImage = cv2.resize(qrImage, (1000, 1000))

        barWidth = 100
        progress = 0
        total = 1000 * 1000

        for i in range(1000):
            for j in range(1000):
                if not np.array_equal(qrImage[i, j], (255, 255, 255)):
                    newImage[-30 + i, 1063 + j] = qrImage[i, j]
                progress += 1
                percentage = int((progress / total )* barWidth)
                print("Progress [", "█" * percentage, " " * (barWidth - percentage), f"] {progress} / {total}", end="\r")
        
        newImage = cv2.putText(newImage, "1234", (1300, 1050), cv2.FONT_HERSHEY_SIMPLEX, 6, (0, 0, 0), 18)
        
        # cv2.imshow("image", newImage)
        cv2.imwrite(f"{outPath}/{image}", newImage)
        print("")

    return True

if __name__ == "__main__":
    main()