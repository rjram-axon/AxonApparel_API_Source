CREATE TABLE [dbo].[TestingDCDet]
(
	[TestingDetId] INT IDENTITY(1,1) NOT NULL primary key,
	TestingDCId int NOT NULL,
	SeqNo int NOT NULL,
	TestingTypeId int NOT NULL,
	TestPcs int NULL,
	RatePerPcs numeric(18,3) NULL,
	Value numeric(18,3) NULL,
	TaxAppVal numeric(18,3) NULL,

	CONSTRAINT [fk_TestingDCDet_TestingDCId] FOREIGN KEY(TestingDCId) REFERENCES [dbo].[TestingDCMas] ([TestingDCId]),
	CONSTRAINT [fk_TestingDCDet_TestingTypeId] FOREIGN KEY(TestingTypeId) REFERENCES [dbo].[TestingType] (TestingTypeId),

)
