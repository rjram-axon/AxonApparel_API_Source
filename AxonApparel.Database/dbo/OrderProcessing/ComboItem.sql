CREATE TABLE [dbo].[ComboItem]
(
	ComboitemRowId [int] IDENTITY(1,1) NOT NULL,
	ComboColorId int NOT NULL,
	StyleRowId int NOT NULL,
	Itemseq int,
	ItemID int,
	ItemRatio int,
	[Flag] CHAR NULL, 
    CONSTRAINT [PK_ComboItem] PRIMARY KEY ([ComboitemRowId]),
	CONSTRAINT [FK_StyleRowItem] FOREIGN KEY ([StyleRowId]) REFERENCES [buy_ord_style]([StyleRowid]),
	CONSTRAINT [FK_StyleItem] FOREIGN KEY ([ItemID]) REFERENCES [Item]([ItemId]),
	--CONSTRAINT [FK_ComboColoritem] FOREIGN KEY ([ComboColorId]) REFERENCES [ComboColor]([CombocolorId]),
)
