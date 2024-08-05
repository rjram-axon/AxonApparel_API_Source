CREATE TABLE [dbo].[Unit_Grn_Det]
(
	[Unit_GRN_Detid] [int] IDENTITY(1,1) NOT NULL primary key,
	[Unit_GRN_Masid] [int] NULL,
	[itemid] [int] NULL,
	[Colorid] [int] NULL,
	[Sizeid] [int] NULL,
	[UOMid] [int] NULL,
	[RecptQty] [numeric](15, 3) NOT NULL  DEFAULT (0),
	[returnqty] [numeric](15, 3) NOT NULL DEFAULT (0.000),
	[ProgOrManual] [char](1) NULL,
	[Supplierid] [int] NULL,
	[SecQty] [numeric](15, 3) NOT NULL DEFAULT (0),
	[ItemRemarks] [varchar](250) NULL,
	[Rate] [numeric](15, 5) NOT NULL,

	CONSTRAINT [fk_unit_grn_det_colorid] FOREIGN KEY([Colorid]) REFERENCES [dbo].[Color] ([Colorid]),
	CONSTRAINT [fk_unit_grn_det_itemid] FOREIGN KEY([itemid]) REFERENCES [dbo].[Item] ([ItemId]),
	CONSTRAINT [fk_unit_grn_det_sizeid] FOREIGN KEY([Sizeid]) REFERENCES [dbo].[Size] ([SizeId]),
	CONSTRAINT [fk_unit_grn_det_supplierid] FOREIGN KEY([Supplierid]) REFERENCES [dbo].[Supplier] ([SupplierId]),
	CONSTRAINT [fk_unit_grn_det_unit_grn_masid] FOREIGN KEY([Unit_GRN_Masid]) REFERENCES [dbo].[Unit_Grn_Mas] ([Unit_GRN_Masid]),
	CONSTRAINT [fk_unit_grn_det_uomid] FOREIGN KEY([UOMid]) REFERENCES [dbo].[Unit_of_measurement] ([UomId]),
	CONSTRAINT [ck_unit_grn_det_ProgOrManual] CHECK  (([ProgOrManual] = 'M' or [ProgOrManual] = 'P')),

)
