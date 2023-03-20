import json
import csv
import os

data_dir = "..\\..\\VAST-Challenge-2022\\Datasets"
output_dir = "..\\public\\data"

logs_dir = data_dir + "\\Activity Logs"
attributes_dir = data_dir + "\\Attributes"
journals_dir = data_dir + "\\Journals"


def parse_point(point: str):
  x, y = point.split(" ")
  return {
    "x": float(x),
    "y": float(y)
  }

def parse_location(location: str):
  return parse_point(location[7:-1])

def parse_polygons(data: str):
  polygons = data[11:-2].split("), (")
  result = []
  for polygon in polygons:
    result.append(list(map(lambda x: parse_point(x), polygon.split(", "))))
  return result

def parse_units(units: str):
  if len(units) == 0:
    return []
  return list(map(lambda x: int(x), units[1:-1].split(",")))

def parse_days(days: str):
  return days[1:-1].split(",")

def parse_id(id: str):
  if id.isdecimal():
    return int(id)
  return -1

def parse_participants():
  result = []

  with open(attributes_dir + "\\Participants.csv") as f:
    reader = csv.reader(f)
    next(reader)
    for line in reader:
      result.append({
        "participantId": int(line[0]),
        "householdSize": int(line[1]),
        "haveKids": line[2] == "TRUE",
        "age": int(line[3]),
        "educationLevel": line[4],
        "interestGroup": line[5],
        "joviality": line[6]
      })

  with open(output_dir + "\\participants.json", "w") as f:
    json.dump(result, f, indent=2)

def parse_buildings():
  result = []

  with open(attributes_dir + "\\Buildings.csv") as f:
    reader = csv.reader(f)
    next(reader)
    for line in reader:
      result.append({
        "buildingId": int(line[0]),
        "location": parse_polygons(line[1]),
        "buildingType": line[2],
        "maxOccupancy": int(line[3]) if line[3].isdecimal() else 0,
        "units": parse_units(line[4])
      })

  with open(output_dir + "\\buildings.json", "w") as f:
    json.dump(result, f, indent=2)
  

def parse_jobs():
  result = []

  with open(attributes_dir + "\\Jobs.csv") as f:
    reader = csv.reader(f)
    next(reader)
    for data in reader:
      result.append({
        "jobId": int(data[0]),
        "employerId": int(data[1]),
        "hourlyRate": float(data[2]),
        "startTime": data[3],
        "endTime": data[4],
        "daysToWork": parse_days(data[5]),
        "educationRequirement": data[6]
      })
  
  with open(output_dir + "\\jobs.json", "w") as f:
    json.dump(result, f, indent=2)


def parse_places():
  result = []

  with open(attributes_dir + "\\Apartments.csv") as f:
    f.readline()
    for line in f:
      data = line.split(",")
      result.append({
        "placeType": "Apartment",
        "placeId": int(data[0]),
        "rentalCost": float(data[1]),
        "maxOccupancy": int(data[2]),
        "numberOfRooms": int(data[3]),
        "location": parse_location(data[4]),
        "buildingId": int(data[5])
      })
  
  with open(attributes_dir + "\\Schools.csv") as f:
    f.readline()
    for line in f:
      data = line.split(",")
      result.append({
        "placeType": "School",
        "placeId": int(data[0]),
        "monthlyCost": float(data[1]),
        "maxEnrollment": int(data[2]),
        "location": parse_location(data[3]),
        "buildingId": int(data[4])
      })

  with open(attributes_dir + "\\Restaurants.csv") as f:
    f.readline()
    for line in f:
      data = line.split(",")
      result.append({
        "placeType": "Restaurant",
        "placeId": int(data[0]),
        "foodCost": float(data[1]),
        "maxOccupancy": int(data[2]),
        "location": parse_location(data[3]),
        "buildingId": int(data[4]),
        "visits": []
      })

  with open(attributes_dir + "\\Pubs.csv") as f:
    f.readline()
    for line in f:
      data = line.split(",")
      result.append({
        "placeType": "Pub",
        "placeId": int(data[0]),
        "hourlyCost": float(data[1]),
        "maxOccupancy": int(data[2]),
        "location": parse_location(data[3]),
        "buildingId": int(data[4]),
        "visits": []
      })

  with open(attributes_dir + "\\Employers.csv") as f:
    f.readline()
    for line in f:
      data = line.split(",")
      result.append({
        "placeType": "Employer",
        "placeId": int(data[0]),
        "location": parse_location(data[1]),
        "buildingId": int(data[2])
      })

  result.sort(key=lambda x: x["placeId"])

  # fill missing jobs to employers
  # with open(attributes_dir + "\\Jobs.csv") as f:
  #   reader = csv.reader(f)
  #   next(reader)
  #   for data in reader:
  #     job = {
  #       "jobId": int(data[0]),
  #       "employerId": int(data[1]),
  #       "hourlyRate": float(data[2]),
  #       "startTime": data[3],
  #       "endTime": data[4],
  #       "daysToWork": parse_days(data[5]),
  #       "educationRequirement": data[6]
  #     }
  #     
  #     result[job["jobId"]["jobs"].append(job)

  # fill the travels to the restaurants and pubs
  with open(journals_dir + "\\TravelJournal.csv") as f:
    f.readline()
    for line in f:
      data = line.split(",")
      travel_record = {
        "participantId": int(data[0]),
        "travelStartTime": data[1],
        "travelStartLocationId": parse_id(data[2]),
        "travelEndTime": data[3],
        "travelEndLocationId": parse_id(data[4]),
        "purpose": data[5],
        "checkInTime": data[6],
        "checkOutTime": data[7],
        "moneySpend": float(data[8]) - float(data[9])
      }

      place = result[travel_record["travelEndLocationId"]]
      # todo: maybe some other filtering (purpose) ??
      if place["placeType"] in ("Restaurant", "Pub"):
        place["visits"].append(travel_record)
  

  with open(output_dir + "\\places.json", "w") as f:
    json.dump(result, f, indent=2)


def main():
  if not os.path.exists(output_dir):
    os.mkdir(output_dir)
  
  parse_places()
  parse_buildings()
  #parse_jobs()
  parse_participants()

if __name__ == '__main__':
  main()