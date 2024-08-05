CREATE TABLE [dbo].[Pur_Return_Det]
(
	[Return_DetID] [int] IDENTITY(1,1) NOT NULL, 
	[Return_ID] [int] NOT NULL,
	[Stockid] [int] NOT NULL,
	[Return_qty] [numeric](15, 3) NOT NULL DEFAULT (0),
	[Pur_return_qty] [numeric](14, 3) NULL
    CONSTRAINT [PK_Pur_Return_Det] PRIMARY KEY ([Return_DetID]), 
    CONSTRAINT [FK_Pur_Return_Det_Pur_Retun_Mas] FOREIGN KEY ([Return_ID]) REFERENCES [Pur_Return_Mas]([Return_ID]),
	CONSTRAINT [FK_Pur_Return_Det_ItemStock] FOREIGN KEY ([Stockid]) REFERENCES [ItemStock]([StockId])
)
