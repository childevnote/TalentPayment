from PIL import ImageFont, ImageDraw, Image
import cv2
import os
import numpy as np

def main():
    dataSourcePath = "./data"
    fontPath = "./fonts"
    fontName = "BMDOHYEON_ttf.ttf"
    qrPath = "./images"

    textImage = np.zeros((300, 300, 3), dtype="uint8")
    textImage[:, :] = (255, 255, 255)

    font = ImageFont.truetype(f"{fontPath}/{fontName}", 32)
    
    textImage_PIL = Image.fromarray(textImage)
    draw = ImageDraw.Draw(textImage_PIL)

    draw.text((10, 10), "명하준", font=font, fill=(0, 0, 0, 1))

    newImage = np.array(textImage_PIL)
    
    cv2.imshow("image", newImage)
    cv2.waitKey()
    cv2.destroyAllWindows()

    outPath = "./namecards"

    return True

if __name__ == "__main__":
    main()