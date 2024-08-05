CREATE TABLE [dbo].[Program_Summary]
(
	[Program_SummaryID] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Type] [varchar](2) NOT NULL,
	[BuyJobWork] [varchar](1) NOT NULL ,
	[Order_No] [varchar](20) NOT NULL,
	[Styleid] [int] NULL,
	[Itemid] [int] NULL,
	[Colorid] [int] NULL,
	[Sizeid] [int] NULL,
	[UOMId] [int] NULL,
	[Quantity] [numeric](14, 3) NULL,
	[InOrOut] [varchar](1) NULL,
	[ff_despatch] [numeric](14, 3) NULL,
 
CONSTRAINT [fk_program_summary_Styleid] FOREIGN KEY([Styleid]) REFERENCES [dbo].[StyleHeader] ([StyleId]),
CONSTRAINT [fk_program_summary_Uomid] FOREIGN KEY([UOMId]) REFERENCES [dbo].[Unit_of_measurement] ([UomId]),
CONSTRAINT [fk_program_summary_sizeId] FOREIGN KEY([Sizeid]) REFERENCES [dbo].[Size] ([SizeId]),
CONSTRAINT [fk_program_summary_Itemid] FOREIGN KEY([Itemid]) REFERENCES [dbo].[Item] ([ItemId]),
CONSTRAINT [fk_program_summary_colorid] FOREIGN KEY([Colorid])REFERENCES [dbo].[color] ([colorid]),
CONSTRAINT [ck_program_summary_buyjobwork] CHECK  (([BuyJobWork] = 'B' or [BuyJobWork] = 'J' or [BuyJobWork] = 'W' or [BuyJobWork] = 'S'or [BuyJobWork] = 'D'))


)
