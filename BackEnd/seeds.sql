INSERT INTO location(name) VALUES ('London');
INSERT INTO location(name) VALUES ('Birmingham');
INSERT INTO location(name) VALUES ('Glasgow');
INSERT INTO location(name) VALUES ('Liverpool');
INSERT INTO location(name) VALUES ('Bristol');
INSERT INTO location(name) VALUES ('Manchester');
INSERT INTO location(name) VALUES ('Sheffield');
INSERT INTO location(name) VALUES ('Leeds');
INSERT INTO location(name) VALUES ('Edinburgh');
INSERT INTO location(name) VALUES ('Leicester');
INSERT INTO location(name) VALUES ('Coventry');
INSERT INTO location(name) VALUES ('Bradford');
INSERT INTO location(name) VALUES ('Cardiff');
INSERT INTO location(name) VALUES ('Belfast');
INSERT INTO location(name) VALUES ('Nottingham');
INSERT INTO location(name) VALUES ('Kingston upon Tyne');
INSERT INTO location(name) VALUES ('Newcastle upon Tyne');
INSERT INTO location(name) VALUES ('Stock-on-Trent');
INSERT INTO location(name) VALUES ('Southampton');
INSERT INTO location(name) VALUES ('Derby');

INSERT INTO users(first_name, last_name, email, salted_password, salt, date_of_birth, phone_number, address1, address2, city_id, postcode, created_at, updated_at) VALUES ('Darshan', 'Balasingam', 'darshan.bala@sigmalabs.xyz', '$2a$08$BEA3DvDyoLR938jhe9bsAOS7T136Y8U769Yx7akYhjUf6s1doLUBy', '$2a$08$BEA3DvDyoLR938jhe9bsAO', '2000-01-01', '+447000 000 001', '1 Example Flat', 'Template Lane', 1, 'N1 1AA', NOW(), NOW());
INSERT INTO users(first_name, last_name, email, salted_password, salt, date_of_birth, phone_number, address1, address2, city_id, postcode, created_at, updated_at) VALUES ('Robert', 'Scholey', 'robert.scholey@sigmalabs.xyz', '$2a$08$j9lWhCGk/Azky9IHLsU0Zu6SbT20QlkExrv/3JqqvVclhCDO0ks9a', '$2a$08$j9lWhCGk/Azky9IHLsU0Zu', '2000-01-02', '+447000 000 002', '2 Example Flat', 'Template Lane', 1, 'N1 1AA', NOW(), NOW());
INSERT INTO users(first_name, last_name, email, salted_password, salt, date_of_birth, phone_number, address1, address2, city_id, postcode, created_at, updated_at) VALUES ('Kyle', 'Pearce', 'kyle.pearce@sigmalabs.xyz', '$2a$08$ND3kfiI5XkSevFe1t6.JveqjBDMH/LRpwpEJ2tDXTA5nykOL30KVS', '$2a$08$ND3kfiI5XkSevFe1t6.Jve', '2000-01-03', '+447000 000 003', '3 Example Flat', 'Template Lane', 1, 'N1 1AA', NOW(), NOW());
INSERT INTO users(first_name, last_name, email, salted_password, salt, date_of_birth, phone_number, address1, address2, city_id, postcode, created_at, updated_at) VALUES ('David', 'Ajayi', 'david.ajayi@sigmalabs.xyz', '$2a$08$yTFtWn138aeHFNVgxnQ26OkQsQTM2w3uk1FTiz9PqpzYsei0gwu7i', '$2a$08$yTFtWn138aeHFNVgxnQ26O', '2000-01-04', '+447000 000 004', '4 Example Flat', 'Template Lane', 1, 'N1 1AA', NOW(), NOW());
INSERT INTO users(first_name, last_name, email, salted_password, salt, date_of_birth, phone_number, address1, address2, city_id, postcode, created_at, updated_at) VALUES ('Milo', 'Boucher', 'milo.boucher@sigmalabs.xyz', '$2a$08$KHapHptcjjTiqQjadYwvIuXZ9mZkVs4FQI0T447TNMlAWoMeAjZxW', '$2a$08$KHapHptcjjTiqQjadYwvIu', '2000-01-05', '+447000 000 005', '5 Example Flat', 'Template Lane', 1, 'N1 1AA', NOW(), NOW());

