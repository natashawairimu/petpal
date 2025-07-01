# seed.py
from app import app
from models import db, Users, Pet, Appointment, ServiceProvider, Note
from werkzeug.security import generate_password_hash
from datetime import datetime

with app.app_context():
    # Drop all tables and recreate them
    db.drop_all()
    db.create_all()

    # === Users ===
    user1 = Users(name="Alice", email="alice@example.com", password_hash=generate_password_hash("password"), role="admin")
    user2 = Users(name="Bob", email="bob@example.com", password_hash=generate_password_hash("password123"), role="user")

    db.session.add_all([user1, user2])
    db.session.commit()

    # === Providers
    vet = ServiceProvider(name="Happy Paws Vet", type="Vet", contact="012-345-6789")
    groomer = ServiceProvider(name="Furry Cuts", type="Groomer", contact="098-765-4321")

    db.session.add_all([vet, groomer])
    db.session.commit()

    #  Pets
    pet1 = Pet(name="Buddy", species="Dog", breed="Golden Retriever", age=4, medical_history="Allergic to peanuts", owner_id=user1.id)
    pet2 = Pet(name="Whiskers", species="Cat", breed="Siamese", age=2, medical_history="None", owner_id=user2.id)

    db.session.add_all([pet1, pet2])
    db.session.commit()

    # Appointments 
    appointment1 = Appointment(
        date=datetime(2024, 7, 10, 10, 0),
        reason="Annual vaccination",
        pet_id=pet1.id,
        provider_id=vet.id
    )
    appointment2 = Appointment(
        date=datetime(2024, 7, 15, 14, 0),
        reason="Grooming session",
        pet_id=pet2.id,
        provider_id=groomer.id
    )

    db.session.add_all([appointment1, appointment2])
    db.session.commit()

    #  Notes
    note1 = Note(title="Feeding Note", content="Feed Buddy twice a day", pet_id=pet1.id)
    note2 = Note(title="Mood", content="Whiskers was very playful today", pet_id=pet2.id)

    db.session.add_all([note1, note2])
    db.session.commit()

    print(" Seeding complete!")