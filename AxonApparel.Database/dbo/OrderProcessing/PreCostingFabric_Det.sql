CREATE TABLE dbo.PreCostingFabric_Det(

PrecostFabricmasid int not null Primary key IDENTITY(1,1),
PrecostFabTrimmasid int FOREIGN KEY REFERENCES dbo.PreCostingFabTrim_mas (PrecostFabTrimmasid),
GItemid int null,
Componentid int null,
Fabricid int null,
Greycolorid int null,
Finishcolorid int null,
Printcolorid int null,
GSM [decimal](10, 3) NOT NULL DEFAULT ((0)),
Grammage [decimal](10, 3) NOT NULL DEFAULT ((0))
 )