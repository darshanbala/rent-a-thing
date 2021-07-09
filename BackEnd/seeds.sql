INSERT INTO users(first_name, last_name, email, salted_password, salt, date_of_birth, phone_number, address1, address2, city, postcode, created_at, updated_at) VALUES ('Darshan', 'Balasingam', 'darshan.bala@sigmalabs.xyz', '$2a$08$BEA3DvDyoLR938jhe9bsAOS7T136Y8U769Yx7akYhjUf6s1doLUBy', '$2a$08$BEA3DvDyoLR938jhe9bsAO', '2000-01-01', '+447000 000 001', '1 Example Flat', 'Template Lane', 'London', 'N1 1AA', NOW(), NOW());
INSERT INTO users(first_name, last_name, email, salted_password, salt, date_of_birth, phone_number, address1, address2, city, postcode, created_at, updated_at) VALUES ('Robert', 'Scholey', 'robert.scholey@sigmalabs.xyz', '$2a$08$j9lWhCGk/Azky9IHLsU0Zu6SbT20QlkExrv/3JqqvVclhCDO0ks9a', '$2a$08$j9lWhCGk/Azky9IHLsU0Zu', '2000-01-02', '+447000 000 002', '2 Example Flat', 'Template Lane', 'London', 'N1 1AA', NOW(), NOW());
INSERT INTO users(first_name, last_name, email, salted_password, salt, date_of_birth, phone_number, address1, address2, city, postcode, created_at, updated_at) VALUES ('Kyle', 'Pearce', 'kyle.pearce@sigmalabs.xyz', '$2a$08$ND3kfiI5XkSevFe1t6.JveqjBDMH/LRpwpEJ2tDXTA5nykOL30KVS', '$2a$08$ND3kfiI5XkSevFe1t6.Jve', '2000-01-03', '+447000 000 003', '3 Example Flat', 'Template Lane', 'London', 'N1 1AA', NOW(), NOW());
INSERT INTO users(first_name, last_name, email, salted_password, salt, date_of_birth, phone_number, address1, address2, city, postcode, created_at, updated_at) VALUES ('David', 'Ajayi', 'david.ajayi@sigmalabs.xyz', '$2a$08$yTFtWn138aeHFNVgxnQ26OkQsQTM2w3uk1FTiz9PqpzYsei0gwu7i', '$2a$08$yTFtWn138aeHFNVgxnQ26O', '2000-01-04', '+447000 000 004', '4 Example Flat', 'Template Lane', 'London', 'N1 1AA', NOW(), NOW());
INSERT INTO users(first_name, last_name, email, salted_password, salt, date_of_birth, phone_number, address1, address2, city, postcode, created_at, updated_at) VALUES ('Milo', 'Boucher', 'milo.boucher@sigmalabs.xyz', '$2a$08$KHapHptcjjTiqQjadYwvIuXZ9mZkVs4FQI0T447TNMlAWoMeAjZxW', '$2a$08$KHapHptcjjTiqQjadYwvIu', '2000-01-05', '+447000 000 005', '5 Example Flat', 'Template Lane', 'London', 'N1 1AA', NOW(), NOW());

INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction) VALUES ('Chainsaw', 'Great condition only used once', FALSE, 1, 1, 18);
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction) VALUES ('Drill', 'Like new', TRUE, 2, 2, 18);
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction) VALUES ('Ladder', 'Strong and sturdy', TRUE, 3, 3, 16);
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction) VALUES ('PS4', 'Strong and sturdy', FALSE, 3, 3, 16);
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction) VALUES ('Hedge Cuttter', 'Strong and sturdy', TRUE, 3, 3, 16);
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction) VALUES ('Lawn Mower', 'Not used much', TRUE, 3, 3, 16);
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction) VALUES ('Monitor', 'Not used much', TRUE, 3, 3, 16);
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction) VALUES ('Xbox', 'Strong and sturdy', FALSE, 3, 3, 16);
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction) VALUES ('MacBook', 'Strong and sturdy', TRUE, 3, 3, 16);
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction) VALUES ('Headphones', 'Not used much', FAlSE, 3, 3, 16);
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction) VALUES ('Camera', 'Not used much', TRUE, 3, 3, 16);