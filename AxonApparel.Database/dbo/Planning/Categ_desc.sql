CREATE TABLE [dbo].[Categ_desc]
(
[categ_descid] [int] IDENTITY(1,1) NOT NULL Primary key,
	[categoryid] [int] NULL,
	[Description] [varchar](120) NOT NULL,
	[segment] [varchar](50) NULL,
	[fibre] [varchar](50) NULL,
	[madefor] [varchar](50) NULL,
	[harcode] [varchar](50) NULL,
	[IsActive] [bit] NULL,
	
	CONSTRAINT [fk_category_desc] FOREIGN KEY([categoryid]) REFERENCES [dbo].[Category] ([categoryid])
	)
