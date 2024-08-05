CREATE TABLE [dbo].[ComboColor]
(
	CombocolorId [int] IDENTITY(1,1) NOT NULL,
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
     
    CONSTRAINT [PK_ComboColor] PRIMARY KEY ([CombocolorId]),
	CONSTRAINT [FK_StyleRowColor] FOREIGN KEY ([StyleRowId]) REFERENCES [buy_ord_style]([StyleRowid]),
	CONSTRAINT [FK_Colorref] FOREIGN KEY ([Colorid]) REFERENCES [Color]([Colorid]),
	CONSTRAINT [FK_ComboColorref] FOREIGN KEY ([Comboid]) REFERENCES [Color]([Colorid]),
	CONSTRAINT [FK_ColorItemRef] FOREIGN KEY ([ItemID]) REFERENCES [Item]([ItemId]),
)
