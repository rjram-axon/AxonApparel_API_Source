CREATE TABLE [dbo].[TestingDCReceiptDet]
(
	[TestingDCReceiptDetId] INT IDENTITY(1,1) NOT NULL primary key,
	[TestingDCReceiptId] int NOT NULL,
	SeqNo int NOT NULL,
	TestingTypeId int NOT NULL,
	TestPcs int NULL,
	RatePerPcs numeric(18,3) NULL,
	Value numeric(18,3) NULL,
	StatusId int NOT NULL Default(1),

	CONSTRAINT [fk_TestingDCReceiptDet_TestingDCId] FOREIGN KEY([TestingDCReceiptId]) REFERENCES [dbo].[TestingDCReceiptMas] ([TestingDCReceiptId]),
	CONSTRAINT [fk_TestingDCReceiptDet_TestingTypeId] FOREIGN KEY(TestingTypeId) REFERENCES [dbo].[TestingType] (TestingTypeId),

)
