CREATE TABLE [dbo].[Gen_MemoRet_det]
(
	[Gen_MemoRet_Detid] [int] IDENTITY(1,1) NOT NULL primary key,
	[Gen_memo_Masid] [int] NULL,
	[Itemid] [int] NULL,
	[Colorid] [int] NULL,
	[Sizeid] [int] NULL,
	[Uomid] [int] NULL,
	[Quantity] [numeric](13, 3) NOT NULL,
	[Gen_memo_Detid] [int] NULL,
	[Closed] [char](1) NULL DEFAULT ('N'),


)
