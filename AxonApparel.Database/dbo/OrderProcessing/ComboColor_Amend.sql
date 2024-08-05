CREATE TABLE [dbo].[ComboColor_Amend]
(
	[RecId] INT NOT NULL IDENTITY(1,1),
	CombocolorId [int]  NOT NULL,
	StyleRowId int NOT NULL,
	ComboSeq int,
	Comboid int,
	ColorSeq int,
	Colorid int,
	[Itemid] INT NULL,
	ColorRatio int,
	ComboPer decimal(18,2) NULL,
	ComboQty int,
	[Flag] CHAR NULL, 
     
    CONSTRAINT [PK_AmendComboColor] PRIMARY KEY ([RecId]),
	--CONSTRAINT [FK_StyleRowColor] FOREIGN KEY ([StyleRowId]) REFERENCES [buy_ord_style]([StyleRowid]),
	CONSTRAINT [FK_AmendColorref] FOREIGN KEY ([Colorid]) REFERENCES [Color]([Colorid]),
	CONSTRAINT [FK_AmendComboColorref] FOREIGN KEY ([Comboid]) REFERENCES [Color]([Colorid]),
	CONSTRAINT [FK_AmendColorItemRef] FOREIGN KEY ([ItemID]) REFERENCES [Item]([ItemId]),
)
