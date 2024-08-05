CREATE TABLE [dbo].[Box_Con_Det]
(
	[BoxConDetId] [int] IDENTITY(1,1) NOT NULL primary key,
	[BoxConMasId] [int] null,
	StyleId int null,
	SizeId int null,
	ColorId int null,
	Rate [numeric](14, 4) NULL,
	[PcsQty] [numeric](14, 3) NULL,
	BoxQty [numeric](14, 3) NULL, 
    CONSTRAINT [Fk_Box_Con_Det_BoxConMasId] FOREIGN KEY ([BoxConMasId]) REFERENCES [Box_Con_Mas]([BoxConMasId])	
)
