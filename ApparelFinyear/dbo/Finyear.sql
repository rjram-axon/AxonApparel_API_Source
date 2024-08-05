CREATE TABLE [dbo].[Finyear]
(
    [Finyear] [int] IDENTITY(1,1) NOT NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[YearCode] [varchar](1) NULL,
	[Period] [varchar](12) NULL,
	[Posted] [bit] NULL DEFAULT (0),
	[Reposted] [bit] NULL DEFAULT (0),
	[DBName] [varchar](20) NULL,
	[Created] [timestamp] NULL,
	[SetDefault] [bit] NULL DEFAULT (0),
	[Description] [varchar](100) NULL,
	[Type] [char](1) NOT NULL DEFAULT ('N'),
	[FinType] [varchar](1) NULL
)
