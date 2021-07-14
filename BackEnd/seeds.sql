INSERT INTO team_members(name, description, email, number, cv_img, linkedin_link) VALUES ('David Ajayi', 'Hello I am David Ajay this is my test description Hello I am David Ajay this is my test description', 'david@test.com', '0141 444 444', '', 'https://linkedin.com');
INSERT INTO team_members(name, description, email, number, cv_img, linkedin_link) VALUES ('Darshan Balasigngam', 'Hello I am Darshan Balasigngam this is my test description Hello I am David Ajay this is my test description', 'Darshan@test.com', '0141 444 444', '', 'https://linkedin.com');
INSERT INTO team_members(name, description, email, number, cv_img, linkedin_link) VALUES ('Kyle Pearce', 'Hello I am Kyle Pearce this is my test description Hello I am David Ajay this is my test description', 'Kyle@test.com', '0141 444 444', '', 'https://linkedin.com');
INSERT INTO team_members(name, description, email, number, cv_img, linkedin_link) VALUES ('Milo Boucher', 'Hello I am Milo Boucher this is my test description Hello I am David Ajay this is my test description', 'Milo@test.com', '0141 444 444', '', 'https://linkedin.com');
INSERT INTO team_members(name, description, email, number, cv_img, linkedin_link) VALUES ('Rob Scholey', 'Hello I am Rob Scholey this is my test description Hello I am David Ajay this is my test description', 'Rob@test.com', '0141 444 444', '', 'https://linkedin.com');

INSERT INTO location(name, latitude, longitude) VALUES ('London', '51.5', '-0.1');
INSERT INTO location(name, latitude, longitude) VALUES ('Birmingham', '52.4', '-1.8');
INSERT INTO location(name, latitude, longitude) VALUES ('Glasgow', '55.8', '-4.2');
INSERT INTO location(name, latitude, longitude) VALUES ('Liverpool', '53.4', '-2.9');
INSERT INTO location(name, latitude, longitude) VALUES ('Bristol', '51.4', '-2.5');
INSERT INTO location(name, latitude, longitude) VALUES ('Manchester', '53.4', '-2.2');
INSERT INTO location(name, latitude, longitude) VALUES ('Sheffield', '53.3', '-1.4');
INSERT INTO location(name, latitude, longitude) VALUES ('Leeds', '53.8', '-1.5');
INSERT INTO location(name, latitude, longitude) VALUES ('Edinburgh', '55.9', '-3.1');
INSERT INTO location(name, latitude, longitude) VALUES ('Leicester', '52.6', '-1.1');
INSERT INTO location(name, latitude, longitude) VALUES ('Coventry', '52.4', '-1.5');
INSERT INTO location(name, latitude, longitude) VALUES ('Bradford', '53.7', '-1.7');
INSERT INTO location(name, latitude, longitude) VALUES ('Cardiff', '51.4', '-3.1');
INSERT INTO location(name, latitude, longitude) VALUES ('Belfast', '54.5', '-5.9');
INSERT INTO location(name, latitude, longitude) VALUES ('Nottingham', '52.9', '-1.1');
INSERT INTO location(name, latitude, longitude) VALUES ('Kingston upon Tyne', '51.4', '-0.3');
INSERT INTO location(name, latitude, longitude) VALUES ('Newcastle upon Tyne', '54.9', '-1.6');
INSERT INTO location(name, latitude, longitude) VALUES ('Stoke-on-Trent', '53.0', '-2.1');
INSERT INTO location(name, latitude, longitude) VALUES ('Southampton', '50.9', '-1.4');
INSERT INTO location(name, latitude, longitude) VALUES ('Derby', '52.9', '-1.4');

