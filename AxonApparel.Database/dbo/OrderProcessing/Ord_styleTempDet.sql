CREATE TABLE [dbo].Ord_styleTempDet
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
	CONSTRAINT [PK_Ord_styleTempDetId] PRIMARY KEY ([TempDetId]),
	CONSTRAINT [FK_Ord_styleTempmasId] FOREIGN KEY ([TemplateId]) REFERENCES [Ord_styleTempMas]([TemplateId]),
	CONSTRAINT [FK_Ord_styleTempItemId] FOREIGN KEY ([ItemId]) REFERENCES [Item]([ItemId]),
	CONSTRAINT [FK_Ord_styleTempColorId] FOREIGN KEY ([ColorId]) REFERENCES [Color]([Colorid]),
	CONSTRAINT [FK_Ord_styleTempId] FOREIGN KEY ([SizeId]) REFERENCES [Size]([SizeId]),
	CONSTRAINT [FK_Ord_styleTempSupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [Supplier]([SupplierId]),
	
	
)
 