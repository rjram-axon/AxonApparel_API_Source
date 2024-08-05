create table dbo.PrecostFabDept_Fab(
[PreCostFabDeptFabmasid] [int] Primary key IDENTITY(1,1) NOT NULL ,
[PreCostFabDeptmasid] [int] NULL FOREIGN KEY([PreCostFabDeptmasid])
    REFERENCES [dbo].[PreCostFabDept_mas] ([PreCostFabDeptmasid]),
	Fabricid int null,
	Slno int null,
	GreyColorid int null,
	FabricColorid int null,
	PurchaseType char(1)null ,
	Rate [decimal](10, 3) NOT NULL DEFAULT ((0)),
	GSM [decimal](10, 3) NOT NULL DEFAULT ((0)),
	Target [decimal](10, 3) NOT NULL DEFAULT ((0)),
	Approved [char](1)  DEFAULT ('N'),
)
