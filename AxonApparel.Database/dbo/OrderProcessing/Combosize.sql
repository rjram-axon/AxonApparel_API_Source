CREATE TABLE [dbo].[Combosize]
(
	CombosizeId [int] IDENTITY(1,1) NOT NULL, 
	ComboSizeSeq int NULL,
	StyleRowId int,
	SizeId int,
	Sizerow int,
	CONSTRAINT [PK_ComboSize] PRIMARY KEY ([CombosizeId]),
CONSTRAINT [FK_StyleRowId] FOREIGN KEY ([StyleRowId]) REFERENCES [buy_ord_style]([StyleRowid]),
CONSTRAINT [FK_SizeId] FOREIGN KEY ([SizeId]) REFERENCES [size]([SizeId])
)

