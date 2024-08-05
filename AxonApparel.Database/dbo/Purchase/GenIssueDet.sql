CREATE TABLE [dbo].[GenIssueDet]
(
	[IssueDetId] [int] IDENTITY(1,1) NOT NULL primary key,
	[IssueID] [int] NOT NULL,
	[ItemID] [int] NOT NULL,
	[ColorID] [int] NOT NULL,
	[SizeID] [int] NOT NULL,
	[Quantity] [numeric](12, 3) NOT NULL,
	[Uomid] [int] NOT NULL,
	[Rate] [numeric](8, 2) NULL,
	[sQty] [numeric](12, 3) NOT NULL DEFAULT (0),
	[sUomId] [int] NOT NULL DEFAULT (0)


)
