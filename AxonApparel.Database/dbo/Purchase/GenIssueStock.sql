CREATE TABLE [dbo].[GenIssueStock]
(
	[GenIssueStockId] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[IssueId] [int] NOT NULL,
	[IssueDetid] [int] NOT NULL,
	[Stockid] [int] NOT NULL,
	[Quantity] [numeric](12, 3) NOT NULL,
	[Uomid] [int] NOT NULL
)
