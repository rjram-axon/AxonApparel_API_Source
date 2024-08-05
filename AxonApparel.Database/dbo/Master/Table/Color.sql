CREATE TABLE [dbo].[Color]
(
    [Colorid] [int] IDENTITY(1,1) NOT NULL,
	[Colorname] [varchar](100) NULL,
	[Color] [varchar](200) NULL,
	[Lookup] [varchar](10) NULL,
	[ColorOth] [varchar](1) NULL,
	[IsActive] [bit] NOT NULL DEFAULT ('1'),
	[ColorGroupID] [int] NULL,
	[ColorCode] [varchar](200) NULL,
	[Pantone] [varchar](30) NULL,
	[ColorNo] [varchar](50) NULL DEFAULT ('16777215'), 
    CONSTRAINT [FK_Color_ColorGroup] FOREIGN KEY ([ColorGroupID]) REFERENCES [ColorGroup]([ColorGroupID]), 
    CONSTRAINT [PK_Color] PRIMARY KEY ([Colorid])
)
