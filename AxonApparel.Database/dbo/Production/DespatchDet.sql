CREATE TABLE [dbo].[DespatchDet]
(
	[DespatchDetId] INT IDENTITY(1,1) NOT NULL,
	[DespatchId] [int] NOT NULL,
	[ItemId] [int] NOT NULL,
	[ColorId] [int] NOT NULL,
	[Sizeid] [int] NOT NULL,
	[DispatchQty] [numeric](14, 3) NOT NULL,
	[SalesRate] [numeric](14, 3) NOT NULL Default(0),

	CONSTRAINT [PK_DespatDetRefid] PRIMARY KEY ([DespatchDetId]),
	CONSTRAINT [FK_DespatchMasReferenceId] FOREIGN KEY ([DespatchId]) REFERENCES [DespatchMas]([DespatchId]),
	CONSTRAINT [FK_DesColorRefId] FOREIGN KEY ([ColorId]) REFERENCES [Color]([Colorid]),
	CONSTRAINT [FK_DesItemRefId] FOREIGN KEY ([ItemId]) REFERENCES [Item]([ItemId]),
	CONSTRAINT [FK_DesSizeRefId] FOREIGN KEY ([Sizeid]) REFERENCES [Size]([Sizeid]),

)
