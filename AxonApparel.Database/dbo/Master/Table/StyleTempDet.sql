CREATE TABLE [dbo].[StyleTempDet]
(
	[TempDetId] [int] IDENTITY(1,1) NOT NULL,
	[TemplateId] [int] NOT NULL,
	[ItemId] [int] NOT NULL,
	[ColorId] [int] NOT NULL,
	[SizeId] [int] NOT NULL,
	[SupplierId] [int] NOT NULL,
	[ConvertTypeId] [int] NOT NULL,
	[ConvertTypeName] varchar(50) NOT NULL,
	[Qty] NUMERIC(9, 4) NOT NULL,
	[Rate] NUMERIC(9, 4) NOT NULL,
	GColorid int NULL,
	GSizeid int NULL,
	CONSTRAINT [PK_StyleTempDetId] PRIMARY KEY ([TempDetId]),
	CONSTRAINT [FK_StyleTempMasId] FOREIGN KEY ([TemplateId]) REFERENCES [StyleTempMas]([TemplateId]),
	CONSTRAINT [FK_StyleTempItemId] FOREIGN KEY ([ItemId]) REFERENCES [Item]([ItemId]),
	CONSTRAINT [FK_StyleTempColorId] FOREIGN KEY ([ColorId]) REFERENCES [Color]([Colorid]),
	CONSTRAINT [FK_StyleTempId] FOREIGN KEY ([SizeId]) REFERENCES [Size]([SizeId]),
	CONSTRAINT [FK_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [Supplier]([SupplierId]),
	
	
)
