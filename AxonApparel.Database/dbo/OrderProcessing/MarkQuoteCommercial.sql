CREATE TABLE [dbo].[MarkQuoteCommercial]
(
		[MarkquoteCommercialId] [int] IDENTITY(1,1) NOT NULL primary key,
	[QuoteId] [int] NOT NULL,
	[ParticularID] [int] NOT NULL,
	[Cost] [numeric](15, 5) NULL,
	[Remarks] [varchar](250) NULL,

	CONSTRAINT [fk_MarkQuoteCommercial_ParticularId] FOREIGN KEY([ParticularID]) REFERENCES [dbo].[Commercialmas] ([commercialid]),
	CONSTRAINT [fk_MarkQuoteCommercial_QuoteId] FOREIGN KEY([QuoteId]) REFERENCES [dbo].[MarkQuoteMas] ([QuoteID]),

)
