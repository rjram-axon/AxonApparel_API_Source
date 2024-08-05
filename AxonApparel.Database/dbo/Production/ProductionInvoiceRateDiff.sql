CREATE TABLE [dbo].[ProductionInvoiceRateDiff]
(
    [ProdinvRateid] [int] IDENTITY(1,1) NOT NULL,
	[ProdInvId] [int] NULL,
	[Grnno] [varchar](20) NOT NULL,
	[GrnAmt] [numeric](14, 3) NOT NULL DEFAULT (0),
	[InvAmt] [numeric](14, 3) NOT NULL DEFAULT (0),
	[RateDiff] [numeric](9, 2) NOT NULL DEFAULT (0),
	[Grndetid] [int] NULL,
	[QtyDiff] [numeric](9, 3) NOT NULL DEFAULT (0), 
    CONSTRAINT [PK_ProductionInvoiceRateDiff] PRIMARY KEY ([ProdinvRateid]), 
    CONSTRAINT [FK_ProductionInvoiceRateDiff_ProductionInvoiceMas] FOREIGN KEY ([ProdInvId]) REFERENCES [ProductionInvoiceMas]([ProdInvId])
)
