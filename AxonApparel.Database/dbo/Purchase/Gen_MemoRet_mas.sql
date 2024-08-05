CREATE TABLE [dbo].[Gen_MemoRet_mas]
(
	[Gen_MemoRet_MasId] [int] IDENTITY(1,1) NOT NULL primary key,
	[GenMemo_RetNo] [varchar](20) NULL,
	[GenMemoRet_RefNo] [varchar](20) NULL,
	[GenMemoRetDate] [datetime] NULL,
	[Gen_memo_Masid] [int] NULL,
	[CompanyId] [int] NULL,
	[UnitId] [int] NULL,
	[Unit_or_Other] [char](1) NULL,
	[Remarks] [varchar](1500) NULL,
	[VehicleNo] [varchar](25) NULL,
	[GenmemoRet_Refdate] [datetime] NULL,
	[MemoType] [varchar](20) NOT NULL  DEFAULT (''),
	[CreatedBy] [int] NULL,
	[Company_unitID] [int] NULL,
	[buyerid] [int] NULL,

	CONSTRAINT [FK_gen_memoret_mas_CreatedBy] FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[Employee] ([EmployeeId]),

)
