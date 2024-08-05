CREATE TABLE [dbo].[MarkQuoteCMT]
(
	
	[MarkquoteCmtId] [int] IDENTITY(1,1) NOT NULL primary key,
	[QuoteId] [int] NOT NULL,
	[ProcessID] [int] NOT NULL,
	[Cost] [numeric](15, 5) NULL,
	[Remarks] [varchar](250) NULL,

	CONSTRAINT [fk_MarkQuoteCMT_ProcessId] FOREIGN KEY([ProcessID]) REFERENCES [dbo].[process] ([processid]),
	 CONSTRAINT [fk_MarkQuoteCMT_QuoteId] FOREIGN KEY([QuoteId]) REFERENCES [dbo].[MarkQuoteMas] ([QuoteID]),

)
