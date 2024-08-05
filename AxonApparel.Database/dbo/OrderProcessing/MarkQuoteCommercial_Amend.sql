CREATE TABLE [dbo].[MarkQuoteCommercial_Amend]
(
	[RecId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[MarkquoteCommercialId] [int]  NOT NULL,
	[QuoteId] [int] NOT NULL,
	[ParticularID] [int] NOT NULL,
	[Cost] [numeric](15, 5) NULL,
	[Remarks] [varchar](250) NULL

	--CONSTRAINT [fk_MarkQuoteCommercial_AmendParticularId] FOREIGN KEY([ParticularID]) REFERENCES [dbo].[Commercialmas] ([commercialid]),
	--CONSTRAINT [fk_MarkQuoteCommercial_QuoteId] FOREIGN KEY([QuoteId]) REFERENCES [dbo].[MarkQuoteMas] ([QuoteID]),
)
