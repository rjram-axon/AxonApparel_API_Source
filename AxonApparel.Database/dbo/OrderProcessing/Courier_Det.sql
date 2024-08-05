CREATE TABLE [dbo].[Courier_Det]
(
    [Courier_DetId] [int] IDENTITY(1,1) NOT NULL,
	[Courier_MasId] [int] NULL,
	[ItemId] [int] NULL,
	[ColorId] [int] NULL,
	[SizeId] [int] NULL,
	[UomId] [int] NULL,
	[Quantity] [numeric](9, 3) NULL, 
    CONSTRAINT [PK_Courier_Det] PRIMARY KEY ([Courier_DetId]),
	CONSTRAINT [FK_Courier_Det_Item] FOREIGN KEY ([ItemId]) REFERENCES [Item]([ItemId]),
	CONSTRAINT [FK_Courier_Det_Color] FOREIGN KEY ([ColorId]) REFERENCES [Color]([ColorId]),
	CONSTRAINT [FK_Courier_Det_Size] FOREIGN KEY ([SizeId]) REFERENCES [Size]([SizeId]),
	CONSTRAINT [FK_Courier_Det_Unit_of_Measurement] FOREIGN KEY ([UomId]) REFERENCES [Unit_of_Measurement]([UomId]),
    CONSTRAINT [FK_Courier_Det_Courier_Mas] FOREIGN KEY ([Courier_MasId]) REFERENCES [Courier_Mas]([Courier_MasId])	
)
