CREATE TABLE [dbo].[Commercialmas]
(
[commercialid] [int] IDENTITY(1,1) NOT NULL primary key,
	[commercial] [varchar](40) NOT NULL,
	[IsActive] [bit] NOT NULL DEFAULT (1),
	[CostType] [varchar](2) NULL,
	

	
	)
