CREATE TABLE [dbo].[ComboSize_Amend]
(
	[RecId] INT NOT NULL IDENTITY(1,1),
	CombosizeId [int] NOT NULL, 
	ComboSizeSeq int NULL,
	StyleRowId int,
	SizeId int,
	Sizerow int,
	CONSTRAINT [PK_AmendComboSize] PRIMARY KEY ([RecId]),
CONSTRAINT [FK_AmendSizeId] FOREIGN KEY ([SizeId]) REFERENCES [size]([SizeId])
)
