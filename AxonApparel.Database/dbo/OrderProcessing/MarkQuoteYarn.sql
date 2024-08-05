CREATE TABLE [dbo].[MarkQuoteYarn]
(
	Markquoteyarnid int identity(1,1) NOT NULL primary key,
	[QuoteId] [int] NULL,
	[FabID] [int] NOT NULL,
	[Itemid] [int] NOT NULL,
	[Sizeid] [int] NOT NULL,
	[Percentage] [numeric](5, 2) NULL,
	[Weight] [numeric](12, 3) NULL,
	[CostPerKG] [numeric](15, 5) NULL,

	CONSTRAINT [fk_MarkQuoteYarn_ItemId] FOREIGN KEY([FabID]) REFERENCES [dbo].[Item] ([itemid]),
	 CONSTRAINT [fk_MarkQuoteYarn_QuoteId] FOREIGN KEY([QuoteId]) REFERENCES [dbo].[MarkQuoteMas] ([QuoteID]),
	 CONSTRAINT [fk_MarkQuoteYarn_SizeId] FOREIGN KEY([Sizeid]) REFERENCES [dbo].[Size] ([SizeId])
)
