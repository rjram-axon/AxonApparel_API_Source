CREATE TABLE [dbo].[Process_Qlty_Stock]
(
	[Proc_Qlty_Stockid] [int] IDENTITY(1,1) NOT NULL,
	[Proc_qlty_jobDetid] [int] NULL,
	[Stockid] [int] NULL,
	[Rejectedqty] [numeric](10, 3) NULL DEFAULT (0.00),
	[JobRowid] [int] NULL,
	[Proc_Recpt_jobdetid] [int] NULL, 
    CONSTRAINT [PK_Process_Qlty_Stock] PRIMARY KEY ([Proc_Qlty_Stockid]), 
    CONSTRAINT [FK_Process_Qlty_Stock_Itemstock] FOREIGN KEY ([StockId]) REFERENCES [ItemStock]([Stockid]),
	CONSTRAINT [FK_Process_Qlty_jobDet] FOREIGN KEY ([Proc_qlty_jobDetid]) REFERENCES [Process_Qlty_jobDet]([Proc_qlty_jobdetid])
)
