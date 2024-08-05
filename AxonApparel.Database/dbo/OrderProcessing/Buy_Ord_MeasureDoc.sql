CREATE TABLE [dbo].[Buy_Ord_MeasureDoc]
(
	[MeasureDocId] [int] IDENTITY(1,1) NOT NULL,
	[MeasureMasId] [int] NULL,
	[DocTitle] [varchar](100) NULL,
	[DocName] [varchar](100) NULL, 
    CONSTRAINT [PK_Buy_Ord_MeasureDoc] PRIMARY KEY ([MeasureDocId]), 
    CONSTRAINT [FK_Buy_Ord_MeasureDoc_Buy_ord_Measuremas] FOREIGN KEY ([MeasureMasId]) REFERENCES [Buy_ord_Measuremas]([MeasureMasId])
)
