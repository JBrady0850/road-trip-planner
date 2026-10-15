/* Starter destination catalog. Coordinates are checked against OpenStreetMap (see
   docs/CATALOG.md) but hours, fees, and seasonal closures change: always verify
   before travel. Add your own destinations with the same shape.

   Stop format: [name, address or locality, lat, lon, minutes to spend, tags]
   Tags: scenic parks waterfalls beach fishing water history food lights hiking caves town */
window.RT_CATALOG = [
  {id:"nc-high-country", name:"Blue Ridge High Country", states:["NC"], base:["Boone, NC",36.2168,-81.6746], months:[5,6,7,8,9,10,11,12], tags:["scenic","parks","town","hiking"], stops:[
    ["The Blowing Rock","432 The Rock Rd, Blowing Rock, NC",36.1144,-81.6603,60,["scenic"]],
    ["Linn Cove Viaduct","Blue Ridge Pkwy MP 304, Linville, NC",36.0934,-81.8130,20,["scenic"]],
    ["Grandfather Mountain","2050 Blowing Rock Hwy, Linville, NC",36.0850,-81.8462,180,["scenic","parks","hiking"]],
    ["Original Mast General Store","3565 NC-194, Valle Crucis, NC",36.2103,-81.7816,45,["town","history"]],
    ["Downtown Boone","King St, Boone, NC",36.2168,-81.6746,60,["town","food"]]]},
  {id:"tn-smokies", name:"Great Smoky Mountains", states:["TN","NC"], base:["Gatlinburg, TN",35.7143,-83.5102], months:[4,5,6,7,8,9,10,11], tags:["scenic","parks","hiking","waterfalls"], stops:[
    ["Sugarlands Visitor Center","1420 Fighting Creek Gap Rd, Gatlinburg, TN",35.6853,-83.5367,45,["parks"]],
    ["Newfound Gap overlook","Newfound Gap Rd, Gatlinburg, TN",35.6110,-83.4252,25,["scenic"]],
    ["Clingmans Dome","Clingmans Dome Rd, Bryson City, NC",35.5571,-83.4966,75,["scenic","hiking"]],
    ["Oconaluftee Visitor Center","1194 Newfound Gap Rd, Cherokee, NC",35.5130,-83.3064,45,["parks","history"]],
    ["Cades Cove Loop","Cades Cove Loop Rd, Townsend, TN",35.6012,-83.7764,150,["scenic","parks"]]]},
  {id:"ga-nc-waterfalls", name:"Tallulah Gorge and the Waterfall Byway", states:["GA","NC"], base:["Brevard, NC",35.2334,-82.7343], months:[3,4,5,6,7,8,9,10,11], tags:["waterfalls","scenic","parks","hiking"], stops:[
    ["Tallulah Gorge State Park","338 Jane Hurt Yarn Dr, Tallulah Falls, GA",34.7380,-83.3897,90,["parks","waterfalls","hiking"]],
    ["Dry Falls","US-64, Highlands, NC",35.0689,-83.2384,40,["waterfalls"]],
    ["Looking Glass Falls","US-276, Pisgah Forest, NC",35.2966,-82.7695,30,["waterfalls"]],
    ["Downtown Brevard","Main St, Brevard, NC",35.2334,-82.7343,60,["town","food"]]]},
  {id:"ga-savannah", name:"Savannah and Tybee Island", states:["GA"], base:["Savannah, GA",32.0809,-81.0912], months:[1,2,3,4,5,10,11,12], tags:["history","town","beach","food","fishing"], stops:[
    ["Forsyth Park","Forsyth Park, Savannah, GA",32.0675,-81.0958,45,["history","town"]],
    ["River Street","River St, Savannah, GA",32.0809,-81.0912,90,["town","food"]],
    ["Wormsloe State Historic Site","7601 Skidaway Rd, Savannah, GA",31.9810,-81.0700,75,["history","scenic"]],
    ["Tybee Island Light Station","30 Meddin Dr, Tybee Island, GA",32.0220,-80.8456,60,["history","beach"]],
    ["Tybee Island Pier","Tybrisa St, Tybee Island, GA",31.9930,-80.8510,60,["beach","fishing"]]]},
  {id:"sc-charleston", name:"Charleston Lowcountry", states:["SC"], base:["Charleston, SC",32.7765,-79.9311], months:[1,2,3,4,5,10,11,12], tags:["history","town","food","beach"], stops:[
    ["The Battery","Murray Blvd, Charleston, SC",32.7700,-79.9306,45,["history","scenic"]],
    ["Fort Sumter Visitor Education Center","340 Concord St, Charleston, SC",32.7835,-79.9256,120,["history","parks"]],
    ["Magnolia Plantation and Gardens","3550 Ashley River Rd, Charleston, SC",32.8770,-80.0836,120,["history","scenic"]],
    ["Angel Oak Tree","3688 Angel Oak Rd, Johns Island, SC",32.7170,-80.0807,30,["scenic"]],
    ["Folly Beach Pier","101 E Arctic Ave, Folly Beach, SC",32.6552,-79.9404,60,["beach","fishing"]]]},
  {id:"fl-panhandle", name:"Florida Panhandle Emerald Coast", states:["FL"], base:["Destin, FL",30.3935,-86.4958], months:[3,4,5,6,9,10,11], tags:["beach","fishing","water","parks"], stops:[
    ["St. Andrews State Park","4607 State Park Ln, Panama City Beach, FL",30.1300,-85.7360,120,["beach","fishing","parks"]],
    ["Grayton Beach State Park","357 Main Park Rd, Santa Rosa Beach, FL",30.3290,-86.1640,90,["beach","parks"]],
    ["Henderson Beach State Park","17000 Emerald Coast Pkwy, Destin, FL",30.3830,-86.4400,90,["beach","parks"]],
    ["Pensacola Beach Gulf Pier","41 Fort Pickens Rd, Pensacola Beach, FL",30.3332,-87.1420,90,["beach","fishing"]]]},
  {id:"fl-keys", name:"Florida Keys Overseas Highway", states:["FL"], base:["Marathon, FL",24.7136,-81.0904], months:[1,2,3,4,5,11,12], tags:["beach","fishing","water","scenic"], stops:[
    ["John Pennekamp Coral Reef State Park","102601 Overseas Hwy, Key Largo, FL",25.1250,-80.4060,120,["water","parks"]],
    ["Seven Mile Bridge","Overseas Hwy, Marathon, FL",24.7050,-81.1400,20,["scenic"]],
    ["Bahia Honda State Park","36850 Overseas Hwy, Big Pine Key, FL",24.6560,-81.2770,120,["beach","parks","water"]],
    ["Southernmost Point","Whitehead St and South St, Key West, FL",24.5465,-81.7975,30,["town"]],
    ["Mallory Square","Mallory Square, Key West, FL",24.5596,-81.8065,90,["town","food"]]]},
  {id:"fl-st-augustine", name:"St. Augustine", states:["FL"], base:["St. Augustine, FL",29.8947,-81.3145], months:[1,2,3,4,5,10,11,12], tags:["history","beach","town","lights"], stops:[
    ["Castillo de San Marcos","1 S Castillo Dr, St. Augustine, FL",29.8978,-81.3115,90,["history","parks"]],
    ["St. Augustine Lighthouse","100 Red Cox Dr, St. Augustine, FL",29.8853,-81.2884,75,["history","scenic"]],
    ["Anastasia State Park","300 Anastasia Park Rd, St. Augustine, FL",29.8711,-81.2700,90,["beach","parks","fishing"]],
    ["St. George Street","St George St, St. Augustine, FL",29.8960,-81.3140,90,["town","food"]]]},
  {id:"al-gulf-shores", name:"Gulf Shores and Orange Beach", states:["AL"], base:["Gulf Shores, AL",30.2460,-87.7008], months:[3,4,5,6,9,10,11], tags:["beach","fishing","water","history"], stops:[
    ["Gulf State Park Pier","20800 E Beach Blvd, Gulf Shores, AL",30.2490,-87.6600,90,["beach","fishing","parks"]],
    ["Fort Morgan State Historic Site","110 AL-180, Gulf Shores, AL",30.2286,-88.0225,75,["history"]],
    ["The Wharf, Orange Beach","4830 Wharf Pkwy W, Orange Beach, AL",30.2980,-87.6140,90,["town","food"]],
    ["Bon Secour National Wildlife Refuge","12295 AL-180, Gulf Shores, AL",30.2320,-87.8280,60,["scenic","hiking"]]]},
  {id:"ms-natchez", name:"Natchez and the Natchez Trace", states:["MS"], base:["Natchez, MS",31.5604,-91.4032], months:[3,4,5,10,11,12], tags:["history","scenic","town"], stops:[
    ["Natchez Bluff Park","Broadway St, Natchez, MS",31.5590,-91.4060,30,["scenic","town"]],
    ["Emerald Mound","Natchez Trace Pkwy MP 10.3, Stanton, MS",31.6370,-91.2470,30,["history","parks"]],
    ["Vicksburg National Military Park","3201 Clay St, Vicksburg, MS",32.3440,-90.8510,150,["history","parks"]]]},
  {id:"la-new-orleans", name:"New Orleans", states:["LA"], base:["New Orleans, LA",29.9511,-90.0715], months:[1,2,3,4,5,10,11,12], tags:["food","history","town","lights"], stops:[
    ["Jackson Square","700 Decatur St, New Orleans, LA",29.9574,-90.0630,60,["history","town"]],
    ["Garden District","Prytania St, New Orleans, LA",29.9289,-90.0838,90,["history","town"]],
    ["New Orleans City Park","1 Palm Dr, New Orleans, LA",29.9934,-90.0989,90,["scenic","lights"]],
    ["The National WWII Museum","945 Magazine St, New Orleans, LA",29.9430,-90.0700,180,["history"]]]},
  {id:"ar-hot-springs", name:"Hot Springs and Petit Jean", states:["AR"], base:["Hot Springs, AR",34.5037,-93.0552], months:[3,4,5,6,9,10,11], tags:["parks","history","scenic","hiking","water"], stops:[
    ["Bathhouse Row","369 Central Ave, Hot Springs, AR",34.5135,-93.0531,90,["parks","history"]],
    ["Hot Springs Mountain Tower","401 Hot Springs Mountain Dr, Hot Springs, AR",34.5145,-93.0466,45,["scenic"]],
    ["Garvan Woodland Gardens","550 Arkridge Rd, Hot Springs, AR",34.4245,-93.0467,90,["scenic","lights"]],
    ["Petit Jean State Park","1285 Petit Jean Mountain Rd, Morrilton, AR",35.1170,-92.9360,120,["parks","waterfalls","hiking"]]]},
  {id:"ky-mammoth", name:"Mammoth Cave and Bourbon Country", states:["KY"], base:["Bowling Green, KY",36.9685,-86.4808], months:[3,4,5,6,7,8,9,10,11], tags:["caves","parks","history","food"], stops:[
    ["Mammoth Cave Visitor Center","1 Mammoth Cave Pkwy, Mammoth Cave, KY",37.1870,-86.1010,180,["caves","parks"]],
    ["Lost River Cave","2818 Nashville Rd, Bowling Green, KY",36.9520,-86.4340,75,["caves","water"]],
    ["Bardstown","N 3rd St, Bardstown, KY",37.8092,-85.4669,120,["town","history","food"]],
    ["Cumberland Falls State Resort Park","7351 KY-90, Corbin, KY",36.8380,-84.3440,90,["waterfalls","parks"]]]},
  {id:"tn-chattanooga", name:"Chattanooga and Lookout Mountain", states:["TN","GA"], base:["Chattanooga, TN",35.0456,-85.3097], months:[3,4,5,6,7,8,9,10,11,12], tags:["scenic","caves","town","history","lights"], stops:[
    ["Rock City Gardens","1400 Patten Rd, Lookout Mountain, GA",34.9732,-85.3501,120,["scenic","lights"]],
    ["Ruby Falls","1720 S Scenic Hwy, Chattanooga, TN",35.0190,-85.3390,90,["caves","waterfalls"]],
    ["Point Park","1110 E Brow Rd, Lookout Mountain, TN",35.0101,-85.3443,45,["history","scenic"]],
    ["Walnut Street Bridge","1 Walnut St, Chattanooga, TN",35.0569,-85.3070,45,["town","scenic"]]]},
  {id:"va-shenandoah", name:"Shenandoah and Skyline Drive", states:["VA"], base:["Luray, VA",38.6654,-78.4594], months:[4,5,6,7,8,9,10,11], tags:["scenic","parks","caves","hiking"], stops:[
    ["Dickey Ridge Visitor Center","Skyline Dr MP 4.6, Front Royal, VA",38.8710,-78.2040,30,["parks"]],
    ["Skyland","Skyline Dr MP 41.7, Luray, VA",38.5940,-78.3800,60,["scenic","hiking"]],
    ["Big Meadows","Skyline Dr MP 51, Stanley, VA",38.5280,-78.4400,60,["scenic","parks"]],
    ["Luray Caverns","101 Cave Hill Rd, Luray, VA",38.6640,-78.4836,90,["caves"]]]},
  {id:"nc-outer-banks", name:"Outer Banks", states:["NC"], base:["Nags Head, NC",35.9574,-75.6241], months:[4,5,6,7,8,9,10], tags:["beach","history","fishing","water","scenic"], stops:[
    ["Wright Brothers National Memorial","1000 N Croatan Hwy, Kill Devil Hills, NC",36.0140,-75.6676,75,["history","parks"]],
    ["Jockey's Ridge State Park","300 W Carolista Dr, Nags Head, NC",35.9640,-75.6330,60,["scenic","parks"]],
    ["Bodie Island Lighthouse","8210 Bodie Island Lighthouse Rd, Nags Head, NC",35.8180,-75.5630,45,["history","scenic"]],
    ["Cape Hatteras Lighthouse","46379 Lighthouse Rd, Buxton, NC",35.2507,-75.5289,75,["history","beach","fishing"]]]},
  {id:"tx-hill-country", name:"Texas Hill Country", states:["TX"], base:["Fredericksburg, TX",30.2752,-98.8720], months:[3,4,5,10,11,12], tags:["scenic","history","town","food","hiking","lights"], stops:[
    ["Enchanted Rock State Natural Area","16710 Ranch Rd 965, Fredericksburg, TX",30.4960,-98.8190,120,["parks","hiking","scenic"]],
    ["LBJ Ranch","Lyndon B Johnson State Park, Stonewall, TX",30.2400,-98.6240,90,["history","parks"]],
    ["Luckenbach","412 Luckenbach Town Loop, Fredericksburg, TX",30.1810,-98.7530,60,["town","food"]],
    ["Main Street Fredericksburg","Main St, Fredericksburg, TX",30.2752,-98.8720,90,["town","food"]]]},
  {id:"mo-ozarks", name:"Branson and the Ozarks", states:["MO"], base:["Branson, MO",36.6437,-93.2185], months:[4,5,6,7,8,9,10,11,12], tags:["water","fishing","scenic","lights","town"], stops:[
    ["Table Rock Dam and Lake","Table Rock Dam, Branson, MO",36.5960,-93.3100,60,["water","fishing","scenic"]],
    ["Lake Taneycomo trout fishing","Lake Taneycomo, Branson, MO",36.6420,-93.2110,120,["fishing","water"]],
    ["Downtown Branson Landing","100 Branson Landing Blvd, Branson, MO",36.6430,-93.2140,90,["town","food"]],
    ["Ha Ha Tonka State Park","1491 MO-D, Camdenton, MO",37.9730,-92.7700,90,["parks","scenic","history"]]]},
  {id:"mi-sleeping-bear", name:"Sleeping Bear Dunes", states:["MI"], base:["Traverse City, MI",44.7631,-85.6206], months:[5,6,7,8,9,10], tags:["beach","scenic","parks","water","fishing"], stops:[
    ["Dune Climb","Sleeping Bear Dunes, Glen Arbor, MI",44.8830,-86.0420,60,["parks","hiking"]],
    ["Pierce Stocking Scenic Drive","Pierce Stocking Dr, Empire, MI",44.8800,-86.0560,60,["scenic"]],
    ["Glen Haven","Glen Haven, MI",44.9030,-86.0230,45,["history","beach"]],
    ["Downtown Traverse City","Front St, Traverse City, MI",44.7631,-85.6206,90,["town","food"]]]},
  {id:"wi-door-county", name:"Door County", states:["WI"], base:["Fish Creek, WI",45.1283,-87.2459], months:[5,6,7,8,9,10], tags:["scenic","water","parks","town","fishing"], stops:[
    ["Peninsula State Park","9462 Shore Rd, Fish Creek, WI",45.1350,-87.2290,120,["parks","scenic"]],
    ["Cave Point County Park","5360 Schauer Rd, Sturgeon Bay, WI",44.9310,-87.1780,45,["scenic","water"]],
    ["Sister Bay","Sister Bay, WI",45.1867,-87.1218,60,["town","food"]]]},
  {id:"sd-black-hills", name:"Black Hills and Badlands", states:["SD"], base:["Rapid City, SD",44.0805,-103.2310], months:[5,6,7,8,9,10], tags:["scenic","parks","history","hiking"], stops:[
    ["Mount Rushmore National Memorial","13000 SD-244, Keystone, SD",43.8791,-103.4591,90,["history","parks"]],
    ["Crazy Horse Memorial","12151 Avenue of the Chiefs, Crazy Horse, SD",43.8364,-103.6236,75,["history"]],
    ["Needles Highway","SD-87, Custer State Park, SD",43.8490,-103.5280,60,["scenic","parks"]],
    ["Badlands Ben Reifel Visitor Center","25216 Ben Reifel Rd, Interior, SD",43.7480,-101.9410,120,["parks","scenic"]]]},
  {id:"wy-yellowstone", name:"Yellowstone", states:["WY","MT"], base:["West Yellowstone, MT",44.6621,-111.1041], months:[6,7,8,9], tags:["parks","scenic","hiking","fishing"], stops:[
    ["Old Faithful","Old Faithful, Yellowstone National Park, WY",44.4605,-110.8281,120,["parks","scenic"]],
    ["Grand Prismatic Spring","Midway Geyser Basin, Yellowstone National Park, WY",44.5251,-110.8382,60,["parks","scenic"]],
    ["Artist Point","Grand Canyon of the Yellowstone, WY",44.7202,-110.4797,60,["scenic","waterfalls"]],
    ["Mammoth Hot Springs","Mammoth, Yellowstone National Park, WY",44.9767,-110.7036,75,["parks","scenic"]]]},
  {id:"mt-glacier", name:"Glacier National Park", states:["MT"], base:["West Glacier, MT",48.4955,-113.9811], months:[7,8,9], tags:["parks","scenic","hiking","water"], stops:[
    ["Lake McDonald","Apgar, West Glacier, MT",48.5280,-113.9910,60,["water","scenic"]],
    ["Logan Pass Visitor Center","Going-to-the-Sun Rd, West Glacier, MT",48.6967,-113.7182,90,["scenic","hiking","parks"]],
    ["Many Glacier","Many Glacier Rd, Browning, MT",48.7969,-113.6578,120,["scenic","hiking"]]]},
  {id:"az-grand-canyon", name:"Grand Canyon and Sedona", states:["AZ"], base:["Flagstaff, AZ",35.1983,-111.6513], months:[3,4,5,9,10,11], tags:["parks","scenic","hiking","history"], stops:[
    ["Mather Point","Grand Canyon Village, AZ",36.0617,-112.1077,90,["parks","scenic"]],
    ["Desert View Watchtower","Desert View Dr, Grand Canyon, AZ",36.0441,-111.8261,60,["scenic","history"]],
    ["Historic Route 66, Williams","Route 66, Williams, AZ",35.2495,-112.1910,60,["town","history"]],
    ["Sedona and Red Rock Scenic Byway","AZ-179, Sedona, AZ",34.8697,-111.7610,120,["scenic","hiking"]]]},
  {id:"ut-mighty-five", name:"Utah National Parks", states:["UT"], base:["Torrey, UT",38.2997,-111.4199], months:[4,5,6,9,10], tags:["parks","scenic","hiking"], stops:[
    ["Zion Canyon Visitor Center","1 Zion Park Blvd, Springdale, UT",37.2002,-112.9870,180,["parks","hiking"]],
    ["Bryce Canyon Inspiration Point","Bryce Canyon National Park, UT",37.6200,-112.1690,90,["parks","scenic"]],
    ["Capitol Reef Visitor Center","16 Scenic Dr, Torrey, UT",38.2913,-111.2617,90,["parks","scenic"]],
    ["Arches Visitor Center","Arches National Park, Moab, UT",38.6163,-109.6198,150,["parks","scenic","hiking"]]]},
  {id:"co-rockies", name:"Colorado Rockies", states:["CO"], base:["Estes Park, CO",40.3772,-105.5217], months:[6,7,8,9], tags:["parks","scenic","hiking","fishing"], stops:[
    ["Beaver Meadows Visitor Center","1000 US-36, Estes Park, CO",40.3660,-105.5600,45,["parks"]],
    ["Trail Ridge Road Alpine Visitor Center","Trail Ridge Rd, Rocky Mountain National Park, CO",40.4410,-105.7540,60,["scenic","parks"]],
    ["Garden of the Gods","1805 N 30th St, Colorado Springs, CO",38.8784,-104.8698,90,["scenic","hiking"]],
    ["Pikes Peak Summit","Pikes Peak Hwy, Cascade, CO",38.8409,-105.0423,90,["scenic"]]]},
  {id:"nm-santa-fe", name:"Santa Fe and Taos", states:["NM"], base:["Santa Fe, NM",35.6870,-105.9378], months:[4,5,6,9,10,11,12], tags:["history","town","scenic","food","lights"], stops:[
    ["Santa Fe Plaza","63 Lincoln Ave, Santa Fe, NM",35.6870,-105.9378,90,["history","town","food"]],
    ["Bandelier National Monument","15 Entrance Rd, Los Alamos, NM",35.7790,-106.2700,120,["history","parks","hiking"]],
    ["Taos Pueblo","120 Veterans Hwy, Taos, NM",36.4396,-105.5450,90,["history"]],
    ["Rio Grande Gorge Bridge","US-64, Taos, NM",36.4760,-105.7330,30,["scenic"]]]},
  {id:"ca-big-sur", name:"Big Sur and the Central Coast", states:["CA"], base:["Monterey, CA",36.6002,-121.8947], months:[4,5,6,7,8,9,10], tags:["scenic","beach","history","food"], stops:[
    ["Cannery Row","Cannery Row, Monterey, CA",36.6160,-121.9010,90,["town","food"]],
    ["Bixby Creek Bridge","CA-1, Big Sur, CA",36.3715,-121.9017,20,["scenic"]],
    ["McWay Falls","Julia Pfeiffer Burns State Park, Big Sur, CA",36.1580,-121.6720,45,["waterfalls","scenic"]],
    ["Hearst Castle Visitor Center","750 Hearst Castle Rd, San Simeon, CA",35.6454,-121.1841,150,["history"]]]},
  {id:"or-coast", name:"Oregon Coast and Columbia Gorge", states:["OR"], base:["Newport, OR",44.6368,-124.0535], months:[6,7,8,9], tags:["scenic","beach","waterfalls","hiking"], stops:[
    ["Multnomah Falls","53000 E Historic Columbia River Hwy, Bridal Veil, OR",45.5762,-122.1158,60,["waterfalls","hiking"]],
    ["Haystack Rock","Cannon Beach, OR",45.8840,-123.9690,60,["beach","scenic"]],
    ["Cape Perpetua","2400 US-101, Yachats, OR",44.2810,-124.1080,75,["scenic","hiking"]],
    ["Heceta Head Lighthouse","92072 US-101, Yachats, OR",44.1370,-124.1280,45,["history","scenic"]]]},
  {id:"wa-olympic", name:"Olympic Peninsula", states:["WA"], base:["Port Angeles, WA",48.1181,-123.4307], months:[6,7,8,9], tags:["parks","scenic","beach","hiking"], stops:[
    ["Hurricane Ridge","Hurricane Ridge Rd, Port Angeles, WA",47.9690,-123.4980,90,["scenic","parks","hiking"]],
    ["Lake Crescent","US-101, Port Angeles, WA",48.0590,-123.7980,60,["water","scenic"]],
    ["Hoh Rain Forest Visitor Center","18113 Upper Hoh Rd, Forks, WA",47.8600,-123.9350,120,["parks","hiking"]],
    ["Ruby Beach","US-101, Forks, WA",47.7110,-124.4150,45,["beach","scenic"]]]},
  {id:"me-acadia", name:"Acadia and Bar Harbor", states:["ME"], base:["Bar Harbor, ME",44.3876,-68.2039], months:[6,7,8,9,10], tags:["parks","scenic","fishing","food","hiking"], stops:[
    ["Cadillac Mountain summit","Cadillac Summit Rd, Bar Harbor, ME",44.3520,-68.2250,60,["scenic","parks"]],
    ["Jordan Pond House","2928 Park Loop Rd, Seal Harbor, ME",44.3200,-68.2530,75,["scenic","food","hiking"]],
    ["Bass Harbor Head Light","Lighthouse Rd, Bass Harbor, ME",44.2220,-68.3370,45,["scenic","history"]],
    ["Bar Harbor waterfront","Main St, Bar Harbor, ME",44.3876,-68.2039,90,["town","food"]]]},
  {id:"nh-vt-mountains", name:"White Mountains and Stowe", states:["NH","VT"], base:["Lincoln, NH",44.0451,-71.6701], months:[6,7,8,9,10], tags:["scenic","hiking","waterfalls","town"], stops:[
    ["Flume Gorge","852 Daniel Webster Hwy, Lincoln, NH",44.0970,-71.6800,90,["waterfalls","hiking","parks"]],
    ["Kancamagus Highway (Lincoln end)","NH-112, Lincoln, NH",44.0513,-71.5688,60,["scenic"]],
    ["Mount Washington Auto Road","1 Mt Washington Auto Rd, Gorham, NH",44.2880,-71.2250,150,["scenic"]],
    ["Stowe village","Main St, Stowe, VT",44.4654,-72.6874,90,["town","food"]]]},
  {id:"ma-cape-cod", name:"Cape Cod and Plymouth", states:["MA"], base:["Hyannis, MA",41.6525,-70.2881], months:[5,6,7,8,9,10], tags:["beach","history","fishing","food"], stops:[
    ["Plymouth Rock","79 Water St, Plymouth, MA",41.9583,-70.6623,45,["history"]],
    ["Salt Pond Visitor Center","50 Doane Rd, Eastham, MA",41.8370,-69.9720,60,["parks","beach"]],
    ["Chatham Lighthouse","37 Main St, Chatham, MA",41.6713,-69.9499,45,["history","scenic"]],
    ["Provincetown","Commercial St, Provincetown, MA",42.0526,-70.1867,120,["town","food"]]]},
  {id:"ny-finger-lakes", name:"Niagara Falls and the Finger Lakes", states:["NY"], base:["Geneva, NY",42.8689,-76.9777], months:[5,6,7,8,9,10], tags:["waterfalls","scenic","parks","hiking","food"], stops:[
    ["Niagara Falls State Park","332 Prospect St, Niagara Falls, NY",43.0860,-79.0650,150,["waterfalls","parks"]],
    ["Letchworth State Park","1 Letchworth State Park, Castile, NY",42.5895,-78.0609,120,["waterfalls","parks","hiking"]],
    ["Watkins Glen State Park","1009 N Franklin St, Watkins Glen, NY",42.3750,-76.8710,120,["waterfalls","hiking"]],
    ["Taughannock Falls State Park","1740 Taughannock Blvd, Trumansburg, NY",42.5440,-76.6020,60,["waterfalls"]]]},
  {id:"pa-gettysburg", name:"Gettysburg, Hershey and Amish Country", states:["PA"], base:["Lancaster, PA",40.0379,-76.3055], months:[4,5,6,7,8,9,10,11,12], tags:["history","food","town","lights"], stops:[
    ["Gettysburg National Military Park","1195 Baltimore Pike, Gettysburg, PA",39.8120,-77.2260,180,["history","parks"]],
    ["Hershey","Chocolate Ave, Hershey, PA",40.2859,-76.6502,120,["town","food","lights"]],
    ["Intercourse village","Old Philadelphia Pike, Intercourse, PA",40.0376,-76.1047,90,["town","history","food"]]]},
  {id:"oh-hocking-hills", name:"Hocking Hills", states:["OH"], base:["Logan, OH",39.5401,-82.4071], months:[4,5,6,7,8,9,10,11], tags:["waterfalls","hiking","parks","scenic","caves"], stops:[
    ["Old Man's Cave","19852 OH-664, Logan, OH",39.4350,-82.5390,120,["hiking","waterfalls","caves"]],
    ["Cedar Falls","Cedar Falls Rd, Logan, OH",39.4180,-82.5240,60,["waterfalls"]],
    ["Ash Cave","27291 OH-56, South Bloomingville, OH",39.3960,-82.5450,45,["caves","hiking"]]]},
  {id:"wv-new-river", name:"New River Gorge", states:["WV"], base:["Fayetteville, WV",38.0529,-81.1040], months:[4,5,6,7,8,9,10], tags:["parks","scenic","water","hiking","fishing"], stops:[
    ["Canyon Rim Visitor Center","162 Visitor Center Rd, Lansing, WV",38.0700,-81.0750,60,["parks","scenic"]],
    ["Babcock State Park grist mill","486 Babcock Rd, Clifftop, WV",38.0080,-80.9480,60,["history","scenic"]],
    ["Sandstone Falls","Sandstone Falls, Hinton, WV",37.7580,-80.9030,45,["waterfalls","fishing"]]]},
  {id:"md-de-nj-shore", name:"Chesapeake and the Delmarva Shore", states:["MD","DE","NJ"], base:["Lewes, DE",38.7746,-75.1393], months:[5,6,7,8,9,10], tags:["beach","history","fishing","town","food"], stops:[
    ["Annapolis City Dock","1 Dock St, Annapolis, MD",38.9784,-76.4922,90,["history","town","food"]],
    ["Assateague Island Visitor Center","7206 National Seashore Ln, Berlin, MD",38.2470,-75.1530,90,["beach","parks"]],
    ["Rehoboth Beach Boardwalk","Rehoboth Ave, Rehoboth Beach, DE",38.7209,-75.0760,90,["beach","town"]],
    ["Cape May","Washington St, Cape May, NJ",38.9351,-74.9060,120,["beach","history","town"]]]},
  {id:"ct-ri-coast", name:"Mystic and Newport", states:["CT","RI"], base:["Mystic, CT",41.3543,-71.9665], months:[5,6,7,8,9,10,12], tags:["history","scenic","food","beach","lights"], stops:[
    ["Mystic Seaport Museum","75 Greenmanville Ave, Mystic, CT",41.3620,-71.9660,150,["history"]],
    ["Watch Hill","Bay St, Westerly, RI",41.3110,-71.8580,60,["beach","town"]],
    ["Newport Cliff Walk","Memorial Blvd, Newport, RI",41.4720,-71.2980,90,["scenic","hiking","history"]]]},
  {id:"mn-north-shore", name:"Lake Superior North Shore", states:["MN"], base:["Two Harbors, MN",47.0227,-91.6707], months:[6,7,8,9,10], tags:["scenic","waterfalls","fishing","parks","water"], stops:[
    ["Canal Park","Canal Park Dr, Duluth, MN",46.7830,-92.0930,60,["town","scenic"]],
    ["Gooseberry Falls State Park","3206 MN-61, Two Harbors, MN",47.1430,-91.4690,75,["waterfalls","parks"]],
    ["Split Rock Lighthouse","3713 Split Rock Lighthouse Rd, Two Harbors, MN",47.2000,-91.3670,60,["history","scenic"]],
    ["Grand Marais harbor","Grand Marais, MN",47.7500,-90.3340,90,["town","fishing"]]]},
  {id:"nd-roosevelt", name:"Theodore Roosevelt National Park", states:["ND"], base:["Medora, ND",46.9139,-103.5244], months:[5,6,7,8,9,10], tags:["parks","scenic","history","hiking"], stops:[
    ["Painted Canyon overlook","I-94 Exit 32, Belfield, ND",46.8930,-103.3800,30,["scenic","parks"]],
    ["South Unit Scenic Loop","Scenic Loop Dr, Medora, ND",46.9500,-103.5000,120,["scenic","parks"]],
    ["North Unit River Bend Overlook","Riverbend Overlook, McKenzie County, ND",47.6087,-103.3782,90,["scenic","parks"]]]},
  {id:"ne-ks-plains", name:"Great Plains Landmarks", states:["NE","KS"], base:["Gering, NE",41.8258,-103.6605], months:[5,6,7,8,9,10], tags:["history","scenic","hiking"], stops:[
    ["Scotts Bluff National Monument","190276 Old Oregon Trail, Gering, NE",41.8280,-103.7070,90,["history","parks","scenic"]],
    ["Chimney Rock National Historic Site","9822 County Rd 75, Bayard, NE",41.7030,-103.3480,45,["history","scenic"]],
    ["Monument Rocks","Gove County Rd 14, Oakley, KS",38.7930,-100.7630,45,["scenic"]],
    ["Tallgrass Prairie National Preserve","2480B KS-177, Strong City, KS",38.4330,-96.5590,90,["parks","hiking"]]]},
  {id:"ok-wichita", name:"Wichita Mountains and Route 66", states:["OK"], base:["Lawton, OK",34.6036,-98.3959], months:[3,4,5,9,10,11], tags:["scenic","history","hiking","fishing"], stops:[
    ["Mount Scott","Mount Scott Rd, Wichita Mountains Wildlife Refuge, OK",34.7440,-98.5340,45,["scenic"]],
    ["Medicine Park","Medicine Park, OK",34.7310,-98.4840,60,["town","food","water"]],
    ["Blue Whale of Catoosa","2600 OK-66, Catoosa, OK",36.1950,-95.7340,30,["history"]]]},
  {id:"ia-il-river", name:"Upper Mississippi River Bluffs", states:["IA","IL"], base:["Dubuque, IA",42.5006,-90.6646], months:[5,6,7,8,9,10], tags:["scenic","history","town","fishing","hiking"], stops:[
    ["Effigy Mounds National Monument","151 IA-76, Harpers Ferry, IA",43.0890,-91.1850,90,["history","parks","hiking"]],
    ["Pikes Peak State Park","32264 Pikes Peak Rd, McGregor, IA",42.9910,-91.1690,60,["scenic","parks"]],
    ["Galena Main Street","Main St, Galena, IL",42.4167,-90.4290,120,["town","history","food"]]]},
  {id:"in-dunes", name:"Indiana Dunes and Brown County", states:["IN"], base:["Nashville, IN",39.2073,-86.2511], months:[5,6,7,8,9,10], tags:["beach","parks","hiking","town","scenic"], stops:[
    ["Indiana Dunes Visitor Center","1215 N State Rd 49, Porter, IN",41.6340,-87.0870,90,["beach","parks"]],
    ["Brown County State Park","1405 IN-46, Nashville, IN",39.1630,-86.2340,120,["scenic","parks","hiking"]],
    ["Nashville village","Van Buren St, Nashville, IN",39.2073,-86.2511,90,["town","food"]]]},
  {id:"nv-valley-of-fire", name:"Valley of Fire and Hoover Dam", states:["NV"], base:["Boulder City, NV",35.9786,-114.8325], months:[1,2,3,4,10,11,12], tags:["scenic","parks","history","hiking"], stops:[
    ["Valley of Fire Visitor Center","29450 Valley of Fire Hwy, Overton, NV",36.4290,-114.5140,120,["parks","scenic","hiking"]],
    ["Hoover Dam","Hoover Dam, Boulder City, NV",36.0160,-114.7377,90,["history","scenic"]],
    ["Red Rock Canyon Scenic Drive","1000 Scenic Loop Dr, Las Vegas, NV",36.1350,-115.4270,90,["scenic","hiking"]]]},
  {id:"id-sawtooth", name:"Sawtooth Mountains and Shoshone Falls", states:["ID"], base:["Stanley, ID",44.2160,-114.9380], months:[6,7,8,9], tags:["scenic","fishing","water","hiking"], stops:[
    ["Redfish Lake","Redfish Lake Rd, Stanley, ID",44.1440,-114.9200,120,["water","fishing","scenic"]],
    ["Sawtooth Scenic Byway","ID-75, Stanley, ID",44.1845,-114.9282,60,["scenic"]],
    ["Shoshone Falls","4155 Shoshone Falls Grade, Twin Falls, ID",42.5951,-114.4006,60,["waterfalls"]]]},
  {id:"hi-big-island", name:"Hawaii Island (fly and drive)", states:["HI"], base:["Hilo, HI",19.7241,-155.0868], months:[1,2,3,4,5,6,7,8,9,10,11,12], fly:true, tags:["parks","scenic","beach","waterfalls"], stops:[
    ["Hawaii Volcanoes Kilauea Visitor Center","1 Crater Rim Dr, Hawaii National Park, HI",19.4291,-155.2569,180,["parks","scenic"]],
    ["Akaka Falls State Park","875 Akaka Falls Rd, Honomu, HI",19.8540,-155.1520,45,["waterfalls"]],
    ["Punaluu Black Sand Beach","Punaluu Beach, Pahala, HI",19.1360,-155.5050,60,["beach"]]]},
  {id:"ak-kenai", name:"Anchorage and the Kenai Peninsula (fly and drive)", states:["AK"], base:["Seward, AK",60.1042,-149.4422], months:[6,7,8], fly:true, tags:["scenic","parks","fishing","water","hiking"], stops:[
    ["Turnagain Arm Beluga Point","Seward Hwy MP 110, Anchorage, AK",61.0048,-149.6942,30,["scenic"]],
    ["Portage Glacier","Portage Glacier Rd, Girdwood, AK",60.7840,-148.8350,60,["scenic"]],
    ["Exit Glacier","Exit Glacier Rd, Seward, AK",60.1880,-149.6310,90,["parks","hiking"]],
    ["Seward small boat harbor","Seward Harbor, Seward, AK",60.1042,-149.4422,90,["fishing","water","town"]]]}
];
