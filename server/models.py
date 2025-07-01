# models.py
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255))
    role = db.Column(db.String(50), default='user')
    pets = db.relationship('Pet', backref='owner', cascade='all, delete')

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

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
    appointments = db.relationship('Appointment', backref='pet', cascade='all, delete')

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
    type = db.Column(db.String(50))  # vet, groomer, etc.
    contact = db.Column(db.String(100))
    appointments = db.relationship('Appointment', backref='provider')

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
    reason = db.Column(db.String(255))
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id'))
    provider_id = db.Column(db.Integer, db.ForeignKey('service_provider.id'))

    def to_dict(self):
        return {
            "id": self.id,
            "date": self.date.isoformat(),
            "reason": self.reason,
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