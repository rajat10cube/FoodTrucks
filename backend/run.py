from app import create_app
from app.models import db, seed_data
from flask_cors import CORS, cross_origin

app = create_app()

with app.app_context():
    db.create_all()
    seed_data("food-truck-data.csv")

if __name__ == "__main__":
    app.run(debug=True)