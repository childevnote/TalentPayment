import qrcode
import random

def main():
    while True:
        print("What you will do?")
        print("1. Generate QR codes")
        print("2. Initalize images directory(delete all)")
        print("-1 to quit program\n")

        choice = input("  Your choice : ")
        try:
            choice = int(choice)
        except:
            print("You entered a data not an integer. try again")
            continue

        if choice == 1:
            num = input("\nHow many codes you want?  ")
            genType = input("What do you want with the QR data?   1. Sequence  2. Random\n")

            generate(num, genType)

        elif choice == -1:
            break

    print("\nGood Bye.\n")
    return 0

def generate(num, genType):
    try:
        num = int(num)
        genType = int(genType)
    except:
        print("Fail to generate")
        return 0

    if genType == 1:
        for i in range(num):
            newId = int(random.random()*1000)+1000*random.randint(1, 9)
            newImg = qrcode.make(f"{newId}")
            newImg.save(f"images/qrcode_{i}.png")
            print(f"QR code saving... {i+1} / num", end="\r")
    elif genType == 2:
        for i in range(num):
            newImg = qrcode.make(f"{1000 + i}")
            newImg.save(f"images/qrcode_{i}.png")
            print(f"QR code saving... {i+1} / num", end="\r")
    
    print(f"\n✨All done. {num} QR codes are generated\n")
    return 0

if __name__ == "__main__":
    main()