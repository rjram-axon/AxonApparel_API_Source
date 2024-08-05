CREATE TABLE [dbo].[MarkQuoteFab]
(
	[QuoteId] [int] NOT NULL,
	[DetId] [int] IDENTITY(1,1) NOT NULL primary key,
	[CompID] [int] NOT NULL,
	[FabID] [int] NOT NULL,
	[Weight] [numeric](12, 3) NOT NULL,
	[Remarks] [varchar](500) NULL,
	[Fab_purchase] [varchar](1) NULL DEFAULT ('N'),
	[BaseQty] [numeric](12, 3) NULL DEFAULT (0),
	[Uomid] [int] NULL,
	[GSM] [int] NULL,

	CONSTRAINT [fk_MarkQuoteFab_ComponentId] FOREIGN KEY([CompID]) REFERENCES [dbo].[Item] ([ItemId]),
	CONSTRAINT [fk_MarkQuoteFab_ItemId] FOREIGN KEY([FabID]) REFERENCES [dbo].[Item] ([ItemId]),
	CONSTRAINT [fk_MarkQuoteFab_QuoteId] FOREIGN KEY([QuoteId]) REFERENCES [dbo].[MarkQuoteMas] ([QuoteID]),
	 CONSTRAINT [fk_MarkQuoteFab_UomId] FOREIGN KEY([Uomid]) REFERENCES [dbo].[Unit_of_measurement] ([UomId]),

)
