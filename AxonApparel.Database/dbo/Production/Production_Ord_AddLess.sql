CREATE TABLE [dbo].[Production_Ord_AddLess]
(
	[Production_Ord_Discountid] [int] IDENTITY(1,1) NOT NULL primary key,
	[Production_Ord_id] [int] NOT NULL,
	[Addlessid] [int] NULL,
	[Percentage] [numeric](5, 2) NOT NULL,
	[PlusOrMinus] [varchar](1) NOT NULL,
	[Amount] [numeric](15, 5) NOT NULL,

)
