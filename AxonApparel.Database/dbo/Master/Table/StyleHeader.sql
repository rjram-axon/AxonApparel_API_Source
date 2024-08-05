CREATE TABLE [dbo].[StyleHeader]
(
	[StyleId] [int] IDENTITY(1,1) NOT NULL,
	[Style] [varchar](40) NOT NULL UNIQUE,
	[ArticleNo] [varchar](40)  NULL,
	[Season] [varchar](40)  NULL,
	[DesignName] [varchar](40)  NULL,
	[IsActive] [bit] NOT NULL DEFAULT(1), 
	Itemid int null,
    CONSTRAINT [PK_StyleHeader] PRIMARY KEY ([StyleId])
	
    
)
