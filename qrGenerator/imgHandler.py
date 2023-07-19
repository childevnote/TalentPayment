import cv2
import os
from PIL import ImageFont, ImageDraw, Image
import numpy as np

def main():
    sourcePath = "./images/"
    outPath = "./processed_qrcodes/"

    files = os.listdir(sourcePath)

    images=  []
    for file in files:
        if file[-4:] == ".png":
            images.append(file)

    for image in images:
        tesfilename = f"{sourcePath}{image}"
        outfilename = f"{outPath}{image}"

        qrImg = cv2.imread(tesfilename)

        textImg = np.zeros((330, 290, 3), dtype="uint8")
        textImg[:, :] = (255, 255, 255)
        textImg[20:310, :] = qrImg

        fontPath = "./fonts/d2coding.ttc"
        font = ImageFont.truetype(fontPath, 30)

        textImg_pil = Image.fromarray(textImg)
        draw = ImageDraw.Draw(textImg_pil)

        name, indicator, id = image.split("_")

        draw.text((120, 10),  f"{id[:-4]}", font=font, fill=(0, 0, 0, 1))
        draw.text((20, 285),  f"{name}", font=font, fill=(0, 0, 0, 1))
        draw.text((180, 285),  f"{indicator}", font=font, fill=(0, 0, 0, 1))

        newImg = np.array(textImg_pil)
        newImg = cv2.putText(newImg, "test", (30, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 1)

        cv2.imwrite(outfilename, newImg)

    return True

if __name__ == "__main__":
    main()
