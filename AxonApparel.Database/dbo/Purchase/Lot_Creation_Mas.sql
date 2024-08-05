CREATE TABLE [dbo].[Lot_Creation_Mas]
(
	[LotId] INT IDENTITY(1,1) NOT NULL, 
	[LotNo] [varchar](25) NULL,
	[CompanyId] [int] NULL,
	[EntryDate] [datetime] NULL,
	[OrderType] [char](1) NULL,
	[CreatedBy] [int] NULL,
	[Closed] [char](1) NULL,
	[Remarks] [varchar](400) NULL,
	[LotSeqNo] [int] NULL,
	[Short_closure] [char](1) NULL,
	[SupplierId] [int] NULL,
    CONSTRAINT [PK_Lot_Creation_Mas] PRIMARY KEY ([LotId])
)
