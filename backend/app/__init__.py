from flask import Flask
from config.config import Config
from app.routes import register_routes
from app.models import db
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    register_routes(app)
    
    # Apply CORS to the entire app
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    return app
