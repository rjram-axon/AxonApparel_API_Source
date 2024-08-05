CREATE TABLE [dbo].[GenIssueAddless]
(
	[GenIssueAddlessId] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[IssueId] [int] NOT NULL,
	[AddlessID] [int] NOT NULL,
	[Amount] [numeric](8, 2) NOT NULL,
	[AddorLess] [varchar](1) NOT NULL,
	[Percentage] [numeric](9, 3) NULL
)
