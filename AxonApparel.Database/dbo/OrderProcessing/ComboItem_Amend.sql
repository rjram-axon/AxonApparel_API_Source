CREATE TABLE [dbo].[ComboItem_Amend]
(
	[RecId] INT NOT NULL  IDENTITY(1,1),
	ComboitemRowId [int]  NOT NULL,
	ComboColorId int NOT NULL,
	StyleRowId int NOT NULL,
	Itemseq int,
	ItemID int,
	ItemRatio int,
	[Flag] CHAR NULL, 
    CONSTRAINT [PK_AmendComboItem] PRIMARY KEY ([RecId]),
	--CONSTRAINT [FK_StyleRowItem] FOREIGN KEY ([StyleRowId]) REFERENCES [buy_ord_style]([StyleRowid]),
	CONSTRAINT [FK_AmendStyleItem] FOREIGN KEY ([ItemID]) REFERENCES [Item]([ItemId]),
	--CONSTRAINT [FK_ComboColoritem] FOREIGN KEY ([ComboColorId]) REFERENCES [ComboColor]([CombocolorId]),
)
