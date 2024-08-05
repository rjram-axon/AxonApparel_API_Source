CREATE TABLE [dbo].[ProductionInvoiceDc]
(
    [ProdInvDcId] [int] IDENTITY(1,1) NOT NULL,
	[Prodinvid] [int] NULL,
	[prod_recpt_masid] [int] NULL, 
    CONSTRAINT [PK_Production_Inv_Dc] PRIMARY KEY ([ProdInvDcId]), 
    CONSTRAINT [FK_Production_Inv_Dc_Production_Inv_Mas] FOREIGN KEY ([ProdInvId]) REFERENCES [ProductionInvoiceMas]([ProdInvId])

)
