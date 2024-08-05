CREATE TABLE [dbo].[MarkQuoteProcess]
(
	[QuoteID] [int] NOT NULL,
	[ProcessId] [int] NOT NULL,
	[Fabricid] [int] NOT NULL,
	[Cost] [numeric](15, 5) NULL,
	[Detid] [int] IDENTITY(1,1) NOT NULL primary key,

	CONSTRAINT [fk_MarkQuoteProcess_ItemId] FOREIGN KEY([Fabricid]) REFERENCES [dbo].[Item] ([ItemId]),
	CONSTRAINT [fk_MarkQuoteProcess_ProcessId] FOREIGN KEY([ProcessId]) REFERENCES [dbo].[Process] ([ProcessId]),
	 CONSTRAINT [fk_MarkQuoteProcess_QuoteId] FOREIGN KEY([QuoteID]) REFERENCES [dbo].[MarkQuoteMas] ([QuoteID])
)
