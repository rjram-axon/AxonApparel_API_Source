CREATE TABLE [dbo].[ProductionInvoiceAddless]
(
	[ProdInvId] [int] NULL,
	[ProdInvAddLessid] [int] IDENTITY(1,1) NOT NULL,
	[AddLessid] [int] NULL,
	[Percentage] [numeric](5, 2) NOT NULL DEFAULT (0),
	[Amount] [numeric](12, 2) NOT NULL DEFAULT (0), 
    CONSTRAINT [PK_ProductionInvoiceAddless] PRIMARY KEY ([ProdInvAddLessid]), 
    CONSTRAINT [FK_ProductionInvoiceAddless_ProductionInvoiceMas] FOREIGN KEY ([ProdInvId]) REFERENCES [ProductionInvoiceMas]([ProdInvId])
)
