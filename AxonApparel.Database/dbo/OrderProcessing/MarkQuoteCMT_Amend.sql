CREATE TABLE [dbo].[MarkQuoteCMT_Amend]
(
	[RecId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[MarkquoteCmtId] [int]  NOT NULL ,
	[QuoteId] [int] NOT NULL,
	[ProcessID] [int] NOT NULL,
	[Cost] [numeric](15, 5) NULL,
	[Remarks] [varchar](250) NULL,

	CONSTRAINT [fk_MarkQuoteCMT_AmendProcessId] FOREIGN KEY([ProcessID]) REFERENCES [dbo].[process] ([processid]),
	 --CONSTRAINT [fk_MarkQuoteCMT_QuoteId] FOREIGN KEY([QuoteId]) REFERENCES [dbo].[MarkQuoteMas] ([QuoteID]),
)
