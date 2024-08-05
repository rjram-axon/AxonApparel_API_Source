CREATE TABLE [dbo].[Acc_Req_Style_Amend]
(
	[RecId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[AccReqID] INT NOT NULL, 
    [Order_No] VARCHAR(20) NOT NULL, 
	[BuyOrdMasId] int NOT NULL,
    [StyleID] INT NOT NULL, 
    [EntryDate] DATETIME NULL, 
    [commitcancel] CHAR NULL, 
    [BuyOrJob] CHAR NULL DEFAULT ('B'), 
    [AccOrPack] CHAR NULL, 
    [Amend] CHAR NOT NULL DEFAULT ('N'), 
    [StyleItemID] INT NULL,
	--CONSTRAINT [PK_Acc_Amend] PRIMARY KEY ([RecId]),
	CONSTRAINT [FK_AccReqStyleItemId_Amend] FOREIGN KEY ([StyleItemID]) REFERENCES [Item]([ItemId]),
	--CONSTRAINT [FK_AccReqStyleOrderNo] FOREIGN KEY ([BuyOrdMasId]) REFERENCES [Buy_Ord_Mas]([Buy_Ord_MasId]),
	CONSTRAINT [FK_AccReqStyle_Amend] FOREIGN KEY (StyleID) REFERENCES StyleHeader(StyleId),
)
