CREATE DATABASE IF NOT EXISTS your_car_your_way;
USE your_car_your_way;

CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    role VARCHAR(50)
);

CREATE TABLE Agency (
    agency_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    city VARCHAR(100),
    postal_code VARCHAR(20)
);

CREATE TABLE Vehicle (
    car_id INT PRIMARY KEY AUTO_INCREMENT,
    model VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    availability BOOLEAN DEFAULT TRUE,
    agency_id INT,
    FOREIGN KEY (agency_id) REFERENCES Agency(agency_id)
);

CREATE TABLE Reservation (
    reservation_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    car_id INT,
    agency_departure_id INT,
    agency_return_id INT,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    status VARCHAR(50),
    stripe_transaction_id VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (car_id) REFERENCES Vehicle(car_id),
    FOREIGN KEY (agency_departure_id) REFERENCES Agency(agency_id),
    FOREIGN KEY (agency_return_id) REFERENCES Agency(agency_id)
);

CREATE TABLE ChatSession (
    session_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    reservation_id INT,
    agent_id INT,
    start_time DATETIME,
    end_time DATETIME,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (reservation_id) REFERENCES Reservation(reservation_id)
);

CREATE TABLE MessageChat (
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    content TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    session_id INT,
    reservation_id INT,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (session_id) REFERENCES ChatSession(session_id),
    FOREIGN KEY (reservation_id) REFERENCES Reservation(reservation_id)
);

CREATE TABLE SupportTicket (
    ticket_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    reservation_id INT,
    subject VARCHAR(255),
    message TEXT,
    status VARCHAR(50),
    open_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    close_date DATETIME,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (reservation_id) REFERENCES Reservation(reservation_id)
);