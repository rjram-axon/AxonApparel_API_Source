CREATE TABLE [dbo].[MarkQuoteFab_Amend]
(
	[RecId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[QuoteId] [int] NOT NULL,
	[DetId] [int]  NOT NULL,
	[CompID] [int] NOT NULL,
	[FabID] [int] NOT NULL,
	[Weight] [numeric](12, 3) NOT NULL,
	[Remarks] [varchar](500) NULL,
	[Fab_purchase] [varchar](1) NULL DEFAULT ('N'),
	[BaseQty] [numeric](12, 3) NULL DEFAULT (0),
	[Uomid] [int] NULL,
	[GSM] [int] NULL,

	CONSTRAINT [fk_MarkQuoteFab_AmendComponentId] FOREIGN KEY([CompID]) REFERENCES [dbo].[Item] ([ItemId]),
	CONSTRAINT [fk_MarkQuoteFab_AmendItemId] FOREIGN KEY([FabID]) REFERENCES [dbo].[Item] ([ItemId]),
	--CONSTRAINT [fk_MarkQuoteFab_AmendQuoteId] FOREIGN KEY([QuoteId]) REFERENCES [dbo].[MarkQuoteMas] ([QuoteID]),
	 CONSTRAINT [fk_MarkQuoteFab_AmendUomId] FOREIGN KEY([Uomid]) REFERENCES [dbo].[Unit_of_measurement] ([UomId]),
)
