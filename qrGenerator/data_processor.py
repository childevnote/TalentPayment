def main():
    filepath = "./data/"
    # filename = "participants.txt"
    filename = "test.txt"

    with open(f"{filepath}{filename}", mode="+r") as fs:
        curIdx = 0
        for line in fs:
            if curIdx == 0:
                curIdx += 1
                continue
            else:
                newData = line.split("\t")

                if newData[3] == "TRUE":
                    print(f"{newData[1]}_선생님")
                else:
                    print(f"{newData[1]}_{newData[4]}")

                curIdx += 1

    return True

if __name__ == "__main__" :
    main()