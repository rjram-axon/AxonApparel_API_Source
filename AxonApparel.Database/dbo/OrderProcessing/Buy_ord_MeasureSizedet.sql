CREATE TABLE [dbo].[Buy_ord_MeasureSizedet]
(
	[MeasureDetid] [int] NULL,
	[MeasureMasId] [int] NULL,
	[Sizeid] [int] NULL,
	[IncValues] [varchar](10) NULL,
	Qty numeric(15,3) NULL,
	GItemId [int] NULL,
	CompId [int] NULL,
	[MeasureSizeDetid] [int] IDENTITY(1,1) NOT NULL, 
    CONSTRAINT [PK_Buy_ord_MeasureSizedet] PRIMARY KEY ([MeasureSizeDetid]), 
    CONSTRAINT [FK_Buy_ord_MeasureSizedet_Size] FOREIGN KEY ([Sizeid]) REFERENCES [Size]([Sizeid]),
	CONSTRAINT [FK_Buy_ord_MeasureSizedet_Buy_ord_MeasureDet] FOREIGN KEY ([MeasureDetid]) REFERENCES [Buy_ord_MeasureDet]([MeasureDetid]),
	CONSTRAINT [FK_Buy_ord_MeasureSizedet_Buy_ord_Measuremas] FOREIGN KEY ([MeasureMasId]) REFERENCES [Buy_ord_Measuremas]([MeasureMasId]),
	CONSTRAINT [FK_Buy_ord_MeasureSizedet_GarItem] FOREIGN KEY ([GItemId]) REFERENCES [Item]([ItemId]),
	CONSTRAINT [FK_Buy_ord_MeasureSizedet_CompItem] FOREIGN KEY ([CompId]) REFERENCES [Item]([ItemId])
)
