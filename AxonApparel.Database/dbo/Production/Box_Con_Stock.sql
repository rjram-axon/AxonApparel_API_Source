CREATE TABLE [dbo].[Box_Con_Stock]
(
	[BoxConStockId] [int] IDENTITY(1,1) NOT NULL primary key,
	[BoxConDetId] [int] NULL,
	[BoxConMasId] [int] NULL,
	[ItemStockId] [int] NULL,
    [StockQty] [numeric](14, 3) NULL,
	[AllotedQty] [numeric](14, 3) NULL,
	[OldAllotedQty] [numeric](14, 3) NULL,
	[Rate] [numeric](14, 3) NULL,
	[Itemid] [int] NULL,
	[Colorid] [int] NULL,
	[Sizeid] [int] NULL,
	[TransNo] [varchar](20) NULL, 
    CONSTRAINT [Fk_Box_Con_Stock_BoxConMasId] FOREIGN KEY ([BoxConMasId]) REFERENCES [Box_Con_Mas]([BoxConMasId]), 
    CONSTRAINT [Fk_Box_Con_Stock_BoxConDetId] FOREIGN KEY ([BoxConDetId]) REFERENCES [Box_Con_Det]([BoxConDetId])
)
