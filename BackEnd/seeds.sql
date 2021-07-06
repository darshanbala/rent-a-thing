INSERT INTO users(id, first_name, last_name, email, salted_password, date_of_birth, phone_number, address, city, created_at, updated_at) VALUES (1, 'Darshan', 'Balasingam', 'darshan.bala@sigmalabs.xyz', '$2a$08$BEA3DvDyoLR938jhe9bsAOS7T136Y8U769Yx7akYhjUf6s1doLUBy', '2000-01-01', '+447000 000 001', '1 Example Lane, London, N1 1AA', 'London', NOW(), NOW());
INSERT INTO users(id, first_name, last_name, email, salted_password, date_of_birth, phone_number, address, city, created_at, updated_at) VALUES (2, 'Robert', 'Scholey', 'robert.scholey@sigmalabs.xyz', '$2a$08$j9lWhCGk/Azky9IHLsU0Zu6SbT20QlkExrv/3JqqvVclhCDO0ks9a', '2000-01-02', '+447000 000 002', '2 Example Lane, London, N1 1AA', 'London', NOW(), NOW());
INSERT INTO users(id, first_name, last_name, email, salted_password, date_of_birth, phone_number, address, city, created_at, updated_at) VALUES (3, 'Kyle', 'Pearce', 'kyle.pearce@sigmalabs.xyz', '$2a$08$ND3kfiI5XkSevFe1t6.JveqjBDMH/LRpwpEJ2tDXTA5nykOL30KVS', '2000-01-03', '+447000 000 003', '3 Example Lane, London, N1 1AA', 'London', NOW(), NOW());
INSERT INTO users(id, first_name, last_name, email, salted_password, date_of_birth, phone_number, address, city, created_at, updated_at) VALUES (4, 'David', 'Ajayi', 'david.ajayi@sigmalabs.xyz', '$2a$08$yTFtWn138aeHFNVgxnQ26OkQsQTM2w3uk1FTiz9PqpzYsei0gwu7i', '2000-01-04', '+447000 000 004', '4 Example Lane, London, N1 1AA', 'London', NOW(), NOW());
INSERT INTO users(id, first_name, last_name, email, salted_password, date_of_birth, phone_number, address, city, created_at, updated_at) VALUES (5, 'Milo', 'Boucher', 'milo.boucher@sigmalabs.xyz', '$2a$08$KHapHptcjjTiqQjadYwvIuXZ9mZkVs4FQI0T447TNMlAWoMeAjZxW', '2000-01-05', '+447000 000 005', '5 Example Lane, London, N1 1AA', 'London', NOW(), NOW());

INSERT INTO items(id, name, description, is_available, category_id, owner_id, age_restriction) VALUES (1, 'Chainsaw', 'Great condition only used once', TRUE, 1, 1, 18);
INSERT INTO items(id, name, description, is_available, category_id, owner_id, age_restriction) VALUES (2, 'Drill', 'Like new', TRUE, 2, 2, 18);
INSERT INTO items(id, name, description, is_available, category_id, owner_id, age_restriction) VALUES (3, 'Ladder', 'Strong and sturdy', TRUE, 3, 3, 16);
