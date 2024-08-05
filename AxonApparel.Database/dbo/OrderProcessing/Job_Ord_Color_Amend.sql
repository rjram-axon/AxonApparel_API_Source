CREATE TABLE [dbo].[Job_Ord_Color_Amend]
(
	[JobColorAmndId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Job_Ord_ColorId] [int]  NOT NULL,
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
	
	CONSTRAINT [fk_am_item] FOREIGN KEY([ITEMID]) REFERENCES [dbo].[Item] ([ItemId]),
	CONSTRAINT [fk_job_ord_color_am_colorid] FOREIGN KEY([colorid]) REFERENCES [dbo].[Color] ([Colorid]),
	CONSTRAINT [fk_job_ord_color_am_Sizeid] FOREIGN KEY([sizeid]) REFERENCES [dbo].[Size] ([SizeId])
)
