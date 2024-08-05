CREATE TABLE [dbo].[OrdCons_Mas]
(
	[ordconsmasid] INT NOT NULL PRIMARY KEY IDENTITY,
	ordconsavggramage numeric(15,3),
GarmentItemid int
CONSTRAINT FK_GarmentItemid FOREIGN KEY (GarmentItemid)
    REFERENCES Item(ItemId), 
    [BmasId] INT NULL, 
    [StyleRowId] INT NULL
)
