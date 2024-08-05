CREATE TABLE [dbo].[MarkEnqItemDet]
(
	
	[MarkEnqItemId] [int] IDENTITY(1,1) NOT NULL,
	[EnquiryId] [int] NOT NULL,
	[ColorId] [int] NOT NULL,
	[SizeId] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
	[UomId] [int] NOT NULL,
	[DespatchQty] [int] NULL DEFAULT ('0'),
	CONSTRAINT [FK_MarkEnqItemDet_Color] FOREIGN KEY ([ColorId]) REFERENCES [Color]([ColorId])  ,
	CONSTRAINT [FK_MarkEnqItemDet_Garment_Uom] FOREIGN KEY ([UomId]) REFERENCES [Garment_Uom]([GUomId]),
    CONSTRAINT [FK_MarkEnqItemDet_Size] FOREIGN KEY ([SizeId]) REFERENCES [Size]([SizeId]),
	CONSTRAINT [FK_MarkEnqItemDet_MarkEnqMas] FOREIGN KEY ([EnquiryID]) REFERENCES [MarkEnqMas]([EnquiryID]), 
    CONSTRAINT [PK_MarkEnqItemDet] PRIMARY KEY ([MarkEnqItemId]),
)
