CREATE TABLE [dbo].[Category]
(
	[categoryid] [int] IDENTITY(1,1)  NOT NULL PRIMARY KEY,
	[category] [varchar](20) NOT NULL,
	[quota] [bit] NOT NULL,
	[Quota_unit] [int] NULL,
	[Equal_pcs] [decimal](6, 3) NULL,
	[IsActive] [bit] NULL,
)
