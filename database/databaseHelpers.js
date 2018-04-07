var mysql = require('mysql');
var config = require('../config.js')

var connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  port: config.port,
  database: config.database
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('database connected');
  }
});

// IF you need to drop tables on the hosted database, uncomment the below:
// connection.query(`DROP TABLE IF EXISTS claimer`, (err, res) => {
// if (err) console.log(err)
// })

connection.query(`CREATE TABLE IF NOT EXISTS provider (
id INTEGER AUTO_INCREMENT NOT NULL,providerUsername VARCHAR(16),
pPassword VARCHAR(16),PRIMARY KEY(id));`
, (err, results) => {
  if (err) console.log(err)
})

connection.query(`CREATE TABLE IF NOT EXISTS claimer (
  id INTEGER AUTO_INCREMENT NOT NULL,
  claimerUsername VARCHAR(50),
  cPassword VARCHAR(16),
  PRIMARY KEY (id)
);`, (err, res) => {
if (err) console.log(err)
})

connection.query(`CREATE TABLE IF NOT EXISTS post (
  id INTEGER AUTO_INCREMENT NOT NULL,
  title VARCHAR(100),
  username VARCHAR(20),
  description VARCHAR(255),
  address VARCHAR(50),
  city VARCHAR(25),
  state VARCHAR(2),
  zipCode VARCHAR(6),
  isClaimed BOOLEAN,
  emailAddress VARCHAR(50),
  createdAt INTEGER,
  photoUrl VARCHAR(512),
  PRIMARY KEY (id)
)`, (err, res) => {
if (err) console.log(err)
})


module.exports = connection;

//INSERT INTO post (title, username, emailAddress, description, address, city, state, zipCode, isClaimed, photoUrl) VALUES ("Left Over Apples", "mvasios1@gmail.com", "mvasios1@gmail.com", "Leftover apples from this years harvest festival. Please call soon since these are ripening already. Limit 1 crate per caller", "197 Mountain Ave", "Warren", "NJ", "07059", false, "http://tasteofnovascotia.com/wp-content/uploads/2013/05/Muwin-Estates-Orchard.jpg");
//INSERT INTO post (title, username, emailAddress, description, address, city, state, zipCode, isClaimed, photoUrl) VALUES ("Men"s Button Shirts", "mvasios1@gmail.com", "mvasios1@gmail.com", "In the process of moving to a new apartment and found several shirts I dont really use. Size L. Pretty decent shape. Please contact me if you want them, otherwise they are going to the curb soon", "53 Wolf Hill Drive", "Warren", "NJ", "07059", false, //"https://www.elizabethclareblog.com/wp-content/uploads/2015/10/IMG_9172.jpg");
//INSERT INTO post (title, username, emailAddress, description, address, city, state, zipCode, isClaimed, photoUrl) VALUES ("Old Nintendo System with games", "mrnobody@yahoo.com", "mrnobody@yahoo.com", "Cleaning out the attic and came across these. To be honest I cannot say if they work. Games include Tetris, Super Mario, etc. Going to the curb if no one claims them", "18 Bank Street", "Summit", "NJ", "07901", false, "https://pbs.twimg.com/media/DSPbe6EXcAAOf5K.jpg")
// INSERT INTO post (title, username, emailAddress, description, address, city, state, zipCode, isClaimed, photoUrl) VALUES ("Sony DVD player, like new", "johnsomebody@yahoo.com", "johnsomebody@yahoo.com", "Although I had this for 3 years I never used it. Okay maybe twice. I have extra DVDs I am considering selling in case anyone is interested.", "50 Roosevelt Ave", "Berkeley Heights", "NJ", "07922", false, "https://ytimg.googleusercontent.com/vi/qPs0ceOayy8/mqdefault.jpg");
// INSERT INTO post (title, username, emailAddress, description, address, city, state, zipCode, isClaimed, photoUrl) VALUES ("Road Bike", "rjv@yahoo.com", "rjv@yahoo.com", "Classic style road bike. Could use new tires, otherwise in good shape. Contact for more info", "1 Diamond Hill Road", "Berkeley Heights", "NJ", "07922", false, "https://pix-media.priceonomics-media.com/specialized+allez+(1).jpg");
// INSERT INTO post (title, username, emailAddress, description, address, city, state, zipCode, isClaimed, photoUrl) VALUES ("Acoustic Guitar", "rjv@yahoo.com", "rjv@yahoo.com", "Old Acoustic Guitar. Dated but works perfectly fine. Neck is a little worn, but sounds great!", "15 Mountain Boulevard", "Watchung", "NJ", "07069", false, "https://images.reverb.com/image/upload/s--iqKXnuPj--/a_exif,c_limit,e_unsharp_mask:80,f_auto,fl_progressive,g_south,h_620,q_90,w_620/v1499887895/htelyczelrq6vvy1fub9.jpg");
