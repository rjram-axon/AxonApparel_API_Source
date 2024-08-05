﻿CREATE TABLE [dbo].[Process_Recpt_Det]
(
	[Proc_Recpt_Detid] [int] IDENTITY(1,1) NOT NULL primary key,
	[Proc_Recpt_Masid] [int] NULL,
	[ProcessOrdId] [int] NULL,
	[itemid] [int] NOT NULL,
	[sizeid] [int] NOT NULL,
	[colorid] [int] NOT NULL,
	[Received_qty] [numeric](14, 3) NOT NULL  DEFAULT (0.000),
	[Sec_Qty] [numeric](14, 3) NOT NULL  DEFAULT (0.000),
	[rate] [numeric](15, 5) NULL,
	[Invoice_Qty] [numeric](14, 3) NULL CHECK  (([Invoice_Qty] = 0 or [Invoice_Qty] > 0)) DEFAULT (0),
	[closed] [varchar](1) NOT NULL DEFAULT ('N'),
	[IPMarkup_rate] [numeric](15, 5) NULL,
	[OPMarkup_Rate] [numeric](15, 5) NULL,
	[IssuedSizeID] [int] NULL,
	[FinDiaid] [int] NULL,
	[WasQty] [numeric](18, 3) NULL,
	ProcessOrdDetid int null,
	CONSTRAINT [FK_Proc_Recpt_mas_ProcessOrdId] FOREIGN KEY([ProcessOrdId]) REFERENCES [dbo].[Process_Ord_Mas] ([processordid]),
	CONSTRAINT [FK_Proc_Recpt_mas_Prod_Recpt_Masid] FOREIGN KEY([Proc_Recpt_Masid]) REFERENCES [dbo].[Process_Recpt_Mas] ([proc_recpt_masid]),
	CONSTRAINT [FK_Proc_Recpt_det_colorid] FOREIGN KEY([colorid]) REFERENCES [dbo].[color] ([colorid]),
	CONSTRAINT [FK_Proc_Recpt_det_IssuedSizeID] FOREIGN KEY([IssuedSizeID]) REFERENCES [dbo].[size] ([sizeid]),
	CONSTRAINT [FK_Proc_Recpt_det_itemid] FOREIGN KEY([itemid]) REFERENCES [dbo].[Item] ([itemid]),
	 CONSTRAINT [FK_Proc_Recpt_det_sizeid] FOREIGN KEY([sizeid]) REFERENCES [dbo].[size] ([sizeid]),
	 CONSTRAINT [FK_Proc_Recpt_det_finsizeid] FOREIGN KEY([FinDiaid]) REFERENCES [dbo].[size] ([sizeid]),


)