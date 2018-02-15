-- RUNSQLSTM SRCSTMF('productsp.sql') COMMIT(*NONE) NAMING(*SQL)

CREATE TABLE YOURAPP.PRODUCTSP (
	PRID DECIMAL(5, 0) NOT NULL DEFAULT 0 ,
	PRNAME CHAR(30) CCSID 37 NOT NULL DEFAULT '' ,
	PRDESC CHAR(60) CCSID 37 NOT NULL DEFAULT '' ,
	PRPRICE DECIMAL(7, 2) NOT NULL DEFAULT 0 ,
	PRIMAGE CHAR(60) CCSID 37 NOT NULL DEFAULT '' ,
	PRQTY DECIMAL(5, 0) NOT NULL DEFAULT 0 ,
	PRCATID DECIMAL(5, 0) NOT NULL DEFAULT 0 ,
	PRIMARY KEY( PRID ) )

	RCDFMT PRODUCTS;

LABEL ON TABLE YOURAPP.PRODUCTSP
	IS 'Products' ;

LABEL ON COLUMN YOURAPP.PRODUCTSP
( PRID TEXT IS 'Product Id' ,
	PRNAME TEXT IS 'Product Name' ,
	PRDESC TEXT IS 'Description' ,
	PRPRICE TEXT IS 'Price' ,
	PRIMAGE TEXT IS 'Image URL' ,
	PRQTY TEXT IS 'Quantity Available' ,
	PRCATID TEXT IS 'Category Id' ) ;
  
INSERT INTO YOURAPP.PRODUCTSP VALUES(101,'Garmin Nuvi 3790LMT','Garmin Nuvi 3790LMT GPS Navigation System',369.99,'/profoundui/userdata/images/products/101.jpg',100,101);
INSERT INTO YOURAPP.PRODUCTSP VALUES(102,'Garmin Nuvi 3760LMT','Garmin Nuvi 3760LMT GPS Navigation System',299.99,'/profoundui/userdata/images/products/102.jpg',33,101);
INSERT INTO YOURAPP.PRODUCTSP VALUES(103,'Garmin Nuvi 2460LMT','Garmin Nuvi 2460LMT GPS Navigation System',234.99,'/profoundui/userdata/images/products/103.jpg',37,101);
INSERT INTO YOURAPP.PRODUCTSP VALUES(104,'TomTom GO 2535 TMWTE','TomTom GO 2535 TMWTE GPS Navigation System',304.08,'/profoundui/userdata/images/products/104.jpg',35,101);
INSERT INTO YOURAPP.PRODUCTSP VALUES(105,'Magellan Roadmate 3055-MU','Magellan Roadmate 3055-MU GPS Navigation System',120.0,'/profoundui/userdata/images/products/105.jpg',34,101);
INSERT INTO YOURAPP.PRODUCTSP VALUES(106,'TomTom XXL 540 S','TomTom XXL 540 S GPS Navigation System',94.95,'/profoundui/userdata/images/products/106.jpg',38,101);
INSERT INTO YOURAPP.PRODUCTSP VALUES(107,'Garmin Nuvi 550','Garmin Nuvi 550 GPS Navigation System',261.99,'/profoundui/userdata/images/products/107.jpg',39,101);
INSERT INTO YOURAPP.PRODUCTSP VALUES(108,'Magellan Maestro 4350','Magellan Maestro 4350 GPS Navigation System',479.0,'/profoundui/userdata/images/products/108.jpg',40,101);
INSERT INTO YOURAPP.PRODUCTSP VALUES(109,'TomTom XL 340 S','TomTom XL 340 S GPS Navigation System',84.99,'/profoundui/userdata/images/products/109.jpg',32,101);
INSERT INTO YOURAPP.PRODUCTSP VALUES(110,'Magellan Roadmate 1700','Magella Roadmate 1700 GPS Navigation System',148.54,'/profoundui/userdata/images/products/110.jpg',33,101);
INSERT INTO YOURAPP.PRODUCTSP VALUES(111,'Garmin Nuvi 1390T','Garmin Nuvi 1390T GPS Navigation System',193.54,'/profoundui/userdata/images/products/111.jpg',32,101);
INSERT INTO YOURAPP.PRODUCTSP VALUES(112,'Garmin Nuvi 1350T','Garmin Nuvi 1350T GPS Navigation System',139.0,'/profoundui/userdata/images/products/112.jpg',29,101);
INSERT INTO YOURAPP.PRODUCTSP VALUES(113,'Magellan Roadmate 1470','Magellan Roadmate 1470 GPS Navigation System',155.53,'/profoundui/userdata/images/products/113.jpg',34,101);
INSERT INTO YOURAPP.PRODUCTSP VALUES(114,'TomTom ONE 130','TomTom ONE 130 GPS Navigation System',86.53,'/profoundui/userdata/images/products/114.jpg',41,101);
INSERT INTO YOURAPP.PRODUCTSP VALUES(115,'TomTom XL 330 S','TomTom XL 330 S GPS Navigation System',76.77,'/profoundui/userdata/images/products/115.jpg',42,101);
INSERT INTO YOURAPP.PRODUCTSP VALUES(116,'Navigator 7536','Navigator 756 GPS Navigation System',299.99,'/profoundui/userdata/images/products/gps.png',33,101);
INSERT INTO YOURAPP.PRODUCTSP VALUES(117,'Explorer XR300','Explorer XR300 GPS Navigation System',94.95,'/profoundui/userdata/images/products/106.jpg',38,101);
INSERT INTO YOURAPP.PRODUCTSP VALUES(118,'Navigator 545','Navigator 545 GPS Navigation System',261.99,'/profoundui/userdata/images/products/107.jpg',39,101);
INSERT INTO YOURAPP.PRODUCTSP VALUES(119,'Pathfinder 4350XT','Pathfinder 4350XT GPS Navigation System',479.0,'/profoundui/userdata/images/products/108.jpg',40,101);
INSERT INTO YOURAPP.PRODUCTSP VALUES(120,'Pathfinder 725XV','Pathfinder 725XV GPS Navigation System',148.54,'/profoundui/userdata/images/products/110.jpg',40,101);
INSERT INTO YOURAPP.PRODUCTSP VALUES(121,'Explorer NT550','Explorer NT550 GPS Navigation System',86.53,'/profoundui/userdata/images/products/114.jpg',41,101);