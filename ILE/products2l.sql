
CREATE UNIQUE INDEX YOURAPP.PRODUCTS2L 
	ON YOURAPP.PRODUCTSP ( PRCATID ASC , PRNAME ASC , PRID ASC )
	RCDFMT PRODUCTS ; 

LABEL ON INDEX YOURAPP.PRODUCTS2L 
	IS 'Products by category / product name' ; 
