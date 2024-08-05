CREATE TABLE [dbo].[MarkQuoteAcc_Amend]
(
	[RecId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[MarkquoteaccId] [int]  NOT NULL ,
	[QuoteId] [int] NOT NULL,
	[ItemID] [int] NOT NULL,
	[Uomid] [int] NOT NULL,
	[Quantity] [numeric](12, 3) NULL,
	[UnitCost] [numeric](15, 5) NULL,
	[Remarks] [varchar](250) NULL,
	[ItemType] [varchar](1) NOT NULL DEFAULT (''),

	CONSTRAINT [fk_MarkQuoteAcc_AmendItemId] FOREIGN KEY([ItemID]) REFERENCES [dbo].[Item] ([ItemId]),
	--CONSTRAINT [fk_MarkQuoteAcc_QuoteId] FOREIGN KEY([QuoteId]) REFERENCES [dbo].[MarkQuoteMas] ([QuoteID]),
	CONSTRAINT [fk_MarkQuoteAcc_AmendUomId] FOREIGN KEY([Uomid]) REFERENCES [dbo].[Unit_of_measurement] ([UomId])
)
