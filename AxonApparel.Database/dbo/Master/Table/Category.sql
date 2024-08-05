CREATE TABLE [dbo].[Category]
(
	[CategoryId] [int] IDENTITY(1,1) NOT NULL,
	[Category] [varchar](20) NOT NULL,
	[Quota] [bit] NOT NULL,
	[Quota_unit] [int] NULL,
	[Equal_pcs] [decimal](6, 3) NULL,
	[IsActive] [bit] NULL, 
    CONSTRAINT [PK_Category] PRIMARY KEY ([CategoryId]),
)
