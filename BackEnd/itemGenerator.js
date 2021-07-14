

const books = [
  {name: 'DVSA theory test paperback', description: 'This publication is the official theory test book for car drivers, compiled by the Driver and Vehicle Standards Agency. It contains multiple choice questions from the whole theory test question bank, with answers and explanations, dealing with topics such as: alertness and attitude, vehicle safety and handling, safety margins, hazard awareness, vulnerable road users, motorway rules and rules of the road, road and traffic signs, documents, accidents, and vehicle loading.', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/51y1yTiUssL._SX350_BO1,204,203,200_.jpg', price: 1.99},
  {name: 'The Essential New Truckers Handbook', description: 'This invaluable 28 chapter handbook is written by an LGV 1 driver of 24 years’ experience in collaboration with an LGV trainer for the sole purpose of helping new and returning drivers confidently and safely into work. Readers will find this comprehensive handbook beneficial, accessible and user friendly. Whether you are just starting out in your career, or a returning veteran of the open road, you will find everything you need in these chapters to support your way forward', imgURL: 'https://images-na.ssl-images-amazon.com/images/I/511tdFXXXIL._SX331_BO1,204,203,200_.jpg', price: 2},
  {name: 'AA Road Atlas Britain 2022', description: 'Top-selling A4 road atlas showcasing Britain’s clearest mapping at 3.2 miles to 1 inch. 112 city, town, port and airport plans. Top 300 AA-inspected caravan and camping sites. Over 240 service areas. 10 pages of Central London street mapping with index Content', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/5148fY3Ws+S._SX368_BO1,204,203,200_.jpg', price: 2.50},
  {name: 'Relentless: Secrets of the Sporting Elite', description: 'From an early age Alistair Brownlee has been obsessed with being the very best, and not just improving his sporting performance across his three specialist triathlon disciplines of swimming, cycling and running, but also understanding how a winner becomes a dominant champion. Winning gold in consecutive Olympic Games has only strengthened this need and desire.', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/41Q299E+55L._SX321_BO1,204,203,200_.jpg', price: 1.25},
  {name: 'A Manual for Being Human', description: 'Do you want to believe in yourself and your ability to be content with who you are? If the answer is yes, then A Manual for Being Human is the book you need to read.', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/510p9+reX-S._SX309_BO1,204,203,200_.jpg', price: 0.8},
  {name: 'UEFA EURO 2020: Official Final Programme', description: 'The Euros 2020', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/51HrfPuRYjS._SX397_BO1,204,203,200_.jpg', price: 1.49},
  {name: 'Jane’s Patisserie: Deliciously customisable cakes, bakes and treats', description: 'Janes recipes are loved for being easy, customisable, and packed with your favourite flavours. Covering everything from gooey cookies and celebration cakes with a dreamy drip finish, to fluffy cupcakes and creamy no-bake cheesecakes, Janes Patisserie is easy baking for everyone.', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/51eL8VHhDkS._SX384_BO1,204,203,200_.jpg', price: 1.99},
  {name: 'The Ballad of Songbirds and Snakes (A Hunger Games Novel)', description: 't is the morning of the reaping that will kick off the tenth annual Hunger Games. In the Capitol, eighteen-year-old Coriolanus Snow is preparing for his one shot at glory as a mentor in the Games. The once-mighty house of Snow has fallen on hard times, its fate hanging on the slender chance that Coriolanus will be able to outcharm, outwit, and outmaneuvre his fellow students to mentor the winning tribute.', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/41iVjswdT+S._SX324_BO1,204,203,200_.jpg', price: 1.75},
  {name: 'The Cove: A Summer Suspense Mystery', description: 'The ‘Underground Killer’ takes his victims when they least expect it: standing on the edge of a busy Tube platform, as they wait for a train to arrive through the murky underground tunnels of London.', imgUrl: 'https://m.media-amazon.com/images/I/51FInNmoxSS.jpg', price: 2.20},
  {name: 'Pinch of Nom Comfort Food: 100 Slimming, Satisfying Meals', description: 'From satisfying savoury dishes to indulgent desserts, Pinch of Nom Comfort Food is packed with slimming-friendly, delicious dishes that will keep you and your loved ones happy and healthy. From lazy weekend breakfasts to filling mains and warming puddings, this book is brimming with tasty meals that are easy to make. Many of the dishes have alternative cooking methods, so you can choose whether to cook in the oven, slow cooker or pressure cooker, depending on your schedule.', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/41F9CR0H5BS._SX382_BO1,204,203,200_.jpg', price: 0.99},
  {name: 'The Man Who Died Twice', description: 'Elizabeth has received a letter from an old colleague, a man with whom she has a long history. He has made a big mistake, and he needs her help. His story involves stolen diamonds, a violent mobster, and a very real threat to his life.', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/51hKJBrGeLL._SX323_BO1,204,203,200_.jpg', price: 0.99},
  {name: 'If Only: The perfect feel-good romantic comedy', description: 'Today started off like every other: tedious letters, refilling the coffee machine, unjamming the printer. But then, just as I was about to clock off, for a girls’ night of pasta and wine with my best friends, BIG NEWS: Michael Hunter is going to be my new boss.', imgUrl: 'https://m.media-amazon.com/images/I/411dVb9RK4S.jpg', price: 1.10},
  {name: 'You Are a Champion: How to Be the Best You Can Be', description: 'Marcus Rashford MBE is famous worldwide for his skills both on and off the pitch – but before he was a Manchester United and England footballer, and long before he started his inspiring campaign to end child food poverty, he was just an average kid from Wythenshawe, South Manchester. Now the nations favourite footballer wants to show YOU how to achieve your dreams, in this positive and inspiring guide for life.', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/51W917k3oxL._SX343_BO1,204,203,200_.jpg', price: 1.40},
  {name: 'The Official DVSA Highway Code', description: 'Keep safe, make sure you’re up to date with the latest rules of the road, and avoid penalties and fines by getting your copy of The Official DVSA Highway Code. The Official Highway Code is essential reading for all road users in England, Scotland and Wales, providing all the latest rules of the road and traffic signs.', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/41QkwqxT89L._SX265_BO1,204,203,200_.jpg', price: 1.75},
  {name: '101 Essays That Will Change The Way You Think', description: 'In her second compilation of published writing, Brianna Wiest explores pursuing purpose over passion, embracing negative thinking, seeing the wisdom in daily routine, and becoming aware of the cognitive biases that are creating the way you see your life. This book contains never before seen pieces as well as some of Briannas most popular essays, all of which just might leave you thinking: this idea changed my life.', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/41mPZ7VEXgL._SX322_BO1,204,203,200_.jpg', price: 1.50},
  {name: 'The Fast 800 Recipe Book', description: 'Dr Clare Bailey, GP, and acclaimed food writer Justine Pattison have created meals which are tasty and easy to make, from breakfasts and brunches, soups and shakes to more substantial suppers and even occasional indulgent treats. All the recipes are based on the low-carb Mediterranean style of eating now proven to revolutionise your health. ', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/51-+CLSkIOL._SX378_BO1,204,203,200_.jpg'},
  {name: 'The Very Hungry Caterpillar [Board Book]', description: 'Eric Carles The Very Hungry Caterpillar is a perennial favourite with children and adults alike Its imaginative illustration and clever cutout detail charts the progress of a very hungry caterpillar as he eats his way through the week.', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/51Fz6bCgWdS._SY355_BO1,204,203,200_.jpg', price: 0.35}
]

const multimedia = [
  {name: 'Godzilla vs. Kong', description: 'Godzilla vs. Kong (DVD) 2021', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/6/63/Godzilla_vs._Kong.png', price: 3.99},
  {imgURL: 'https://media.4rgos.it/s/Argos/8186713_R_SET?$Main768$&w=620&h=620', name: 'Fast & Furious 8-Film Collection', description: 'Fast & Furious 8-Film Collection (DVD) 1-8 box set', price: 4.99},
  {imgURL: 'https://lumiere-a.akamaihd.net/v1/images/p_rayaandthelastdragon_21294_83346778.jpeg', name: 'Raya and the Last Dragon', description: 'Raya and the Last Dragon (DVD) 2021', price: 6.00},
  {imgURL: 'https://m.media-amazon.com/images/I/711IwLxtcMS._AC_SX522_.jpg', name: 'Zack Snyders Justice League', description: 'Zack Snyders Justice League [Blu-ray] [2021]', price: 6.99},
  {imgURL: 'https://1.bp.blogspot.com/-WajuSBTE4A0/XQd15LgLONI/AAAAAAAARrI/Bjwz5DyIedwad5J0HXdr0zquLL7GTDFpQCLcBGAs/s1600/johnwick.png', name: 'John Wick: Chapter 3 - Parabellum', description: 'John Wick: Chapter 3 - Parabellum (DVD)', price: 2.99},
  {imgURL: 'https://m.media-amazon.com/images/I/71MfOoaUouL._AC_SX522_.jpg', name: 'Tenet', description: 'Tenet [Blu-ray] [2020]', price: '3.99'},
  {name: 'M-Audio Keystation 88 MK3 keyboard', description: 'Music Production Essential – MIDI keyboard controller with 88 full-size velocity-sensitive semi weighted keys for MIDI control of virtual instruments, software samplers and plug-in synthesisers', price: 45, imgUrl: 'https://m.media-amazon.com/images/I/510TEshVGwS._AC_SL1500_.jpg'},
  {name: 'Blue Microphones Yeti Professional USB Microphone', price: 30, imgUrl: 'https://m.media-amazon.com/images/I/71aXlp2i+tL._AC_SX679_.jpg', description: 'Unleash your creativity: Yeti USB professional mic with custom recording softwares PreSonus and iZotope advanced studio mastering; creates pro-level audio-content projects that boost productivity'},
  {name: 'Fender Player Telecaster Electric Guitar', price: 99, imgUrl: 'https://m.media-amazon.com/images/I/61YyPg72wDL._AC_SX679_.jpg', description: 'Any repairs for the guitar will be payable by the borrower'},
  {name: 'Oculus Quest 2 — Advanced All-In-One Virtual Reality Headset ', price: 75, imgUrl: 'https://m.media-amazon.com/images/I/615YaAiA-ML._AC_SL1500_.jpg', description: 'Immersive Entertainment - Get the best seat in the house to live concerts, groundbreaking films, exclusive events and more.'},
  {name: 'Vocal-Star PA Speaker System 1000w', price: 100, imgUrl: 'https://m.media-amazon.com/images/I/71MHZJB-0QL._AC_SX679_.jpg', description: 'These Vocal-Star 2x 500w speakers are ideal to be the centre of your Venue or DJ setup, This powerful system comes complete with a set of 2 professional speaker stands with Carry Bag, connecting cable & a VS-MP508 Wired Microphone'},
  {name: 'Sony PlayStation 4 500GB Console', price: 45, imgUrl: 'https://m.media-amazon.com/images/I/71XY2MwEvlL._AC_SX679_.jpg', description: 'A Stunning New Design : A slimmer and lighter console with stylish new looks and packed with true PlayStation 4 power.'},
  {name: 'Xbox Series S', price: 75, imgUrl: 'https://m.media-amazon.com/images/I/71NBQ2a52CL._AC_SX679_.jpg', description: 'Xbox Series S, the smallest, sleekest Xbox console ever. Experience the speed and performance of a next-gen all-digital console at an accessible price point.'},
  {name: 'Xbox Wireless Controller – Shock Blue', price: 6.99, imgUrl: 'https://m.media-amazon.com/images/I/51Lzj093uML._AC_SX679_.jpg', description: 'Experience the modernised design of the Xbox Wireless Controller – Shock Blue, featuring sculpted surfaces and refined geometry for enhanced comfort and effortless control during gameplay'},
]

const electronics = [
  {name: 'Nikon VQA060EA Coolpix P1000', price: 169.99,imgUrl: 'https://m.media-amazon.com/images/I/81cRMAA5xDL._AC_SX679_.jpg', description: 'Worlds biggest zoom on a camera: 125x optical zoom and focal-length range of 24-3000mm'},
  {name: 'Nikon D3500 18-55mm + 70-300 VRmm DX DSLR Twin Kit', price: 119.99,imgUrl: 'https://m.media-amazon.com/images/I/81SUiGUEwkL._AC_SX679_.jpg', description: 'Capture it all. From the magic of midnight to the colours of a new day. With an ISO light-sensitivity range of 100–25600, your photos and videos will shine in any light.'},
  {name: 'GoPro HERO 9', price: 89.99,imgUrl: 'https://m.media-amazon.com/images/I/51T4S8orKFL._AC_SX679_.jpg', description: 'Shoot stunning video with up to 5K resolution, perfect for maintaining serious detail even when zooming in. Packing a new 23.6MP sensor that’s an absolute powerhouse, HERO9 Black brings lifelike image sharpness, fluid motion and in-camera horizon leveling'},
  {name: 'Samsung Evo plus 128GB Micro SD SDXC memory card', price: 5.99,imgUrl: 'https://m.media-amazon.com/images/I/71VpTb++OQL._AC_SX679_.jpg', description: '128Gb ultrafast sd card'},
  {name: 'Apple AirTag', price: 15,imgUrl: 'https://m.media-amazon.com/images/I/71+5mYCqy7S._AC_SX679_.jpg', description: 'The perfect companion to take to a festival, on holiday or on a road trip to protect your valuables.'},
  {name: 'Sanyo PLC-XP100 Portable Networkable Projector with Standard Lens', price: 649,imgUrl: 'https://m.media-amazon.com/images/I/414EcqsHxVL._AC_.jpg', description: 'Planning a town movie night? this is the perfect projector for all your huge screen viewing needs!'},
  {name: 'Logitech MX Master Wireless Mouse', price: 7,imgUrl: 'https://m.media-amazon.com/images/I/61QPD0mVzBL._AC_SL1500_.jpg', description: 'Multi-Device Pairing: Pair up to 3 different PC or laptop devices and easily switch between them with the touch of a button; the MX Master wireless mouse is both Bluetooth and Unifying receiver compatible'},
  {name: '2020 Apple iMac with Retina 5K display', price: 180,imgUrl: 'https://m.media-amazon.com/images/I/71KR2i6-WaL._AC_SX679_.jpg', description: 'Need some extra horsepower to get that project finished on time? look no further.'},
  {name: 'Optiplex Dell Intel i7-2600', price: 10,imgUrl: 'https://m.media-amazon.com/images/I/41eqxdUkRUL._AC_.jpg', description: 'A basic but capable office pc.'},
  {name: 'Fierce RGB Gaming PC', price: 100,imgUrl: 'https://m.media-amazon.com/images/I/41WfLaG9RiS._AC_.jpg', description: 'Need an extra pc at the lan party?'},
  {name: 'Gigabyte GeForce RTX 3080 Ti', price: 150,imgUrl: 'https://m.media-amazon.com/images/I/61cVQGfF-ES._AC_SL1500_.jpg', description: 'Why rent a render farm when you can do it from the comfort of your own home?'},
  {name: 'NETGEAR Nighthawk Wi-Fi 6 Mesh Range Extender ', price: 30, imgUrl: 'https://m.media-amazon.com/images/I/61KEybtDjaL._AC_SX679_.jpg', description: ' Add up to 2,500 sq. ft. and 30+ devices with AX6000 Dual-Band Wireless Signal Booster & Repeater (up to 6 Gbps speed), plus Smart Roaming'},
  {name: 'My old ChromeBook with logged in Netflix account', price: 7.99, imgUrl: 'https://m.media-amazon.com/images/I/61NZUIMWsML._AC_SL1204_.jpg', description: 'Great battery for long flights and comes with my netflix account already logged in.'},
  {name: 'HUION Kamvas Pro 16 Graphics Drawing Tablet with Screen', price: 35,imgUrl: 'https://m.media-amazon.com/images/I/61FKc9zcDhL._AC_SL1500_.jpg', description: 'Full lamination crafts applied to Kamvas Pro 16 ensures seamless contact between the ultra-slim AG glass and the LCD screen, which realizes that cursor on the screen will follow tight to the movement of your pen nib and minimize the parallax.'},
  {name: 'HP Envy 6032 All in One Colour Printer', price: 15, imgUrl: 'https://m.media-amazon.com/images/I/71CvzO2JwML._AC_SX679_.jpg', description: 'Colour printer. Comes with 100 sheets of paper and included ink cartridges.'},
  {name: 'Polaroid - 9030 - Polaroid Now Instant i-Type Camera', price: 20,imgUrl: 'https://m.media-amazon.com/images/I/81uMyqSJ8mL._AC_SX679_.jpg', description: 'The perfect companion on day trips and at festivals.'},
]

const home = [
  {name: 'Subcold Super50 LED – Mini Fridge', price: 20, imgUrl: 'https://m.media-amazon.com/images/I/81uf8aq1ItS._AC_SX679_.jpg', description: 'Perfect for summer barbeques.'},
  {name: 'Shark Upright Vacuum Cleaner', price: 15, imgUrl: 'https://m.media-amazon.com/images/I/61wFrkwv9FL._AC_SX679_.jpg', description: 'Need help deep cleaning your place? rent me!'},
  {name: 'Burfam Air conditioner, Powerful Enough for Whole House or Office', price: 15, imgUrl: 'https://m.media-amazon.com/images/I/71diSGk-wiL._AC_SY879_.jpg', description: 'Temperature reduction of room down as far as 16 degrees.'},
  {name: 'Brother LS14S Metal Chassis Sewing Machine', price: 15, imgUrl: 'https://m.media-amazon.com/images/I/61gaHzQ+2qL._AC_SX679_.jpg', description: 'My reliable sewing machine.'},
  {name: 'Heavy Duty Metal Gardening Trolley', price: 10, imgUrl: 'https://m.media-amazon.com/images/I/81lI2J257CL._AC_SX679_.jpg', description: 'Handle For Pulling And Removable Drop Down Sides. Heavy Gauge Steel Mesh - load bearing capacity of approx. 400kg/880 lbs. 10 inch pneumatic wheels make it easy to pull'},
  {name: '1500W High Pressure Washer', price: 15, imgUrl: 'https://m.media-amazon.com/images/I/71ay6PBmi6S._SX522_.jpg', description: 'This power washer built in powerful 1500W motor to generate up to 120Bar water pressure at 420L/H water flow for max cleaning power. Ideal for cleaning delicate surfaces such as car, or harder surfaces such as stone and brickwork.'},
  {name: 'Hyundai 38cm Electric Lawn Mower', price: 15, imgUrl: 'https://m.media-amazon.com/images/I/71gZ6Ut8kCS._AC_SX679_.jpg', description: 'Hyundai’s Powerful 1600W Electric Lawn Mower: The Lightweight and Durable Electric Lawnmower Is Perfectly Suited For All Small To Medium Sized Lawns.'},
  {name: 'Abizoe CTCS52 2-Stroke Petrol Chainsaw', price: 20, imgUrl: 'https://m.media-amazon.com/images/I/71g4XpYocTL._SX522_.jpg', description: 'WIDE RANGE OF USE: Yard weed repair, forestry harvesting, wood splitting, forest logging, bamboo forest harvesting, road wood repairing, wood mill cutting'},
  {name: 'Metal Frame Swimming Pool with Filter Pump, 4500 liters', price: 10, imgUrl: 'https://m.media-amazon.com/images/I/51MpD4EJrkL._AC_SX679_.jpg', description: 'Great pool to have a splash about in on a hot summers day.'},
  {name: 'CosySpa Inflatable Hot Tub Spa', price: 50, imgUrl: 'https://m.media-amazon.com/images/I/71Bn-Veb9NS._AC_SL1280_.jpg', description: '2-6 Person Capacity – Quick Heating'},
  {name: 'Portable Wood Fired Steel Outdoor Pizza Oven with Built in Thermometer', price: 150, imgUrl: 'https://m.media-amazon.com/images/I/A1yxGpfzQnS._AC_SL1500_.jpg', description: 'Prep stations either side of the oven give you plenty of space to create delicious food without the need to go back and forth. The wheels make it manoeuvrable so you can easily situate your pizza oven wherever you want. Multi-fuel pizza oven for use with wood chips, chopped wood, pellets and charcoal'},
  {name: 'Large Barrel Smoker Barbecue BBQ', price: 20, imgUrl: 'https://m.media-amazon.com/images/I/71xiKP-ZAPS._AC_SL1093_.jpg', description: 'Combination charcoal grill and smoker Side fire box for either charcoal grilling or smoker Porcelain-Coated cooking grates for evenly heating'},
  {name: 'Two Socket Outdoor Weatherproof Case extension lead, 20 Metres', price: 4.99, imgUrl: 'https://m.media-amazon.com/images/I/91IyCEOqo0L._AC_SX679_.jpg', description: 'A safe outdoor garden reel that has two sockets for safe outdoor use with DIY tools and garden equipment'},
  {name: 'Cordless Drill & toolbox combo', price: 10, imgUrl: 'https://m.media-amazon.com/images/I/91E3lVADKgL._AC_SX679_.jpg', description: 'This compact tool kit contains an electric drill, Claw Hammer, Screwdrivers, Pliers and many other tools that allow you to take on almost any DIY task.'},
  {name: 'Compound Saw with Multi-Material Cutting, 45° Bevel, 50° Mitre, 300 mm Slide', price: 30, imgUrl: 'https://m.media-amazon.com/images/I/71dvMATsNwL._AC_SX679_.jpg', description: 'Multi-material: Japanese tungsten carbide tipped (TCT) blade included cuts steel, aluminium, wood with embedded nails, plastic and more'},
  {name: 'EVOLite One Size Safety Helmet', price: 2.99, imgUrl: 'https://m.media-amazon.com/images/I/51juErE8pPL._AC_SX679_.jpg', description: 'A sturdy safety helmet for manual work.'},
]

const kids = [
  {name: 'Rubiks cube', price: 0.15, imgUrl: 'https://m.media-amazon.com/images/I/718rc3jJEES._AC_SX679_.jpg', description: 'A rubiks cube.'},
  {name: 'Helium King Helium Canister', price: 20, imgUrl: 'https://m.media-amazon.com/images/I/41lJZMxflbL._AC_.jpg', description: 'Great for kids parties!'},
  {name: 'Baby Toddler Hiking Backpack', price: 10, imgUrl: 'https://m.media-amazon.com/images/I/81ry1xRlLSL._AC_SX679_.jpg', description: 'The backpack is for you, not the baby.'},
  {name: 'Indoor Retractable Stair Gate for Baby Proofing', price: 1.25, imgUrl: 'https://m.media-amazon.com/images/I/71Ldqwj9ZpL._AC_SL1500_.jpg', description: 'Not needed anymore.'},
  {name: 'High back Booster Car Seat', price: 6.99, imgUrl: 'https://m.media-amazon.com/images/I/61SBytselOL._AC_SX679_.jpg', description: 'Safety surround side impact protection, which gives your child the ideal head and body protection'},
  {name: '6V Kids Electric Motorbike', price: 7.99, imgUrl: 'https://m.media-amazon.com/images/I/71lXDzsB6OL._AC_SX679_.jpg', description: 'Up to an hour of battery-life under heavy use.'},
  {name: 'Schwinn Elm Kids Bike', price: 7.99, imgUrl: 'https://m.media-amazon.com/images/I/71JidnuCarL._AC_SX679_.jpg', description: 'Childrens bike, ideal for camping trips or first rides.'},
  {name: 'Stunt Scooter', price: 8.99, imgUrl: 'https://m.media-amazon.com/images/I/61B+mUuKW9L._AC_SY879_.jpg', description: 'My unused custom stunt scooter'},
  {name: 'Razor Ripstik', price: 3.99, imgUrl: 'https://m.media-amazon.com/images/I/717RO+U75ML._AC_SX679_.jpg', description: 'Safety Equipment such as a helmet is recommended'},
  {name: 'Helly Hansen Sport childrens life jacket', price: 5, imgUrl: 'https://m.media-amazon.com/images/I/91oJHW6G-sL._AC_SY879_.jpg', description: 'A reliable childrens bouyancy aid ideal for boat trips and sailing.'},
]

const clothes = [
  {name: 'Graduation gown & cap', price: 10, imgUrl: 'https://sc04.alicdn.com/kf/H285607a8719e4eed8ded7aac1a3b0eb3x.jpg', description: 'A high quality graduation gown and cap'},
  {name: 'Used wedding dress', price: 10, imgUrl: 'https://www.hebeos.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/p/o/po16033po1333-1.jpg', description: 'My old wedding dress'},
  {name: 'Banana costume', price: 10, imgUrl: 'https://images-eu.ssl-images-amazon.com/images/I/71fh8if9hrL.__AC_SX300_SY300_QL70_ML2_.jpg', description: 'A banana costume'},
  {name: 'Lobster costume', price: 11, imgUrl: 'https://m.media-amazon.com/images/I/61pJAruMNhL._AC_SY879_.jpg', description: 'A lobster costume'},
  {name: 'Pennywise the clown costume', price: 20, imgUrl: 'https://cdn1.expertreviews.co.uk/sites/expertreviews/files/styles/er_main_wide/public/2019/10/best_halloween_costume_pennywise_1_1.jpg?itok=twCPPk9T', description: 'Pennywise from IT adults costume'},
  {name: 'small dog pumpkin costume', price: 5, imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/71taF5yYdbL._AC_SL1500_.jpg', description: 'A pumpkin costume and hat for a small dog'},
  {name: 'Full-body ski suit', price: 15, imgUrl: 'https://images.cdn.snowleader.com/media/catalog/product/cache/1/image/0dc2d03fe217f8c83829496872af24a0/w/o/women_s_ski_suit_rainbow_road_female_fit-configurable-oosc-oosc00008_2_1.jpg', description: 'A full body white & rainbow ski suit'},
  {name: 'Longsleeve 3mm wetsuit', price: 10, imgUrl: 'https://proswim.scdn3.secure.raxcdn.com/media/catalog/product/cache/c468e5b8d69c4f0274e708985c9c4249/v/i/vision---men_s---front.jpg', description: 'A comfy 3mm thick long sleeve wetsuit'},
  {name: 'Foam padded knee pads for work or sports', price: 6.99, imgUrl: 'https://m.media-amazon.com/images/I/81WyFkDNTVL._AC_SL1500_.jpg', description: 'Thick foam padding for sports or work'},
  {name: 'Upper body motocross armour', price: 25, imgUrl: 'https://m.media-amazon.com/images/I/81dJZt6O2XL._AC_SL1500_.jpg', description: 'Sturdy but light motocross armour'},
]

const sports = [
  {name: 'Full rounders set', price: 20, imgUrl: 'https://www.sportsballshop.co.uk/acatalog/Clubrounders2lusum.jpg', description: 'includes: 4 bats, 4 posts, 8 balls, 2 pitching spots'},
  {name: 'Football', price: 2.99, imgUrl: 'https://static.nike.com/a/images/f_auto/dpr_3.0/w_300,c_limit/499aeb16-c7cb-4117-a22d-4d995fd7526c/nike-football.jpg', description: 'High quality nike football'},
  {name: 'Volleyball net', price: 20, imgUrl: 'https://i.ebayimg.com/images/g/Zr8AAOSw7VJcp0Wh/s-l500.jpg', description: 'Easy to put up and very sturdy.'},
  {name: '8 man tent', price: 65, imgUrl: 'https://3378359.app.netsuite.com/core/media/media.nl?id=3525783&c=3378359&h=8b3eadd53b610fdcb42b', description: 'Waterproof tent, sleeps 8 with a large shared social space'},
  {name: '2X2 person sea kayaks', price: 100, imgUrl: 'https://www.escapemonthly.com/wp-content/uploads/Best-Tandem-Kayak-1155x770.jpg', description: 'Very well balanced and unsinkable! 4 paddles included.'},
  {name: 'Santa Cruz fibreglass shortboard', price: 30, imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/61Zyc-j6qVL._AC_SL1100_.jpg', description: 'A lovely fibreglass surfboard.'},
  {name: 'Full set of climbing gear x3', price: 89.99, imgUrl: 'http://www.climbermonkeysabroad.com/wp-content/uploads/2019/01/Our-Climbing-Gear.jpg', description: 'All you need to go outdoor climbing with 2 others.'},
  {name: 'Santa Cruz Nomad enduro bike', price: 80, imgUrl: 'https://s14761.pcdn.co/wp-content/uploads/2019/02/Santa-Cruz-Nomad-2019-Test-Review-1.jpg', description: 'Very solid downhill/enduro bike.'},
  {name: 'golf clubs full set', price: 20, imgUrl: 'https://fatllama.com/_next/image?url=https%3A%2F%2Fassets.fatllama.com%2Fimages%2Fmedium%2Fwilson-prostaff-sgi-golf-club-set--carry-bag-31196549.JPG&w=1024&q=75', description: 'great clubs for both beginners and experienced players.'},
  {name: 'Vintage wooden sledge', price: 9.99, imgUrl: 'https://www.trampsuk.co.uk/tramps/uploads/81016-min-scaled.jpg', description: 'Much faster than it looks!'},
  {name: '1x full scuba diving set', price: 40, imgUrl: 'https://www.sportdiver.com/sites/sportdiver.com/files/styles/opengraph_1_91x1/public/images/2019/07/spdsp19_05_rentbuy_hnx8j7.jpg?itok=2lecphGW', description: 'All the gear you need to go scuba diving'},
  {name: 'Laser Pico sailing boat', price: 70, imgUrl: 'https://a1.amlimg.com/M2Q5NTAzNGIxOGE3NmE3ZGE1N2M4ZjViNTI2Y2ZmMjewwFJRfYdcnyWOJgc6GOrCaHR0cDovL21lZGlhLmFkc2ltZy5jb20vMWVhYWE2YWIyMzJhZjlmYWYwZjJkODBiZDQ5ZTIzY2U5N2Y5NmFhYTAwMzhkZThmNGYwODQ2NTk0NmQyNDcxNC5qcGd8fHx8fHw0ODh4NTI1fGh0dHA6Ly93d3cuYWR2ZXJ0cy5pZS9zdGF0aWMvaS93YXRlcm1hcmsucG5nfHx8.jpg', description: 'Great beginners boat'},
  {name: 'Camping chairs x4', price: 20, imgUrl: 'https://m.media-amazon.com/images/I/71hP7QF3RBL._AC_SL1500_.jpg', description: 'good quality camping chairs'},
  {name: 'Large hexagon gazebo', price: 35, imgUrl: 'https://m.media-amazon.com/images/I/91FzbQt8vSS._AC_SX679_.jpg', description: 'Very large and easy to put up for its size'},
  {name: 'Fishing gear', price: 20, imgUrl: 'https://media.4rgos.it/i/Argos/2820-m0014-m007-m050-asym-m008-m022-fishinggearguide-as293414344?maxW=768&qlt=75&fmt.jpeg.interlaced=true', description: 'All the gear you need for one person to go river/lake fishing'},
]

const motor = [
  {name: 'AstroAI Mini Fridge 4 Litre/6 Can Portable AC/DC Powered', price: 10, imgUrl: 'https://m.media-amazon.com/images/I/61XXYXtuhcL._AC_SX679_.jpg', description: 'Perfect for beach days in the car'},
  {name: '12-Volt UltraSafe Portable Lithium Jump Starter', price: 15, imgUrl: 'https://m.media-amazon.com/images/I/91wVViz9ThL._AC_SX679_.jpg', description: 'A jump starter for when your battery mysteriously goes flat'},
  {name: 'Heavy Duty Adjustable Steel Motorbike Jack ', price: 10, imgUrl: 'https://m.media-amazon.com/images/I/61lHQgGJLiS._AC_SL1463_.jpg', description: 'A strong hydraulic jack for working on your bike'},
  {name: '2X Draper 2 Tonne Car Ramps', price: 8, imgUrl: 'https://m.media-amazon.com/images/I/61iuxzQUpAL._AC_SL1000_.jpg', description: 'Great for working safely under your car'},
  {name: 'Dog Ramp Stair Steps', price: 20, imgUrl: 'https://m.media-amazon.com/images/I/71YA0x6LpYL._AC_SX679_.jpg', description: 'Steps to help your dog into the car'},
  {name: 'Car battery charger', price: 10, imgUrl: '10-Amp Fully-Automatic Smart Charger', description: 'Smart battery recovery battery charger'},
  {name: 'HandiRack Universal Car Roof Rack', price: 10, imgUrl: 'https://m.media-amazon.com/images/I/91njxAlCh0L._AC_SL1500_.jpg', description: 'A universal roof rack for all your road trip needs'},
]

const categories = [
  {name: 'books', id: 0, items: books},
  {name: 'multimedia', id: 1, items: multimedia},
  {name: 'electronics', id: 2, items: electronics},
  {name: 'home', id: 3, items: home},
  {name: 'kids', id: 4, items: kids},
  {name: 'clothes', id: 5, items: clothes},
  {name: 'Sports', id: 6, items: sports},
  {name: 'motor', id: 7, items: motor},
]
const items = [];
const numberOfUsers = 45;

for(let i = 0; i < 16; i++){
  for(const category of categories) {

    for(const item of category.items) {
      const dbEntry = `INSERT INTO items(name, description, price, is_available, category_id, owner_id, age_restriction, img_url, city_id) VALUES ('${item.name}', '${item.description}', ${item.price}, TRUE, ${category.id}, ${assignRandomUser()}, 18, '${item.imgURL}', ${Math.floor(Math.random() * 20)});`
      items.push(dbEntry)
    }

  }
}

for(const item of items){
  console.log(item)
}


function adjustPrice(price) {
  const multiplier = Math.random() * 10
  const up_or_down = Math.random()
  let newPrice = 0;
  if(up_or_down > 0.5){
    newPrice = price * (1 + multiplier)
  }else{
    newPrice = price * (1 - multiplier)
  }
  return newPrice.toFixed(2);
}



function assignRandomUser() {
  const user_id = Math.floor(Math.random() * numberOfUsers)
  return user_id
}
