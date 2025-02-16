from flask import Blueprint, jsonify, request
from app.models import db, FoodTruck
from app.utils import calculate_distance
from sqlalchemy.orm import class_mapper
from flask_cors import cross_origin

food_truck_bp = Blueprint("food_truck", __name__, url_prefix="/api/food_trucks")

# Helper function to serialize a FoodTruck instance to a dictionary
def serialize_food_truck(food_truck):
    # Convert a FoodTruck object into a serializable dictionary
    # Exclude SQLAlchemy internal state like _sa_instance_state
    data = {column.name: getattr(food_truck, column.name) for column in class_mapper(food_truck.__class__).columns}
    return data

@food_truck_bp.route("/nearby", methods=["GET"])
@cross_origin()
def get_nearby_food_trucks():
    latitude = float(request.args.get("latitude"))
    longitude = float(request.args.get("longitude"))
    radius = float(request.args.get("radius", 5))
    
    food_trucks = FoodTruck.query.all()
    
    # Find nearby food trucks based on the distance calculation
    nearby_trucks = [
        truck for truck in food_trucks
        if calculate_distance(latitude, longitude, truck.latitude, truck.longitude) <= radius
    ]
    
    # Serialize the nearby trucks and return them in the response
    serialized_trucks = [serialize_food_truck(truck) for truck in nearby_trucks[:5]]
    
    return jsonify(serialized_trucks)
