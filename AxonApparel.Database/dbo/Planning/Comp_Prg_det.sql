CREATE TABLE [dbo].[Comp_Prg_det]
(
[Prodprgdetid] [int] IDENTITY(1,1) NOT NULL primary key,
	[Prodprgid] [int] NULL,
	[Itemid] [int] NULL,
	[Colorid] [int] NULL,
	[Sizeid] [int] NULL,
	[Componentid] [int] NULL,
	[ActualPlan_Qty] [numeric](12, 0) NOT NULL DEFAULT (0),
	[Prog_Op_Qty] [numeric](12, 0) NOT NULL DEFAULT (0),
	[CatType] [varchar](40) NOT NULL DEFAULT (''),
	[LastProcessid] [int] NULL,
	[Issue_qty] [numeric](12, 0) NOT NULL  DEFAULT (0),
	[Receipt_Qty] [numeric](12, 0) NOT NULL  DEFAULT (0),
	[Return_Qty] [numeric](12, 0) NOT NULL  DEFAULT (0),
	[IP_MarkupRate] [numeric](9, 2) NOT NULL  DEFAULT (0),
	[MarkupValue] [numeric](12, 2) NOT NULL  DEFAULT (0),
	[CColorID] [int] NULL,
	[Rejectedqty] [numeric](18, 3) NULL,

	 FOREIGN KEY([Colorid]) REFERENCES [dbo].[Color] ([Colorid]),
	 FOREIGN KEY([Componentid]) REFERENCES [dbo].[Item] ([ItemId]),
	 FOREIGN KEY([Itemid]) REFERENCES [dbo].[Item] ([ItemId]),
	 FOREIGN KEY([Prodprgid]) REFERENCES [dbo].[Comp_prg_mas] ([ProdPrgid]),
	 FOREIGN KEY([Sizeid]) REFERENCES [dbo].[Size] ([SizeId]),
	  CONSTRAINT [FK_Comp_Prg_Det_CColorID] FOREIGN KEY([CColorID]) REFERENCES [dbo].[Color] ([Colorid]),


)
