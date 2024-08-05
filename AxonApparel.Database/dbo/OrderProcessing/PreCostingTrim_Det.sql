CREATE TABLE dbo.PreCostingTrim_Det(

PrecostTrimmasid int not null Primary key IDENTITY(1,1),
PrecostFabTrimmasid int FOREIGN KEY REFERENCES dbo.PreCostingFabTrim_mas (PrecostFabTrimmasid),
Itemid int null,
Colorid int null,
Sizeid int null,
UOMid int null,
GItemid int null,
Consumption [decimal](10, 3) NOT NULL DEFAULT ((0)),
Rate [decimal](10, 3) NOT NULL DEFAULT ((0)),
Target [decimal](10, 3) NOT NULL DEFAULT ((0)),
Approved [char](1)  DEFAULT ('N'),
 )
