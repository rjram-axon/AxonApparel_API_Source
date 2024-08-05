CREATE TABLE [dbo].[MarkQuoteYarn_Amend]
(
	[RecId] INT NOT NULL PRIMARY KEY identity(1,1),
	Markquoteyarnid int  NOT NULL ,
	[QuoteId] [int] NULL,
	[FabID] [int] NOT NULL,
	[Itemid] [int] NOT NULL,
	[Sizeid] [int] NOT NULL,
	[Percentage] [numeric](5, 2) NULL,
	[Weight] [numeric](12, 3) NULL,
	[CostPerKG] [numeric](15, 5) NULL,

	CONSTRAINT [fk_MarkQuoteYarn_AmendItemId] FOREIGN KEY([FabID]) REFERENCES [dbo].[Item] ([itemid]),
	 --CONSTRAINT [fk_MarkQuoteYarn_QuoteId] FOREIGN KEY([QuoteId]) REFERENCES [dbo].[MarkQuoteMas] ([QuoteID]),
	 CONSTRAINT [fk_MarkQuoteYarn_AmendSizeId] FOREIGN KEY([Sizeid]) REFERENCES [dbo].[Size] ([SizeId])
)
