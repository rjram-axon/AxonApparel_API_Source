CREATE TABLE [dbo].[ProductionInvoiceOrdDet]
(
	[ProdInvJobDetID] [int] IDENTITY(1,1) NOT NULL, 
	[Job_Ord_No] [varchar](20) NOT NULL,
	[ProdInvDetid] [int] NOT NULL,
	[ProdInvid] [int] NOT NULL,
	[Prod_Recpt_Detid] [int] NOT NULL,
	[InvoiceQty] [numeric](14, 3) NOT NULL DEFAULT (0),
    CONSTRAINT [PK_Production_Inv_JobDet] PRIMARY KEY ([ProdInvJobDetID]), 
    CONSTRAINT [FK_Production_Inv_JobDet_ProductionInvoiceDet] FOREIGN KEY ([ProdInvDetid]) REFERENCES [ProductionInvoiceDet]([ProdInvDetid]), 
	CONSTRAINT [FK_Production_Inv_JobDet_ProductionInvMas] FOREIGN KEY ([ProdInvid]) REFERENCES [ProductionInvoiceMas]([ProdInvid])
	

)