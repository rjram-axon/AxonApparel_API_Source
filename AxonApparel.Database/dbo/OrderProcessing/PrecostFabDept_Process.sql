create table dbo.PrecostFabDept_Process(
    [PreCostFabDeptProcmasid] [int] Primary key IDENTITY(1,1) NOT NULL ,
    [PreCostFabDeptmasid] [int] NULL FOREIGN KEY([PreCostFabDeptmasid])
    REFERENCES [dbo].[PreCostFabDept_mas] ([PreCostFabDeptmasid]),
	[PreCostFabDeptFabmasid] [int] NULL FOREIGN KEY([PreCostFabDeptFabmasid])
    REFERENCES [dbo].PrecostFabDept_Fab ([PreCostFabDeptFabmasid]),
	Fabricid int null,
	Slno int null,
	Processid int null,
	LossPercentage decimal(5,2),
	Rate [decimal](10, 3) NOT NULL DEFAULT ((0)),
	Target [decimal](10, 3) NOT NULL DEFAULT ((0)),
	Approved [char](1)  DEFAULT ('N'),
)
