﻿CREATE TABLE [dbo].[LotSplitDet]
(
	[LotSplitDetId] INT IDENTITY(1,1) NOT NULL, 
	[LotSplitMasId] [int] NOT NULL,
	[Stockid] [int] NOT NULL,
	[itemid] [int] NOT NULL,
	[colorid] [int] NOT NULL,
	[Sizeid] [int] NOT NULL,
	[Orderno] [varchar](20) NOT NULL DEFAULT (''),
	[Styleid] [int] NULL DEFAULT (0),
	[LotNo] [varchar](15) NOT NULL DEFAULT (''),
	[Quantity] [numeric](14, 3) NOT NULL,
	[processid] [int] NULL,
	[LSNo][int]Null,
    CONSTRAINT [PK_LotSplitDet] PRIMARY KEY ([LotSplitDetId]), 
    CONSTRAINT [FK_LotSplitDet_Item] FOREIGN KEY ([itemid]) REFERENCES [Item]([ItemId]), 
	CONSTRAINT [FK_LotSplitDet_Color] FOREIGN KEY ([colorid]) REFERENCES [Color]([colorid]), 
	CONSTRAINT [FK_LotSplitDet_Size] FOREIGN KEY ([Sizeid]) REFERENCES [Size]([Sizeid]), 
		CONSTRAINT [FK_LotSplitDet_ItemStock] FOREIGN KEY ([Stockid]) REFERENCES [ItemStock]([StockId]), 
		CONSTRAINT [FK_LotSplitDet_Process] FOREIGN KEY ([processid]) REFERENCES [Process]([ProcessId]), 
	CONSTRAINT [FK_LotSplitDet_LotSplitMas] FOREIGN KEY ([LotSplitMasId]) REFERENCES [LotSplitMas]([LotSplitMasId]), 
    CONSTRAINT [CK_LotSplitDet_Quantity] CHECK (([quantity] > 0)), 
)