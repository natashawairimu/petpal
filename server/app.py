from flask import Flask, request
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required,
    get_jwt_identity
)
from datetime import datetime
from models import db, Users, Pet, Appointment, ServiceProvider, Note

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'super-secret-key'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///petmanager.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
api = Api(app)
CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"], supports_credentials=True)

class Home(Resource):
    def get(self):
        return "<h1>Welcome to PetManager Backend!</h1>", 200

class Register(Resource):
    def post(self):
        data = request.get_json()
        if Users.query.filter_by(email=data['email']).first():
            return {'error': 'Email already exists'}, 409
        hashed_password = generate_password_hash(data['password'])
        user = Users(
            name=data['name'],
            email=data['email'],
            password_hash=hashed_password,
            role=data.get('role', 'user')
        )
        db.session.add(user)
        db.session.commit()
        return {
            "message": "User registered successfully",
            "data": user.to_dict()
        }, 201

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = Users.query.filter_by(email=data['email']).first()
        if user and check_password_hash(user.password_hash, data['password']):
            token = create_access_token(identity={
                "id": user.id, "email": user.email, "role": user.role
            })
            return {"access_token": token, "user": user.to_dict()}, 200
        return {"error": "Invalid credentials"}, 401

class User(Resource):
    def get(self):
        users = Users.query.all()
        return [u.to_dict() for u in users], 200

class Pets(Resource):
    @jwt_required()
    def get(self):
        user = get_jwt_identity()
        pets = Pet.query.filter_by(owner_id=user['id']).all()
        return [p.to_dict() for p in pets], 200

    @jwt_required()
    def post(self):
        data = request.get_json()
        user = get_jwt_identity()
        pet = Pet(
            name=data['name'],
            species=data['species'],
            breed=data['breed'],
            age=data['age'],
            medical_history=data['medical_history'],
            owner_id=user['id']
        )
        db.session.add(pet)
        db.session.commit()
        return {"message": "Pet added", "data": pet.to_dict()}, 201

class PetById(Resource):
    @jwt_required()
    def patch(self, id):
        pet = Pet.query.get(id)
        if not pet:
            return {"error": "Pet not found"}, 404
        data = request.get_json()
        for field in ['name', 'species', 'breed', 'age', 'medical_history']:
            if field in data:
                setattr(pet, field, data[field])
        db.session.commit()
        return {"message": "Pet updated", "data": pet.to_dict()}, 200

    @jwt_required()
    def delete(self, id):
        pet = Pet.query.get(id)
        if not pet:
            return {"error": "Pet not found"}, 404
        db.session.delete(pet)
        db.session.commit()
        return {"message": "Pet deleted"}, 200

class Appointments(Resource):
    @jwt_required()
    def get(self):
        user = get_jwt_identity()
        pets = Pet.query.filter_by(owner_id=user['id']).all()
        pet_ids = [p.id for p in pets]
        appointments = Appointment.query.filter(Appointment.pet_id.in_(pet_ids)).all()
        return [a.to_dict() for a in appointments], 200

    @jwt_required()
    def post(self):
        data = request.get_json()
        appointment = Appointment(
            date=datetime.fromisoformat(data['date']),
            reason=data['reason'],
            pet_id=data['pet_id'],
            provider_id=data['provider_id']
        )
        db.session.add(appointment)
        db.session.commit()
        return {"message": "Appointment added", "data": appointment.to_dict()}, 201

class Notes(Resource):
    @jwt_required()
    def get(self):
        user = get_jwt_identity()
        pets = Pet.query.filter_by(owner_id=user['id']).all()
        pet_ids = [p.id for p in pets]
        notes = Note.query.filter(Note.pet_id.in_(pet_ids)).all()
        return [n.to_dict() for n in notes], 200

    @jwt_required()
    def post(self):
        data = request.get_json()
        note = Note(
            title=data['title'],
            content=data['content'],
            pet_id=data['pet_id']
        )
        db.session.add(note)
        db.session.commit()
        return {"message": "Note added", "data": note.to_dict()}, 201

class Providers(Resource):
    def get(self):
        return [p.to_dict() for p in ServiceProvider.query.all()], 200

    @jwt_required()
    def post(self):
        data = request.get_json()
        provider = ServiceProvider(
            name=data['name'],
            type=data['type'],
            contact=data['contact']
        )
        db.session.add(provider)
        db.session.commit()
        return {"message": "Provider added", "data": provider.to_dict()}, 201

api.add_resource(Home, '/')
api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(User, '/users')
api.add_resource(Pets, '/pets')
api.add_resource(PetById, '/pets/<int:id>')
api.add_resource(Appointments, '/appointments')
api.add_resource(Notes, '/notes')
api.add_resource(Providers, '/providers')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
