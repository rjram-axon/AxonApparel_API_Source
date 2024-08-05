CREATE TABLE [dbo].[Acc_Req_Style]
(
	[AccReqID] INT IDENTITY(1,1) NOT NULL, 
    [Order_No] VARCHAR(20) NOT NULL, 
	[BuyOrdMasId] int NOT NULL,
    [StyleID] INT NOT NULL, 
    [EntryDate] DATETIME NULL, 
    [commitcancel] CHAR NULL, 
    [BuyOrJob] CHAR NULL DEFAULT ('B'), 
    [AccOrPack] CHAR NULL, 
    [Amend] CHAR NOT NULL DEFAULT ('N'), 
    [StyleItemID] INT NULL,
	CONSTRAINT [PK_Acc] PRIMARY KEY ([AccReqID]),
	CONSTRAINT [FK_AccReqStyleItemId] FOREIGN KEY ([StyleItemID]) REFERENCES [Item]([ItemId]),
	CONSTRAINT [FK_AccReqStyleOrderNo] FOREIGN KEY ([BuyOrdMasId]) REFERENCES [Buy_Ord_Mas]([Buy_Ord_MasId]),
	CONSTRAINT [FK_AccReqStyle] FOREIGN KEY (StyleID) REFERENCES StyleHeader(StyleId),
)
