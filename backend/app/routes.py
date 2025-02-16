from flask import Blueprint

def register_routes(app):
    from app.views.food_truck_view import food_truck_bp
    app.register_blueprint(food_truck_bp)