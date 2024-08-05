CREATE TABLE [dbo].[MarkQuoteProcess_Amend]
(
	[RecId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[QuoteID] [int] NOT NULL,
	[ProcessId] [int] NOT NULL,
	[Fabricid] [int] NOT NULL,
	[Cost] [numeric](15, 5) NULL,
	[Detid] [int]  NOT NULL ,

	CONSTRAINT [fk_MarkQuoteProcess_AmendItemId] FOREIGN KEY([Fabricid]) REFERENCES [dbo].[Item] ([ItemId]),
	CONSTRAINT [fk_MarkQuoteProcess_AmendProcessId] FOREIGN KEY([ProcessId]) REFERENCES [dbo].[Process] ([ProcessId]),
	 --CONSTRAINT [fk_MarkQuoteProcess_QuoteId] FOREIGN KEY([QuoteID]) REFERENCES [dbo].[MarkQuoteMas] ([QuoteID])
)
