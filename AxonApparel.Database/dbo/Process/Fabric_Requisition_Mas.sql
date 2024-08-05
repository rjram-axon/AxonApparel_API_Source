CREATE TABLE [dbo].[Fabric_Requisition_Mas]
(
	[Fabric_Req_Masid] [int] IDENTITY(1,1) NOT NULL primary key,	
	[Fabric_Req_no] [varchar](20) NOT NULL,
	[Fabric_Req_date] [datetime] NULL,
	CompanyId int null,
	IntenalOrExternal varchar(1) null,
	ProcessorId int null,
	[Buy_Ord_Masid] int NULL,
	[DeliScheduleNo] int NULL,
	[PlannedQty] numeric (15,5) null,
	PendingQty numeric(15,5) null,
	OType varchar(1) null,
	[StyleId]int null,
	[CreatedBy] [int] NULL,
)
