from flask_sqlalchemy import SQLAlchemy
import csv

db = SQLAlchemy()

class FoodTruck(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    locationid = db.Column(db.String(50))
    applicant = db.Column(db.String(255))
    facility_type = db.Column(db.String(100))
    cnn = db.Column(db.String(50))
    location_description = db.Column(db.Text)
    address = db.Column(db.String(255))
    blocklot = db.Column(db.String(50))
    block = db.Column(db.String(50))
    lot = db.Column(db.String(50))
    permit = db.Column(db.String(50))
    status = db.Column(db.String(50))
    food_items = db.Column(db.Text)
    x = db.Column(db.Float)
    y = db.Column(db.Float)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    schedule = db.Column(db.Text)
    dayshours = db.Column(db.Text)
    noi_sent = db.Column(db.String(50))
    approved = db.Column(db.String(50))
    received = db.Column(db.String(50))
    prior_permit = db.Column(db.String(50))
    expiration_date = db.Column(db.String(50))
    location = db.Column(db.Text)
    fire_prevention_districts = db.Column(db.String(50))
    police_districts = db.Column(db.String(50))
    supervisor_districts = db.Column(db.String(50))
    zip_codes = db.Column(db.String(50))
    neighborhoods_old = db.Column(db.String(255))


def seed_data(csv_file):
    print("Seeding data...")
    try:
        with open(csv_file, newline='', encoding='utf-8') as file:
            reader = csv.DictReader(file, delimiter=',')
            # Mapping CSV column names to FoodTruck model field names
            field_mapping = {
                'locationid': 'locationid',
                'Applicant': 'applicant',
                'FacilityType': 'facility_type',
                'cnn': 'cnn',
                'LocationDescription': 'location_description',
                'Address': 'address',
                'blocklot': 'blocklot',
                'block': 'block',
                'lot': 'lot',
                'permit': 'permit',
                'Status': 'status',
                'FoodItems': 'food_items',
                'X': 'x',
                'Y': 'y',
                'Latitude': 'latitude',
                'Longitude': 'longitude',
                'Schedule': 'schedule',
                'dayshours': 'dayshours',
                'NOISent': 'noi_sent',
                'Approved': 'approved',
                'Received': 'received',
                'PriorPermit': 'prior_permit',
                'ExpirationDate': 'expiration_date',
                'Location': 'location',
                'Fire Prevention Districts': 'fire_prevention_districts',
                'Police Districts': 'police_districts',
                'Supervisor Districts': 'supervisor_districts',
                'Zip Codes': 'zip_codes',
                'Neighborhoods (old)': 'neighborhoods_old'
            }

            def convert_to_float(value):
                # If the value is empty or non-numeric, return None
                try:
                    return float(value) if value else None
                except ValueError:
                    return None

            batch_size = 100
            batch = []
            for row in reader:
                # Map the CSV row to the FoodTruck model's column names
                mapped_row = {
                    field_mapping[key]: convert_to_float(value) if key in ['X', 'Y', 'Latitude', 'Longitude'] else value
                    for key, value in row.items()
                }

                # Now, create the FoodTruck instance using the mapped data
                food_truck = FoodTruck(**mapped_row)
                batch.append(food_truck)

                if len(batch) >= batch_size:
                    db.session.add_all(batch)
                    db.session.commit()
                    batch = []

            if batch:
                db.session.add_all(batch)
                db.session.commit()

            print("Seeding complete.")
    except Exception as e:
        print(f"Error seeding data: {e}")
