CREATE TABLE [dbo].[Unit_of_measurement]
(
	[UomId] [int] IDENTITY(1,1) NOT NULL,
	[Uom] [varchar](40) NOT NULL,
	[Abbreviation] [varchar](5) NOT NULL,
	[IsDecimal] [varchar](10) NOT NULL ,
	[IsActive] [bit] NOT NULL DEFAULT (1), 
    CONSTRAINT [PK_Unit_of_measurement] PRIMARY KEY ([UomId])
)