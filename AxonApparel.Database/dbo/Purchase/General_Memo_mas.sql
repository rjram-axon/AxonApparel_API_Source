CREATE TABLE [dbo].[General_Memo_mas]
(
	[Gen_memo_Masid] [int] IDENTITY(1,1) NOT NULL primary key,
	[Gen_memo_No] [varchar](20) NOT NULL,
	[Gen_memo_date] [datetime] NULL,
	[Gen_memo_RefNo] [varchar](50) NULL,
	[Gen_memo_Refdate] [datetime] NULL,
	[Companyid] [int] NULL,
	[UnitId] [int] NOT NULL,
	[Unit_or_Other] [char](1) NULL,
	[Remarks] [varchar](1500) NULL,
	[VehicleNo] [varchar](25) NOT NULL DEFAULT (''),
	[ReturnOrNo] [char](1) NULL DEFAULT ('N'),
	[ReturnDate] [datetime] NULL,
	[RequestnerId] [int] NULL,
	[CreatedBy] [int] NULL,
	[Order_no] [varchar](20) NULL,
	[ProcessId] [int] NULL,
	[Company_unitID] [int] NULL,
	[styleid] [int] NULL,
	[BuyerId] [int] NULL,
	[validatebomqtyindelivery] [bit] NULL,

	CONSTRAINT [FK__General_Memo_mas__processId] FOREIGN KEY([ProcessId])REFERENCES [dbo].[Process] ([ProcessId]),
	CONSTRAINT [FK__General_Memo_mas__styleId] FOREIGN KEY([styleid]) REFERENCES [dbo].[StyleHeader] ([StyleId]),
	CONSTRAINT [fk_Gen_CompanyId] FOREIGN KEY([Companyid]) REFERENCES [dbo].[Company] ([CompanyId]),
	CONSTRAINT [FK_General_Memo_mas_CreatedBy] FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[Employee] ([EmployeeId]),

)
