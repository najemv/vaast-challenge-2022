import json
import csv
import os
from datetime import datetime, timedelta

DATA_DIR = "..\\VAST-Challenge-2022\\Datasets"
OUTPUT_DIR = "src\\assets\\data"

LOGS_DIR = DATA_DIR + "\\Activity Logs"
ATTRIBUTES_DIR = DATA_DIR + "\\Attributes"
JOURNALS_DIR = DATA_DIR + "\\Journals"


## HELPERS

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
  return None

def parse_time_interval(interval_end_time: str, interval_start_time: str):
  date_format = "%Y-%m-%dT%H:%M:%SZ"
  start = datetime.strptime(interval_start_time, date_format)
  end = datetime.strptime(interval_end_time, date_format)
  delta = end - start
  return delta.seconds // 60


## DATA PARSING

def parse_participants():
  result = []

  with open(ATTRIBUTES_DIR + "\\Participants.csv") as f:
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
        "joviality": line[6],
        "travels" : [],
        "budget": 0
      })

  # fill budget data as theirs first balance
  with open(LOGS_DIR + "\\ParticipantStatusLogs1.csv") as f:
    reader = csv.reader(f)
    next(reader)
    for line in reader:
      participantId = int(line[2])
      availableBalance = float(line[7])

      if result[participantId]["budget"] == 0:
        print(participantId, " was set")
        result[participantId]["budget"] = availableBalance

  return result


def parse_buildings():
  result = []

  with open(ATTRIBUTES_DIR + "\\Buildings.csv") as f:
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

  return result
  

def parse_places(participants, buldings):
  result = []

  with open(ATTRIBUTES_DIR + "\\Apartments.csv") as f:
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
        "buildingId": int(data[5]),
        "travels": []
      })
  
  with open(ATTRIBUTES_DIR + "\\Schools.csv") as f:
    f.readline()
    for line in f:
      data = line.split(",")
      result.append({
        "placeType": "School",
        "placeId": int(data[0]),
        "monthlyCost": float(data[1]),
        "maxEnrollment": int(data[2]),
        "location": parse_location(data[3]),
        "buildingId": int(data[4]),
        "travels": []
      })

  with open(ATTRIBUTES_DIR + "\\Restaurants.csv") as f:
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
        "visits": [],
        "unknownVisits": [],
        "travels": []
      })

  with open(ATTRIBUTES_DIR + "\\Pubs.csv") as f:
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
        "visits": [],
        "unknownVisits": [],
        "travels": []
        
      })

  with open(ATTRIBUTES_DIR + "\\Employers.csv") as f:
    f.readline()
    for line in f:
      data = line.split(",")
      result.append({
        "placeType": "Employer",
        "placeId": int(data[0]),
        "location": parse_location(data[1]),
        "buildingId": int(data[2]),
        "travels": []
      })

  result.sort(key=lambda x: x["placeId"])

  # initialize array of visits and travels by correct size
  for place in result:
    place["travels"] = [[] for _ in range(len(result))]
    if "visits" in place:
      place["visits"] = [[] for _ in range(len(result))]

  for participant in participants:
    participant["travels"] = [[] for _ in range(len(result))]

  return result


def parse_and_bind_travels(places, participants):
  travels = []

  # select only places that ends in restaurant/pubs (to save memory)
  with open(JOURNALS_DIR + "\\TravelJournal.csv") as f:
    f.readline()
    for line in f:
      data = line.split(",")
      travel_record = {
        "participantId": int(data[0]),
        "travelStartTime": data[1],
        "travelStartLocationId": parse_id(data[2]),
        "travelDuration": parse_time_interval(data[3], data[1]),
        "travelEndLocationId": parse_id(data[4]),
        "purpose": data[5],
        "destinationTimeSpend": parse_time_interval(data[7], data[6]),
        "moneySpend": float(data[8]) - float(data[9])
      }
      
      place_dest = places[travel_record["travelEndLocationId"]]
      if place_dest["placeType"] in ("Restaurant", "Pub"):
        travels.append(travel_record)

  travels.sort(key=lambda x: x["travelStartTime"])
  
  # bind restaurant/pub travels to places and participants
  for i, travel in enumerate(travels):
    place_dest = places[travel["travelEndLocationId"]]
    
    if travel["travelStartLocationId"] is not None:
      place_start = places[travel["travelStartLocationId"]]

      place_start["travels"][place_dest["placeId"]].append(i)
      place_dest["visits"][place_start["placeId"]].append(i)
    else:
      place_dest["unknownVisits"].append(i)

    participant = participants[travel["participantId"]]
    participant["travels"][place_dest["placeId"]].append(i)
  
  return travels
    

def write_json(obj, filename):
  print(f'Writing to "{filename}.json" has started...')
  with open(OUTPUT_DIR + f"\\{filename}.json", "w") as f:
    json.dump(obj, f, indent=2)
  print(f'Writing to "{filename}.json" has finished.')


def main():
  if not os.path.exists(OUTPUT_DIR):
    os.mkdir(OUTPUT_DIR)
  
  participants = parse_participants()
  buildings = parse_buildings()
  places = parse_places(participants, buildings)
  travels = parse_and_bind_travels(places, participants)

  write_json(participants, "participants")
  write_json(buildings, "buildings")
  write_json(places, "places")
  write_json(travels, "travels")


if __name__ == '__main__':
  main()