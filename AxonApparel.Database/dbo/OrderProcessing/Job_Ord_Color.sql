CREATE TABLE [dbo].[Job_Ord_Color]
(
[Job_Ord_ColorId] [int] IDENTITY(1,1) NOT NULL,
[Job_Ord_No] [varchar](20) NOT NULL,
	[buy_ord_ship] [varchar](8) NOT NULL,
	[colorid] [int] NULL,
	[sizeid] [int] NULL,
	[quantity] [numeric](8, 0) NULL,
	[finish_qty] [numeric](8, 0) NULL,
	[despatch_qty] [numeric](8, 0) NULL,
	[colorrowid] [int] NULL,
	[sizerowid] [int] NULL,
	[WorkOrd_Qty] [numeric](8, 0) NULL,
	[Rate] [numeric](15, 5) NULL,
	[ITEMID] [int] NULL,
	[ITEMROWID] [int] NULL,
	CONSTRAINT [PK_Job_Ord_Color] PRIMARY KEY ([Job_Ord_ColorId]),
	CONSTRAINT [fk_item] FOREIGN KEY([ITEMID]) REFERENCES [dbo].[Item] ([ItemId]),
	CONSTRAINT [fk_job_ord_color_colorid] FOREIGN KEY([colorid]) REFERENCES [dbo].[Color] ([Colorid]),
	CONSTRAINT [fk_job_ord_color_Sizeid] FOREIGN KEY([sizeid]) REFERENCES [dbo].[Size] ([SizeId])
	)
