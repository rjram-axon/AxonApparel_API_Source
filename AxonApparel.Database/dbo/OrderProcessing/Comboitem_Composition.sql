CREATE TABLE [dbo].[Comboitem_Composition]
(
	RowId [int] IDENTITY(1,1) NOT NULL,
	ComboitemRowId [int] NOT NULL,
	StyleRowId int NOT NULL,
	ColorId int NOT NULL,
	ColorSeq int NOT NULL,
	[Flag] CHAR NULL, 
    CONSTRAINT [PK_ComboItemComposition] PRIMARY KEY ([RowId]),
	CONSTRAINT [FK_StyleRowItemComposition] FOREIGN KEY ([StyleRowId]) REFERENCES [buy_ord_style]([StyleRowid]),
	CONSTRAINT [FK_StyleRowColorComposition] FOREIGN KEY ([ColorId]) REFERENCES [color]([Colorid]),
	--CONSTRAINT [FK_ComboColoritemRow] FOREIGN KEY ([ComboitemRowId]) REFERENCES [ComboItem]([ComboitemRowId]),
)
