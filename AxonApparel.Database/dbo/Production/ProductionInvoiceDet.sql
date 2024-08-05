﻿CREATE TABLE [dbo].[ProductionInvoiceDet]
(
	[ProdInvDetid] [int] IDENTITY(1,1) NOT NULL,
	[ProdInvId] [int] NULL,
	[Itemid] [int] NULL,
	[Colorid] [int] NULL,
	[Sizeid] [int] NULL,
	[Componentid] [int] NULL,
	[Grndetid] [int] NOT NULL,
	[Grnmasid] [int] NOT NULL,
	[InvoiceQty] [numeric](14, 3) NOT NULL DEFAULT (0),
	[InvoiceRate] [numeric](9, 2) NOT NULL DEFAULT (0),
	[Amount] [numeric](14, 3) NOT NULL DEFAULT (0),
	[Closed] [char](1) NOT NULL DEFAULT ('N'),
	[IPMarkup_Rate] [numeric](12, 3) NOT NULL DEFAULT (0),
	[OPMarkup_Rate] [numeric](12, 3) NOT NULL DEFAULT (0),
	[LotNo] [varchar](10) NOT NULL DEFAULT (''),
	[Job_Ord_No] [varchar](20) NOT NULL DEFAULT (''),
	[BundleNo] [varchar](12) NULL DEFAULT (''),
	[RejectdQty] [numeric](18, 3) NULL,
	[RejectdRate] [numeric](18, 3) NULL,
	[design] [varchar](10) NULL,
	[NoOfStiches] [varchar](10) NULL, 
    CONSTRAINT [PK_ProductionInvoiceDet] PRIMARY KEY ([ProdInvDetid]), 
    CONSTRAINT [FK_ProductionInvoiceDet_ProductionInvoiceMas] FOREIGN KEY ([ProdInvid]) REFERENCES [ProductionInvoiceMas]([ProdInvid]),
	CONSTRAINT [FK_ProductionInvoiceDet_Item] FOREIGN KEY ([Itemid]) REFERENCES [Item]([Itemid]),
    CONSTRAINT [FK_ProductionInvoiceDet_Color] FOREIGN KEY ([Colorid]) REFERENCES [Color]([Colorid]),
    CONSTRAINT [FK_ProductionInvoiceDet_Size] FOREIGN KEY ([Sizeid]) REFERENCES [Size]([Sizeid])

)