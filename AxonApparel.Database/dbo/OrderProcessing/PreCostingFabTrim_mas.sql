CREATE TABLE dbo.PreCostingFabTrim_mas(

PrecostFabTrimmasid int not null Primary key IDENTITY(1,1),
Buyerid int null,
Styleid int null,
Stylerowid int null,
Entrydate datetime null,
Bmasid int null FOREIGN KEY(Bmasid)REFERENCES [dbo].[Buy_Ord_Mas] ([Buy_Ord_MasId])
 )


