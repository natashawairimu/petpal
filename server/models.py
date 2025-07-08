from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

# Initialize the SQLAlchemy ORM instance
db = SQLAlchemy()

class Users(db.Model):
    # Primary key
    id = db.Column(db.Integer, primary_key=True)

    # Basic user fields
    name = db.Column(db.String(120))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255)) 
    role = db.Column(db.String(50), default='user')  

    # Relationship: One user has many pets
    pets = db.relationship('Pet', backref='owner', cascade='all, delete')

    # Check if a given password matches the stored hash
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    # Serialize user data to dictionary 
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "role": self.role
        }

 
class Pet(db.Model):
    id = db.Column(db.Integer, primary_key=True)


    name = db.Column(db.String(100))
    species = db.Column(db.String(50))
    breed = db.Column(db.String(50))
    age = db.Column(db.Integer)
    medical_history = db.Column(db.Text)

    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    notes = db.relationship('Note', backref='pet', cascade='all, delete')
    appointments = db.relationship('Appointment', back_populates='pet', cascade='all, delete')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "species": self.species,
            "breed": self.breed,
            "age": self.age,
            "medical_history": self.medical_history,
            "owner_id": self.owner_id
        }

class ServiceProvider(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100))
    type = db.Column(db.String(50))  
    contact = db.Column(db.String(100))


    appointments = db.relationship('Appointment', back_populates='provider')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "contact": self.contact
        }

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    date = db.Column(db.DateTime, nullable=False)
    reason = db.Column(db.String(255), nullable=False)

    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id'), nullable=False)
    provider_id = db.Column(db.Integer, db.ForeignKey('service_provider.id'), nullable=False)

    pet = db.relationship('Pet', back_populates='appointments')
    provider = db.relationship('ServiceProvider', back_populates='appointments')

    def to_dict(self):
        return {
            "id": self.id,
            "date": self.date.isoformat(),
            "reason": self.reason,
            "pet_id": self.pet_id,
            "provider_id": self.provider_id,
            "pet": self.pet.to_dict() if self.pet else None,
            "provider": self.provider.to_dict() if self.provider else None
        }


class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(100))
    content = db.Column(db.Text)

   
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id'))


    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "pet_id": self.pet_id,
            "timestamp": self.timestamp.isoformat()
        }
