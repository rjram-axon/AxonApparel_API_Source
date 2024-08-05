CREATE TABLE [dbo].[AddLess]
(
    [AddlessId] [int] IDENTITY(1,1) NOT NULL,
	[Addless] [varchar](40) NOT NULL,
	[Per] [numeric](5, 2) DEFAULT (0) NOT NULL,
	[Amount] [numeric](12, 2) DEFAULT (0.00) NOT NULL,
	[Type] [char](1) NULL,
	[Lookup] [varchar](10) DEFAULT ('') NOT NULL,
	[IsActive] [bit] DEFAULT (1) NOT NULL,
	[AddlessType] [varchar](1) NULL, 
		[Locked] [bit]  NULL DEFAULT (0),
		[GroupNameID] [int] NULL,
		[ISINVOICE] [bit] NULL,
    CONSTRAINT [PK_AddLess] PRIMARY KEY ([AddlessId])
)
