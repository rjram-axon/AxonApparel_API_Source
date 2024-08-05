CREATE TABLE [dbo].[Special_Req_Mas]
(
[Spl_Reqid] [int] IDENTITY(1,1) NOT NULL Primary key,
	[Spl_Req_No] [varchar](20) NULL,
	[Spl_Req_Date] [datetime] NULL,
	[Ref_No] [varchar](15) NULL,
	[Ref_Date] [datetime] NULL,
	[Job_Ord_No] [varchar](20) NULL,
	[Companyid] [int] NULL,
	[CompanyUnitid] [int] NULL,
	[Req_Remarks] [varchar](1000) NULL,
	[Req_Commit_Cancel] [varchar](1) NULL,
	[App_By] [int] NULL,
	[App_Date] [datetime] NULL,
	[App_Commit_Cancel] [varchar](1) NULL,
	[App_Remarks] [varchar](1000) NULL,
	[Auto_Manual] [varchar](1) NULL,
	[OrderType] [varchar](1) NULL,
	[Unit_Or_Other] [varchar](1) NULL,
	[Type] [varchar](1) NULL,
	[App_Amend] [char](1) NULL DEFAULT ('N'),
	[CreatedBy] [int] NULL,


	CONSTRAINT [FK_Special_Req_mas_CreatedBy] FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[Employee] ([EmployeeId]),
	)
