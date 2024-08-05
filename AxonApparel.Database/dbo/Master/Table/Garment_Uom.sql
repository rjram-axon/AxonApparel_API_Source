CREATE TABLE [dbo].[Garment_Uom]
(
	[GUomId] [int] IDENTITY(1,1) NOT NULL,
	[GUom] [varchar](25) NULL,
	[GUom_Lookup] [varchar](7) NULL,
	[To_BUom] [tinyint] NULL,
	[IsActive] [bit] NOT NULL DEFAULT ('1'), 
    CONSTRAINT [PK_Garment_Uom] PRIMARY KEY ([GUomId])
)