INSERT INTO users(first_name, last_name, email, salted_password, salt, date_of_birth, phone_number, address1, address2, city_id, postcode, created_at, updated_at) VALUES ('Darshan', 'Balasingam', 'darshan.bala@sigmalabs.xyz', '$2a$08$BEA3DvDyoLR938jhe9bsAOS7T136Y8U769Yx7akYhjUf6s1doLUBy', '$2a$08$BEA3DvDyoLR938jhe9bsAO', '2000-01-01', '+447000 000 001', '1 Example Flat', 'Template Lane', 1, 'N1 1AA', NOW(), NOW());
INSERT INTO users(first_name, last_name, email, salted_password, salt, date_of_birth, phone_number, address1, address2, city_id, postcode, created_at, updated_at) VALUES ('Robert', 'Scholey', 'robert.scholey@sigmalabs.xyz', '$2a$08$j9lWhCGk/Azky9IHLsU0Zu6SbT20QlkExrv/3JqqvVclhCDO0ks9a', '$2a$08$j9lWhCGk/Azky9IHLsU0Zu', '2000-01-02', '+447000 000 002', '2 Example Flat', 'Template Lane', 2, 'N1 1AA', NOW(), NOW());
INSERT INTO users(first_name, last_name, email, salted_password, salt, date_of_birth, phone_number, address1, address2, city_id, postcode, created_at, updated_at) VALUES ('Kyle', 'Pearce', 'kyle.pearce@sigmalabs.xyz', '$2a$08$ND3kfiI5XkSevFe1t6.JveqjBDMH/LRpwpEJ2tDXTA5nykOL30KVS', '$2a$08$ND3kfiI5XkSevFe1t6.Jve', '2000-01-03', '+447000 000 003', '3 Example Flat', 'Template Lane', 3, 'N1 1AA', NOW(), NOW());
INSERT INTO users(first_name, last_name, email, salted_password, salt, date_of_birth, phone_number, address1, address2, city_id, postcode, created_at, updated_at) VALUES ('David', 'Ajayi', 'david.ajayi@sigmalabs.xyz', '$2a$08$yTFtWn138aeHFNVgxnQ26OkQsQTM2w3uk1FTiz9PqpzYsei0gwu7i', '$2a$08$yTFtWn138aeHFNVgxnQ26O', '2000-01-04', '+447000 000 004', '4 Example Flat', 'Template Lane', 4, 'N1 1AA', NOW(), NOW());
INSERT INTO users(first_name, last_name, email, salted_password, salt, date_of_birth, phone_number, address1, address2, city_id, postcode, created_at, updated_at) VALUES ('Milo', 'Boucher', 'milo.boucher@sigmalabs.xyz', '$2a$08$KHapHptcjjTiqQjadYwvIuXZ9mZkVs4FQI0T447TNMlAWoMeAjZxW', '$2a$08$KHapHptcjjTiqQjadYwvIu', '2000-01-05', '+447000 000 005', '5 Example Flat', 'Template Lane', 5, 'N1 1AA', NOW(), NOW());


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

INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction, img_url, city_id) VALUES ('Chainsaw', 'Great condition only used once', FALSE, 1, 1, 18, '', 1);
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction, img_url, city_id) VALUES ('Drill', 'Like new', TRUE, 1, 2, 18, '', 2);
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction, img_url, city_id) VALUES ('Ladder', 'Strong and sturdy', TRUE, 2, 3, 16, '', 3);
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction, img_url, city_id) VALUES ('PS4', 'Strong and sturdy', FALSE, 8, 3, 16, '', 4);
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction, img_url, city_id) VALUES ('Hedge Cuttter', 'Strong and sturdy', TRUE, 1, 3, 16, '', 5);
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction, img_url, city_id) VALUES ('Lawn Mower', 'Not used much', TRUE, 3, 3, 16, '', 1);
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction, img_url, city_id) VALUES ('Monitor', 'Not used much', TRUE, 9, 3, 16, '', 2);
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction, img_url, city_id) VALUES ('Xbox', 'Strong and sturdy', FALSE, 8, 3, 16, '', 3);
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction, img_url, city_id) VALUES ('MacBook', 'Strong and sturdy', TRUE, 9, 3, 16, '', 4);
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction, img_url, city_id) VALUES ('Headphones', 'Not used much', FAlSE, 9, 3, 16, '', 5);
INSERT INTO items(name, description, is_available, category_id, owner_id, age_restriction, img_url, city_id) VALUES ('Camera', 'Not used much', TRUE, 10, 3, 16, '', 1);

INSERT INTO rentals(item_id, borrower_id, rented_from, rented_until) VALUES (2, 1, NOW(), NOW());
INSERT INTO rentals(item_id, borrower_id, rented_from, rented_until) VALUES (1, 4, NOW(), NOW());
