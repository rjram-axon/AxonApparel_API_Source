CREATE TABLE [dbo].[Stock_Audit_Det]
(
	[Audit_Detid] INT IDENTITY(1,1) NOT NULL, 
	[Entry_no] [varchar](20) NULL,
	[AuditMasid]  [int] NOT NULL, 
	[Stockid] [int] NULL,
	[Shortage_Qty] [numeric](14, 3) NULL,
	[Excess_Qty] [numeric](14, 3) NULL,
	[StockQty] [numeric](14, 3) NULL,
	[Excess_Stockid] [int] NULL
    CONSTRAINT [PK_Stock_Audit_Det] PRIMARY KEY ([Audit_Detid]), 
    CONSTRAINT [FK_Stock_Audit_Det_Stock_Audit_Mas] FOREIGN KEY ([AuditMasid]) REFERENCES [Stock_Audit_Mas]([Audit_MasId]), 
    CONSTRAINT [FK_Stock_Audit_Det_ItemStock] FOREIGN KEY ([StockId]) REFERENCES [ItemStock]([StockId])
)
