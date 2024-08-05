CREATE TABLE [dbo].[General_Memo_det]
(
	[Gen_memo_Detid] [int] IDENTITY(1,1) NOT NULL primary key,
	[Gen_memo_Masid] [int] NULL,
	[Itemid] [int] NULL,
	[Colorid] [int] NULL,
	[Sizeid] [int] NULL,
	[Uomid] [int] NULL,
	[Quantity] [numeric](12, 3) NULL DEFAULT (0.000),
	[ItemRemarks] [varchar](100) NULL,
	[Rate] [numeric](9, 3) NULL,
	[Amount] [numeric](9, 3) NULL,

	CONSTRAINT [fk_Gen_Memo_det_ColorId] FOREIGN KEY([Colorid]) REFERENCES [dbo].[Color] ([Colorid]),
	CONSTRAINT [fk_Gen_Memo_det_ItemId] FOREIGN KEY([Itemid]) REFERENCES [dbo].[Item] ([ItemId]),
	CONSTRAINT [fk_Gen_Memo_det_MasId] FOREIGN KEY([Gen_memo_Masid]) REFERENCES [dbo].[General_Memo_mas] ([Gen_memo_Masid]),
	CONSTRAINT [fk_Gen_Memo_det_Sizeid] FOREIGN KEY([Sizeid]) REFERENCES [dbo].[Size] ([SizeId]),
	CONSTRAINT [fk_Gen_Memo_det_Uomid] FOREIGN KEY([Uomid]) REFERENCES [dbo].[Unit_of_measurement] ([UomId])
)
