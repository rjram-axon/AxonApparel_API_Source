CREATE TABLE [dbo].[Buy_ord_MeasureDet]
(
	[MeasureMasid] [int] NULL,
	[MeasureDetid] [int] IDENTITY(1,1) NOT NULL,
	[MeasureName] [varchar](50) NOT NULL,
	[Increment] [numeric](5, 2) NULL,
	[Tolerance] [numeric](5, 2) NULL,
	[ITEMID] [int] NULL,
	[Lookup] [varchar](5) NOT NULL DEFAULT (''), 
	[CompItemId] [int] NULL,
    CONSTRAINT [PK_Buy_ord_MeasureDet] PRIMARY KEY ([MeasureDetid]), 
    CONSTRAINT [FK_Buy_ord_MeasureDet_Item] FOREIGN KEY ([ITEMID]) REFERENCES [Item]([ItemId]),
	CONSTRAINT [FK_Buy_ord_MeasureDet_CompItem] FOREIGN KEY ([CompItemId]) REFERENCES [Item]([ItemId]),
	CONSTRAINT [FK_Buy_ord_MeasureDet_Buy_ord_MeasureMas] FOREIGN KEY ([MeasureMasid]) REFERENCES [Buy_ord_Measuremas]([MeasureMasid])
)
