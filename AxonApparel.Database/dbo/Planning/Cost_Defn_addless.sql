CREATE TABLE [dbo].[Cost_Defn_addless]
(
    [Cost_Defn_Addlessid] [int] IDENTITY(1,1) NOT NULL primary key,
	[CostDefnID] [int] NOT NULL,
	[CostDefnBomid] [int] NOT NULL,
	[AddLessID] [int] NOT NULL,
	[AddorLess] [varchar](1) NOT NULL,
	[ActualAmount] [numeric](15, 5) NULL,
	[DocType] [varchar](2) NULL,
	[DocID] [int] NULL
)
