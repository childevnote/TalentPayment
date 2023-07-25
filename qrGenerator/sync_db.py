import requests as server
import os

def main():
    dataPath = "./data"
    # qrPath = "./images"
    qrPath = "./additionalImages"
    # participantsPath = "participants.txt"
    participantsPath = "addition.txt"
    # participantsPath = "test.txt"

    serverUrl = "http://15.164.215.123:3001"

    participants = []
    with open(f"{dataPath}/{participantsPath}", "+r") as f:
        for person in f:
            team, name, _, _, bod = person.split("\t")
            bod = bod[:-1] if bod[-1] == "\n" else bod
            participants.append({"team": team, "name": name, "bod": bod})

    qrFileNames = os.listdir(qrPath)
    qrFiles = []
    for qrFileName in qrFileNames:
        if qrFileName[-4:] == ".png":
            qrFiles.append(qrFileName)
    
    namesOfQrFiles = []
    for qrFile in qrFiles:
        namesOfQrFiles.append(qrFile.split("_")[0])

    for index, person in enumerate(participants):
        if person["name"] in namesOfQrFiles:
            indicators = []

            for nameIndex, nameValue in enumerate(namesOfQrFiles):
                if person["name"] == nameValue:
                    indicators.append(nameIndex)

            indicator = namesOfQrFiles.index(person["name"])

            # print(indicator)
            if person["bod"] == qrFiles[indicator].split("_")[1]:
                participants[index] = {
                    "team": person["team"],
                    "name": person["name"],
                    "bod": person["bod"],
                    "id": qrFiles[indicator].split("_")[2][:-4]
                }
            elif len(indicators) > 1:
                if person["bod"] == qrFiles[indicators[1]].split("_")[1]:
                    participants[index] = {
                        "team": person["team"],
                        "name": person["name"],
                        "bod": person["bod"],
                        "id": qrFiles[indicators[1]].split("_")[2][:-4]
                    }
            elif len(person["bod"]) == 0 or person["bod"] == "미참여":
                indicator = namesOfQrFiles.index(person["name"])
                participants[index] = {
                    "team": person["team"],
                    "name": person["name"],
                    "bod": person["bod"],
                    "id": qrFiles[indicator].split("_")[2][:-4]
                }
            elif person["team"] == "-":
                indicator = namesOfQrFiles.index(person["name"])
                participants[index] = {
                    "team": -1,
                    "name": person["name"],
                    "bod": person["bod"],
                    "id": qrFiles[indicator].split("_")[2][:-4]
                }
                # print(participants[index])
            else:
                print("EXCEPTION")
                print(person)

    for person in participants:
        print(person)
        # print(f"{person['team']}, {person['name']}, {person['id']} will be requested")
        server.post(f"{serverUrl}/user/create", {
            "team": person["team"],
            "name": person["name"],
            "id": person["id"]
        })

    return True

if __name__ == "__main__":
    main()
