CREATE TABLE dbo.PreCostingEmbellishment_Det(

PrecostEmbellishmentmasid int not null Primary key IDENTITY(1,1),
PrecostFabTrimmasid int FOREIGN KEY REFERENCES dbo.PreCostingFabTrim_mas (PrecostFabTrimmasid),
Processid int null,
Rate [decimal](10, 3) NOT NULL DEFAULT ((0)),
Target [decimal](10, 3) NOT NULL DEFAULT ((0)),
Approved [char](1)  DEFAULT ('N'),
 )