CREATE TABLE [dbo].[Courier_Mas]
(
	[Courier_MasId] [int] IDENTITY(1,1) NOT NULL,
	[CompanyId] [int] NULL,
	[EntryNo] [varchar](20) NOT NULL,
	[EntryDate] [datetime] NULL,
	[Ref_No] [varchar](30) NULL,
	[CourierId] [int] NULL,
	[DespType] [varchar](1) NULL,
	[DespLocationId] [int] NULL,
	[AWBNo] [varchar](30) NULL,
	[AWBDate] [datetime] NULL,
	[ContactPerson] [varchar](50) NULL,
	[InOrOut] [varchar](1) NULL,
	[ReturnStatus] [varchar](1) NULL,
	[ReturnableDate] [varchar](10) NULL,
	[Remarks] [varchar](500) NULL,
    CONSTRAINT [PK_Courier_Mas] PRIMARY KEY ([Courier_MasId]), 
    CONSTRAINT [FK_Courier_Mas_Company] FOREIGN KEY ([CompanyId]) REFERENCES [Company]([CompanyId]),
	CONSTRAINT [FK_Courier_Mas_Courier] FOREIGN KEY ([CourierId]) REFERENCES [Courier]([CourierId]), 
    CONSTRAINT [CK_Courier_Mas_DespType] CHECK (([DespType]='B' OR [DespType]='U' OR [DespType]='S')), 
    CONSTRAINT [CK_Courier_Mas_InOrOut] CHECK (([InorOut]='I' OR [InorOut]='O'))

)
