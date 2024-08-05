CREATE TABLE [dbo].[Comboitem_Composition_Amend]
(
	[RecId] INT NOT NULL IDENTITY(1,1),
	RowId [int]  NOT NULL,
	ComboitemRowId [int] NOT NULL,
	StyleRowId int NOT NULL,
	ColorId int NOT NULL,
	ColorSeq int NOT NULL,
	[Flag] CHAR NULL, 
    CONSTRAINT [PK_AmendComboItemComposition] PRIMARY KEY ([RecId]),
	--CONSTRAINT [FK_AmendStyleRowItemComposition] FOREIGN KEY ([StyleRowId]) REFERENCES [buy_ord_style]([StyleRowid]),
	CONSTRAINT [FK_AmendStyleRowColorComposition] FOREIGN KEY ([ColorId]) REFERENCES [color]([Colorid]),
)
