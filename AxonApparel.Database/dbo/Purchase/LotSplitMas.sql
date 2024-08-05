CREATE TABLE [dbo].[LotSplitMas]
(
    [LotSplitMasId] INT IDENTITY(1,1) NOT NULL, 
    [Companyid] [int] NULL,
	[TransNo] [varchar](20) NOT NULL,
	[EntryNo] [varchar](20) NOT NULL,
	[EntryDate] [datetime] NULL,
	[RefNo] [varchar](15) NOT NULL DEFAULT (''),
	[SplitType] [char](1) NOT NULL,
	[CreatedBy] [int] NULL,
    CONSTRAINT [PK_LotSplitMas] PRIMARY KEY ([LotSplitMasId]), 
    CONSTRAINT [FK_LotSplitMas_Company] FOREIGN KEY ([Companyid]) REFERENCES [Company]([CompanyId]), 
	CONSTRAINT [FK_LotSplitMas_Employee] FOREIGN KEY ([CreatedBy]) REFERENCES [Employee]([EmployeeId]), 
    CONSTRAINT [CK_LotSplitMas_SplitType] CHECK (([SplitType] = 'G' or [SplitType] = 'O' or [SplitType] = 'I' or [SplitType] = 'P' or [SplitType] = 'T' or [SplitType] = 'A'))
)