INSERT INTO categories(name, description, imgURL) VALUES ('Power tools', 'DIY tools that recure elictricity', 'https://imagizer.imageshack.com/v2/320x240q90/922/rsVeWm.jpg');
INSERT INTO categories(name, description, imgURL) VALUES ('Non-Power tools', 'DIT tool that do not require electricity', 'https://imagizer.imageshack.com/v2/320x240q90/924/UxReY7.jpg');
INSERT INTO categories(name, description, imgURL) VALUES ('Vehicles', 'Vehicles used for landscapping or other DIY activities', 'https://imagizer.imageshack.com/v2/320x240q90/922/TI3elW.jpg');
INSERT INTO categories(name, description, imgURL) VALUES ('Gardening', 'Any things specific to gardening work', 'https://imagizer.imageshack.com/v2/320x240q90/923/8swh8r.jpg');
INSERT INTO categories(name, description, imgURL) VALUES ('Decking', 'Any things specific to building decks', 'https://imagizer.imageshack.com/v2/320x240q90/922/SiYJ2L.jpg');
INSERT INTO categories(name, description, imgURL) VALUES ('Slabs', 'Any things specific to building slabbing', 'https://imagizer.imageshack.com/v2/320x240q90/923/kkH8IL.jpg');
INSERT INTO categories(name, description, imgURL) VALUES ('Clothing', 'Aperal items', 'https://imagizer.imageshack.com/v2/320x240q90/923/toX8Ha.jpg');
INSERT INTO categories(name, description, imgURL) VALUES ('Gaming', 'Video games and bord games etc.', 'https://imagizer.imageshack.com/v2/320x240q90/922/BBoDCI.jpg');
INSERT INTO categories(name, description, imgURL) VALUES ('Hardware', 'Computer hardware', 'https://imagizer.imageshack.com/v2/320x240q90/922/4uUqpO.jpg');
INSERT INTO categories(name, description, imgURL) VALUES ('Stationary/Art appliances', 'Any items or objects used in the creative arts', 'https://imagizer.imageshack.com/v2/320x240q90/923/2QqCg7.jpg');

INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction, img_url) VALUES ('Chainsaw', 'Great condition only used once', FALSE, 1, 1, 18, 'logo192.png');
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction, img_url) VALUES ('Drill', 'Like new', TRUE, 1, 2, 18, 'logo192.png');
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction, img_url) VALUES ('Ladder', 'Strong and sturdy', TRUE, 2, 3, 16, 'logo192.png');
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction, img_url) VALUES ('PS4', 'Strong and sturdy', FALSE, 8, 3, 16, 'logo192.png');
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction, img_url) VALUES ('Hedge Cuttter', 'Strong and sturdy', TRUE, 1, 3, 16, 'logo192.png');
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction, img_url) VALUES ('Lawn Mower', 'Not used much', TRUE, 3, 3, 16, 'logo192.png');
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction, img_url) VALUES ('Monitor', 'Not used much', TRUE, 9, 3, 16, 'logo192.png');
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction, img_url) VALUES ('Xbox', 'Strong and sturdy', FALSE, 8, 3, 16, 'logo192.png');
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction, img_url) VALUES ('MacBook', 'Strong and sturdy', TRUE, 9, 3, 16, 'logo192.png');
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction, img_url) VALUES ('Headphones', 'Not used much', FAlSE, 9, 3, 16, 'logo192.png');
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction, img_url) VALUES ('Camera', 'Not used much', TRUE, 10, 3, 16, 'logo192.png');


