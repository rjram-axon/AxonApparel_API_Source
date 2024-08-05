CREATE TABLE [dbo].[Cutting_Recpt_Bundle]
(
	[BundleId] INT IDENTITY(1,1) NOT NULL,
	[CuttingRecptId] [int] NOT NULL,
	[CuttingRecptDetId] [int] NOT NULL,
	[BundleNo] [varchar](12) NOT NULL,
	[BundleQty] [numeric](14, 3) NOT NULL,
	[Employeeid] [int] NULL,
	CONSTRAINT [PK_CuttinRecptBundleid] PRIMARY KEY ([BundleId]),
	CONSTRAINT [FK_Cuttingreceiptid] FOREIGN KEY ([CuttingRecptId]) REFERENCES [Cutting_Recpt_Mas]([CuttingRecptId]),
	CONSTRAINT [FK_Cuttingreceiptdetid] FOREIGN KEY ([CuttingRecptDetId]) REFERENCES [Cutting_Recpt_Det]([CuttingRecptDetID]),
	CONSTRAINT [FK_CuttingrefcreatedId] FOREIGN KEY ([Employeeid]) REFERENCES [Employee]([EmployeeId]),
)
